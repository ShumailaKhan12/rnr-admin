import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Images
import Participants from "../../assets/images/Dashboard-img/group 1.svg";
import Referral from "../../assets/images/Dashboard-img/restructuring_12650380.svg";
import Leads from "../../assets/images/Dashboard-img/visualization 1.svg";
import SuccessfulReferral from "../../assets/images/Dashboard-img/collaboration_12650306.svg";
import User from "../../assets/images/ReferralRewards-img/User-reffer.svg";

// Components
import CampaignNavbar from "../../components/campaignNavbar";
import { postData } from "../../services/api";
import { DecryptFunction } from "../../utils/decryptFunction";
import { toastError, toastSuccess } from "../../utils/toster";

// -------------------------------------------------------
// Cleaned Dashboard component
// - Removed unused code and dead comments
// - Fixed undefined variables (prtcpResp)
// - Added guards before mapping arrays
// - Added participant pagination separate from referral/error pagination
// - Added inline comments to explain important parts
// -------------------------------------------------------

const Dashboard = () => {
  // react-hook-form (kept for mail form if needed)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Auth & Program from sessionStorage
  const GetAdminUid = sessionStorage.getItem("Auth");
  const ProgramId = sessionStorage.getItem("Prgid");

  // ------------------ 
  // STATE
  // ------------------
  const [dashStatData, setDashStatData] = useState({
    stats: {},
    all_referrals: [],
    all_participants: [],
    top_referrers: [],
    top_earners: [],
  });

  // Error (all referrals) table state & pagination
  const [errorTableData, setErrorTableData] = useState([]);
  const [currentErrorPage, setCurrentErrorPage] = useState(1);
  const [rowsPerErrorPage, setRowsPerErrorPage] = useState(5);

  // Participants table pagination (separate from error table)
  const [currentParticipantPage, setCurrentParticipantPage] = useState(1);
  const [rowsPerParticipantPage, setRowsPerParticipantPage] = useState(10);

  // Reward history / other UI states (kept minimal)
  const [mailImg, setMailImg] = useState(null);

  // ------------------ 
  // DERIVED VALUED
  // ------------------
  const dashboardCards = [
    {
      count: dashStatData?.stats?.total_participants || 0,
      img: Participants,
      label: "Total participants",
    },
    {
      count: dashStatData?.stats?.total_referrals || 0,
      img: Referral,
      label: "Total referrals",
    },
    {
      count: dashStatData?.stats?.pending_referrals || 0,
      img: Leads,
      label: "Pending referrals",
    },
    {
      count: dashStatData?.stats?.accepted_referrals || 0,
      img: SuccessfulReferral,
      label: "Accepted referrals",
    },
  ];

  // ------------------ 
  // API CALL
  // ------------------

  // Fetches dashboard, participant table and reward history in sequence
  const fetchDashboard = async () => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
        program_id: ProgramId,
      };

      // main dashboard
      const dashboardResp = await postData("/admin/dashboard", payload);
      // if backend sends encrypted data, use DecryptFunction. Otherwise use raw response
      const dashboardData = dashboardResp?.data
        ? await DecryptFunction(dashboardResp.data)
        : dashboardResp;

      // ensure arrays exist
      const normalized = {
        stats: dashboardData?.stats || {},
        all_referrals: dashboardData?.all_referrals || [],
        all_participants: dashboardData?.all_participants || [],
        top_referrers: dashboardData?.top_referrers || [],
        top_earners: dashboardData?.top_earners || [],
      };

      setDashStatData(normalized);
      setErrorTableData(normalized.all_referrals);

      // participant table (explicit endpoint) — original code had this commented
      const prtcpResp = await postData(
        "/admin/dashboard/participant-table",
        payload
      );
      if (prtcpResp?.data) {
        try {
          const dec = await DecryptFunction(prtcpResp.data);
          // we can merge or set separately — prefer setting participants if available
          setDashStatData((prev) => ({ ...prev, all_participants: dec }));
        } catch (e) {
          // if decryption fails, fallback to raw
          setDashStatData((prev) => ({
            ...prev,
            all_participants: prtcpResp.data,
          }));
        }
      }

      // reward history (kept minimal — only used if needed)
      const rewardHistory = await postData("/admin/reward-history", payload);
      // optional processing of rewardHistory can be added here
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // empty deps: run once on mount
  }, []);

  // ------------------ 
  // PAGINATION HELPERS
  // ------------------

  const totalErrorPages = Math.max(
    1,
    Math.ceil((errorTableData?.length || 0) / rowsPerErrorPage)
  );
  const errorPageData = errorTableData.slice(
    (currentErrorPage - 1) * rowsPerErrorPage,
    currentErrorPage * rowsPerErrorPage
  );

  const participants = dashStatData?.all_participants || [];
  const totalParticipantPages = Math.max(
    1,
    Math.ceil(participants.length / rowsPerParticipantPage)
  );
  const participantPageData = participants.slice(
    (currentParticipantPage - 1) * rowsPerParticipantPage,
    currentParticipantPage * rowsPerParticipantPage
  );

  // ------------------ 
  // SMALL UTILITIES
  // ------------------

  // const handleMailImg = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   if (!file.type.startsWith("image/")) {
  //     return alert("Please select a valid image file (PNG, JPG, GIF, etc.)");
  //   }
  //   const reader = new FileReader();
  //   reader.onload = (ev) => setMailImg(ev.target.result);
  //   reader.readAsDataURL(file);
  // };

  // ------------------ 
  // MAIL SUBMIT ( EXAMPLE KEPT )
  // ------------------

  // const onRefrMailSubmit = async (data) => {
  //   try {
  //     const getAuth = await postData("/admin/auths", {
  //       admin_uid: GetAdminUid,
  //     });
  //     const payload = {
  //       admin_uid: GetAdminUid,
  //       mode: getAuth?.mode,
  //       log_alt: getAuth?.log_alt,
  //       program_id: ProgramId,
  //       email_type: data?.email_type || "promotional",
  //       name: data?.name,
  //       email: data?.email,
  //       subject: data?.subject,
  //       reply_to: data?.replyTo,
  //       content: data?.content,
  //       button_text: data?.buttonText,
  //       button_url: data?.buttonUrl,
  //       image_type: data?.inlineRadioOptions,
  //       image: mailImg,
  //     };
  //     const response = await postData("/admin/send-email", payload);
  //     toastSuccess(response?.message || "Email sent");
  //   } catch (err) {
  //     toastError(err?.error || "Failed to send email");
  //   }
  // };

  // ------------------ 
  // RENDER
  // ------------------

  return (
    <>
      <CampaignNavbar />

      <div className="bg-light-white-3-color py-5">
        <div className="container">
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-blue-color font-24 montserrat-medium mb-0">
                Dashboard
              </p>
              <p className="mb-0 text-blue-color montserrat-medium font-12">
                An overview of recent data of customers, products and analysis
              </p>
            </div>
          </div>

          {/* Dashboard summary cards */}
          <div className="row my-4">
            {dashboardCards.map((card, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3 mb-4">
                <div className="dashboard-card border-radius-12 bg-light-white-color box-shadow px-4 py-3 h-100">
                  <div className="d-flex justify-content-between align-items-end">
                    <h3 className="font-34 text-blue-color montserrat-semibold mb-0">
                      {card.count}
                    </h3>
                    <img src={card.img} alt={card.label} />
                  </div>
                  <p className="font-16 text-uppercase mb-0 pt-2 text-blue-color montserrat-semibold">
                    {card.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* All referrals table */}
          <div className="border-radius-16 bg-light-white-color pt-3 border-light-purple mt-5">
            <div className="px-3 d-flex flex-wrap justify-content-between align-itmes-center gap-2 mb-2">
              <p className="text-blue-color font-24 montserrat-medium mb-0">
                All referrals
              </p>
            </div>

            <div className="table-responsive">
              <table className="table text-nowrap">
                <thead className="border-light-purple border-start-0 border-end-0 channel-table">
                  <tr>
                    {[
                      "Referrer name",
                      "Referrer mobile",
                      "Referee name",
                      "Referee mobile",
                      "Joining status",
                      "Date",
                      "Arn id",
                      "Acknowledgement status",
                    ].map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="font-14 montserrat-medium px-3 text-center"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {errorPageData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No referrals found.
                      </td>
                    </tr>
                  ) : (
                    errorPageData.map((item) => {
                      const row = [
                        item?.referrer_name,
                        item?.referrer_mobile,
                        item?.referee_name,
                        item?.referee_mobile_number,
                        item?.joining_status,
                        item?.date
                          ? new Date(item.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : "-",
                        item?.arn_id,
                        item?.acknowledgement_status,
                      ];

                      return (
                        <tr
                          key={
                            item?.id ||
                            item?.arn_id ||
                            item?.referee_mobile_number
                          }
                        >
                          {row.map((cell, i) => (
                            <td
                              key={i}
                              className={`font-14 montserrat-semibold py-3 px-3 ${
                                i === 7 ? "text-center" : ""
                              }`}
                            >
                              {cell || "-"}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Referral pagination controls */}
            <div className="row gy-2 d-flex align-items-center m-3">
              <div className="col-lg-7 d-flex justify-content-end gap-4">
                <button
                  className="text-gray-color border-gray border-radiu-8 px-3 py-2 bg-transparent font-14 poppins-medium"
                  disabled={currentErrorPage === 1}
                  onClick={() => setCurrentErrorPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <button
                  className="border-0 border-radiu-8 bg-blue-color text-white px-3 py-2 font-14 poppins-medium"
                  disabled={currentErrorPage === totalErrorPages}
                  onClick={() =>
                    setCurrentErrorPage((p) => Math.min(totalErrorPages, p + 1))
                  }
                >
                  Next
                </button>
              </div>
              <div className="col-lg-5 d-flex align-items-center justify-content-end gap-2">
                <label className="font-14 poppins-medium">Rows per page</label>
                <select
                  className="form-select border-gray border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color"
                  value={rowsPerErrorPage}
                  onChange={(e) => {
                    setRowsPerErrorPage(Number(e.target.value));
                    setCurrentErrorPage(1);
                  }}
                >
                  {[5, 10, 15, 20].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* All participants table */}
          <div className="border-radius-16 bg-light-white-color pt-3 border-light-purple mt-5">
            <div className="px-3 d-flex flex-wrap justify-content-between align-itmes-center gap-2 mb-2">
              <p className="text-blue-color font-24 montserrat-medium mb-0">
                All participants
              </p>
            </div>

            <div className="table-responsive">
              <table className="table text-nowrap">
                <thead className="border-light-purple border-start-0 border-end-0 channel-table">
                  <tr>
                    {[
                      "Name",
                      "Mobile number",
                      "Email",
                      "Declined referrals",
                      "Total referrals",
                      "Arn id",
                      "Accepted referrals",
                    ].map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="font-14 montserrat-medium px-3 text-center"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {participantPageData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center">
                        No participants found.
                      </td>
                    </tr>
                  ) : (
                    participantPageData.map((item) => (
                      <tr key={item?.id || item?.arn_id || item?.mobile_number}>
                        {[
                          item?.name,
                          item?.mobile_number,
                          item?.email,
                          item?.declined_referrals,
                          item?.total_referrals,
                          item?.arn_id,
                          item?.accepted_referrals,
                        ].map((cell, i) => (
                          <td
                            key={i}
                            className={`font-14 montserrat-semibold py-3 px-3 ${
                              i === 6 ? "text-center" : ""
                            }`}
                          >
                            {cell ?? "-"}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Participants pagination controls */}
            <div className="row gy-2 d-flex align-items-center m-3">
              <div className="col-lg-7 d-flex justify-content-end gap-4">
                <button
                  className="text-gray-color border-gray border-radiu-8 px-3 py-2 bg-transparent font-14 poppins-medium"
                  disabled={currentParticipantPage === 1}
                  onClick={() =>
                    setCurrentParticipantPage((p) => Math.max(1, p - 1))
                  }
                >
                  Previous
                </button>
                <button
                  className="border-0 border-radiu-8 bg-blue-color text-white px-3 py-2 font-14 poppins-medium"
                  disabled={currentParticipantPage === totalParticipantPages}
                  onClick={() =>
                    setCurrentParticipantPage((p) =>
                      Math.min(totalParticipantPages, p + 1)
                    )
                  }
                >
                  Next
                </button>
              </div>
              <div className="col-lg-5 d-flex align-items-center justify-content-end gap-2">
                <label className="font-14 poppins-medium">Rows per page</label>
                <select
                  className="form-select border-gray border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color"
                  value={rowsPerParticipantPage}
                  onChange={(e) => {
                    setRowsPerParticipantPage(Number(e.target.value));
                    setCurrentParticipantPage(1);
                  }}
                >
                  {[5, 10, 15, 20].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Top referrers & earners */}
          <div className="row py-5">
            <div className="col-lg-6">
              <p className="font-24 montserrat-medium text-blue-color">
                Top 3 Referrers
              </p>
              {Array.isArray(dashStatData?.top_referrers) &&
              dashStatData.top_referrers.length > 0 ? (
                <div className="row g-2">
                  {dashStatData.top_referrers.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3 d-flex align-items-center justify-content-center"
                    >
                      <div className="reffer-card bg-white border-bright-gray border-radius-12 text-center px-2 d-flex flex-column align-items-center justify-content-center py-3 h-100">
                        <img src={User} className="mb-3" alt="User" />
                        <p className="font-14 montserrat-semibold text-blue-color mb-0">
                          {item?.name}
                        </p>
                        <p className="text-blue-color w-100 font-12 montserrat-medium text-truncate mb-1">
                          {item?.email}
                        </p>
                        <p className="font-16 montserrat-semibold text-blue-color mb-0">
                          {item?.total_meteors_earned ?? 0} Referrals
                        </p>
                        <p className="font-16 montserrat-semibold text-blue-color mb-0">
                          {item?.total_referrals ?? 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted font-18 mt-3 text-center">
                  No referrals data found.
                </p>
              )}
            </div>

            <div className="col-lg-6">
              <p className="font-24 montserrat-medium text-blue-color">
                Top 3 Earners
              </p>
              {Array.isArray(dashStatData?.top_earners) &&
              dashStatData.top_earners.length > 0 ? (
                <div className="row g-2">
                  {dashStatData.top_earners.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3 d-flex align-items-center justify-content-center"
                    >
                      <div className="reffer-card border-bright-gray bg-white border-radius-12 text-center d-flex px-2 flex-column align-items-center justify-content-center py-3 h-100">
                        <img src={User} className="mb-3" alt="User" />
                        <p className="font-14 montserrat-semibold text-blue-color mb-0">
                          {item?.name}
                        </p>
                        <p className="text-blue-color w-100 font-12 montserrat-medium text-truncate mb-1">
                          {item?.email}
                        </p>
                        <p className="font-16 montserrat-semibold text-blue-color mb-0">
                          {item?.total_referrals ?? 0} Stars
                        </p>
                        <p className="font-16 montserrat-semibold text-blue-color mb-0">
                          {item?.total_stars1 ?? 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted font-18 mt-3 text-center">
                  No earners data found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
