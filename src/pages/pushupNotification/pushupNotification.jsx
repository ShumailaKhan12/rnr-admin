import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import { Nav } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";

// Images
import Filter from "../../assets/images/Dashboard-img/FadersHorizontal.svg";
import { useForm } from "react-hook-form";
import {
  PiPencilSimple,
  PiTrashSimple,
  PiPauseCircle,
  PiCopySimpleLight,
} from "react-icons/pi";
import Button from "../../components/button";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
// Import Json
const NotificationData = [
  {
    title: "You’ve earned A new star!",
    message: "Complete 1 more referral to unlock your next galaxy.",
  },
  {
    title: "You’ve earned A new star!",
    message: "Complete 1 more referral to unlock your next galaxy.",
  },
  {
    title: "You’ve earned A new star!",
    message: "Complete 1 more referral to unlock your next galaxy.",
  },
  {
    title: "You’ve earned A new star!",
    message: "Complete 1 more referral to unlock your next galaxy.",
  },
];
const PushupNotification = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [NotifTable, setNotifTable] = useState();
  console.log('NotifTable: ', NotifTable);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const GetAdminUid = sessionStorage.getItem("Auth");
  const ProgramId = sessionStorage.getItem("Prgid");

  // =================
  // API FUNCTIONALITY
  // =================

  const onSubmit = async (data) => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
        program_id: ProgramId,
        title: data?.notifyTitle,
        message: data?.message,
        button_text: data?.buttonText,
        button_url: data?.buttonUrl,
        segment: data?.segment,
        specific_users: data?.specific_users,
        date: new Date(data?.date)?.toLocaleDateString("en-GB"),
        time: data?.time,
      };
      const response = await postData("/admin/push-notification", payload);
      toastSuccess(response?.message);
    } catch (error) {
      toastError(error?.message);
    }
  };

  const GetNotfiData = async () => {
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
      const response = await postData("/admin/table-push-notifications", payload);
      setNotifTable(response?.notifications)
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    GetNotfiData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-light-white-3-color py-5 min-vh-100">
        <div className="container mb-5 d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-0 text-blue-color montserrat-semibold font-24">
              Pushup Notification
            </p>
            <p className="mb-0 text-blue-color montserrat-medium font-12">
              Create, schedule, and manage push notifications to engage users at
              the right moments.
            </p>
          </div>
          <div>
            <p className="font-14 montserrat-medium text-blue-color">Existing Notification List  <IoIosArrowForward className="font-20" /></p>
          </div>
        </div>
        {/* <div className="nav-tab-bg d-flex align-items-center px-5">
          <Nav
            className="container"
            variant="underline"
            activeKey={activeTab}
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="tab1"
                className="font-16 montserrat-semibold text-border-gray-color"
              >
                Create new notification
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="tab2"
                className="font-16 montserrat-semibold text-border-gray-color"
              >
                Existing Notification list
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="bg-light-white-1-color filter-btn px-3 py-2 d-flex justify-content-between align-items-center me-5">
            <p className="mb-0 text-blue-color montserrat-medium font-14 me-2">
              Filter{" "}
            </p>
            <img src={Filter} alt="Filter" />
          </div>
        </div> */}
        <div className="container py-5">
          {/* Tab Content */}

          {/* tab 1 (Exclusive Offer) Start Here */}
          {activeTab === "tab1" && (
            <div className="row gy-3">
              <div className="col-lg-7">
                <p className="font-14 montserrat-medium text-border-gray-color">
                  Create a new notification by filling the details below
                </p>
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Title for the notification
                    </label>
                    <input
                      type="text"
                      className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2 "
                      {...register("notifyTitle")}
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Message
                    </label>
                    <input
                      type="text"
                      className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2 "
                      {...register("message")}
                    />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Button Text
                    </label>
                    <input
                      type="text"
                      className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2 "
                      {...register("buttonText")}
                    />
                  </div>

                  <div className="col-lg-4 mb-3">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Button URL
                    </label>
                    <input
                      type="text"
                      className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2 "
                      {...register("buttonUrl")}
                    />
                  </div>
                  {/* <hr  className='text-white'/> */}
                  <p className="font-14 montserrat-medium text-border-gray-color border-top border-white pt-4">
                    Select all whom you want to send this to
                  </p>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Select from segment
                    </label>
                    <select
                      class="form-select login-input border-0"
                      aria-label="Default select example"
                      {...register("segment")}
                    >
                      <option selected>All</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                    </select>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Specific user
                    </label>
                    <select
                      class="form-select login-input border-0"
                      aria-label="Default select example"
                      {...register("specific_users")}
                    >
                      <option selected>Select/ type user name</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-top border-white pt-4">
                    <p className="font-14 montserrat-medium text-border-gray-color">
                      Schedule for later in advance
                    </p>
                    <p className="text-blue-color font-14 montserrat-medium">
                      View all scheduled{" "}
                      <IoIosArrowForward className="font-20" />
                    </p>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Choose Date
                    </label>
                    <input
                      type="date"
                      className="form-control login-input rounded-3 text-blue-color font-14 montserrat-medium border-0 py-2"
                      {...register("date")}
                    />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label font-16 montserrat-semibold text-blue-color">
                      Choose Time
                    </label>
                    <input
                      type="time"
                      className="form-control login-input rounded-3 text-blue-color font-14 montserrat-medium border-0 py-2"
                      {...register("time")}
                    />
                  </div>
                  <div className="col-lg-6 mt-3">
                    <Button
                      btn_class={"text-white bg-blue-color border-0 px-5"}
                      btn_title={"Save & Send"}
                    />
                  </div>
                </form>
              </div>

              <div className="col-lg-5 d-flex justify-content-center">
                <div className="pushup-preview-box w-100 bg-white p-3 border-radius-16 d-flex align-items-center justify-content-center">
                  <p className="text-blue-color font-24 montserrat-medium">
                    Screen Preview
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 Content (Exciting Prizes) Start Here */}
          {activeTab === "tab2" && (
            <div className="row gy-3">
              <div className="col-lg-7">
                <div className="table-responsive">
                  <table className="table text-center notification-table earning-table middle-align border-radius-16">
                    <thead className="position-sticky top-0">
                      <tr>
                        <th
                          scope="col"
                          className="font-16 montserrat-medium text-blue-color ps-3 text-start py-3"
                        >
                          Notification Titles
                        </th>
                        <th
                          scope="col"
                          className="font-16 montserrat-medium text-blue-color ps-5 py-3"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="font-16 montserrat-medium text-blue-color ps-5 py-3"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {NotifTable?.map((item, index) => (
                        <tr key={index}>
                          <td className="font-14 montserrat-medium ps-3 text-capitalize text-start py-3">
                            {item?.title}
                          </td>
                          <td className="font-14 montserrat-medium py-3">
                            {item?.message}
                          </td>
                          <td className="font-14 montserrat-medium py-3">
                            <div className="d-flex justify-content-center align-items-center gap-3">
                              <button className="icon-btn border-0 width-32 height-32 push-edit-icon rounded-circle">
                                <PiPencilSimple className="font-16" />
                              </button>
                              <button className="icon-btn border-0 width-32 height-32 copy-icon rounded-circle">
                                <PiCopySimpleLight className="font-16" />
                              </button>
                              <button className="icon-btn border-0 width-32 height-32 pause-btn rounded-circle">
                                <PiPauseCircle className="font-16" />
                              </button>
                              <button onClick={() => HandleDeleteNotify()} className="icon-btn border-0 width-32 height-32 reward-delete-icon rounded-circle">
                                <PiTrashSimple className="font-16" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-5 d-flex justify-content-center">
                <div className="pushup-preview-box w-100 bg-white p-3 border-radius-16 d-flex align-items-center justify-content-center">
                  s
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PushupNotification;
