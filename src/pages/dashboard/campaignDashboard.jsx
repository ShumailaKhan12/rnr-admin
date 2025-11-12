
import React, { useEffect, useState, useContext } from "react";
import {
  IoChevronDown,
  IoAdd,
  IoHelpCircleOutline,
  IoFlash,
  IoSettingsSharp,
  IoClose,
} from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { postData } from "../../services/api";
import { DecryptFunction } from "../../utils/decryptFunction";
import { toastError, toastSuccess } from "../../utils/toster";
import { UserContext } from "../../utils/UseContext/useContext";
import { useNavigate } from 'react-router-dom';

// Images
import Logo1 from "../../assets/images/Dashboard-img/group 1.svg";
import Logo2 from "../../assets/images/Dashboard-img/TrendUp.svg"
import CampaignNavbar from "../../components/campaignNavbar";
import Astronut from "../../assets/images/Dashboard-img/astronut.svg";
import { RiDeleteBin5Fill } from "react-icons/ri";


const CampaignDashboard = () => {
  // const [activeTab, setActiveTab] = useState("My Campaigns");
  const [campList, setcampList] = useState();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  console.log('campList: ', campList);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    url: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const GetAdminUid = sessionStorage.getItem("Auth");
  const { setLogo, ContextToEditForm, setContextToEditForm, ContextCampEditDataAPI, setContextCampEditDataAPI } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          logo: file,
        }));

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file (PNG, JPG, GIF, etc.)");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating campaign:", formData);
    // Here you would typically send the data to your backend
    setShowModal(false);
    setFormData({
      name: "",
      subtitle: "",
      url: "",
      logo: null,
    });
    setLogoPreview(null);
  };


  // =================
  // API FUNCTIONALITY
  // =================

  // const HandleMainDashdAPI = async () => {
  //   try {
  //     const getAuth = await postData("/admin/auths", {
  //       admin_uid: GetAdminUid,
  //     });
  //     const payload = {
  //       admin_uid: GetAdminUid,
  //       mode: getAuth?.mode,
  //       log_alt: getAuth?.log_alt,
  //     };
  //     const response = await postData(`/admin/edit/${GetAdminUid}`, payload);
  //     console.log('response:-list ', response);
  //     setcampList(response?.all_campaigns);

  //     // const Decrpt = await DecryptFunction(response?.data);
  //   } catch (error) {
  //     // toastError();
  //     console.log("error: ", error);
  //   }
  // };
  const HandleMainDashdAPI = async () => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });

      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
      };

      const response = await postData(`/admin/edit/${GetAdminUid}`, payload);
      console.log(" Full API Response:", response);

      if (response?.program_details?.length > 0) {
        setcampList(response.program_details);
      } else {
        setcampList([]);
      }
    } catch (error) {
      console.log("Error loading campaigns:", error);
      toastError("Failed to load campaigns");
    }
  };

  // Handle Camp Form Edit 
  const HandleCampEdit = async (prid) => {
    setIsBtnLoading(prid);
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
      };
      const response = await postData(`/admin/edit/${prid}`, payload);
      console.log('response-edit: ', response);
      if (response?.success) {
        setContextCampEditDataAPI(response)
        setContextToEditForm(true)

        navigate("/campaignform");
      }
    } catch (error) {
      console.log('error: ', error);

    }

  }

  // Handle Camp Delete 
  const HandleCampDelete = async (prid) => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
      };
      const response = await postData(`/admin/delete-campaign/${prid}`, payload);
      console.log('response-delete: ', response);
      if (response?.success) {
        toastSuccess(response?.message);

        // Remove from state
        setcampList((prev) => prev.filter((item) => item.program_id !== prid));
      }
    } catch (error) {
      console.log('error: ', error);
      toastError(error?.message);

    }
  }
  useEffect(() => {
    HandleMainDashdAPI();
  }, []);
  return (
    <>
      <div className="min-vh-100 bg-light">
        {/* Header */}
        <CampaignNavbar />

        {/* Main Content */}
        <main className="container-fluid py-4">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-9">
              {/* <h2 className="h4 fw-semibold text-dark mb-4">Draft Campaigns</h2> */}
              {campList?.length > 0 ? (
                <>
                  <p className="text-blue-color font-24 montserrat-semibold mb-0">All Campaigns</p>
                  <p className="text-blue-color font-12 montserrat-medium">Create, manage, and monitor all your campaigns from one place.</p>

                  <div className="d-flex flex-column gap-3">
                    {campList?.map((program, i) =>
                      program?.basic_info?.map((basic, index) => (
                        <div
                          key={`${i}-${index}`}
                          className="card campaign-card border-radius-12 border-0 hover-shadow transition"
                        >
                          <div className="card-body px-4 py-3">
                            <div className="row align-items-center">
                              <div className="col-auto d-flex align-items-center gap-3">
                                <div
                                  className="campaign-img text-white rounded-circle d-flex align-items-center justify-content-center overflow-hidden"
                                >
                                  <img
                                    src={basic?.logo || "https://via.placeholder.com/60"}
                                    className="logo"
                                    alt="Logo"
                                  />
                                </div>
                                <div>
                                  <h5 className="mb-0 text-blue-color font-28 montserrat-semibold">
                                    {basic?.program_name || "Unnamed Program"}
                                  </h5>
                                  <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
                                    Loyalty Program
                                  </p>
                                </div>
                              </div>

                              <div className="col-auto mx-auto">
                                <div className="text-center text-blue-color">
                                  <div className="font-32 montserrat-semibold mb-0">
                                    {basic?.total_participants || 0}
                                  </div>
                                  <div className="small font-16 montserrat-medium">
                                    Total Participants
                                  </div>
                                </div>
                              </div>

                              <div className="col-auto">
                                <div className="d-flex gap-3 align-items-center">
                                  {/* <NavLink to="/dashboard">
                <button
                  onClick={() => {
                    sessionStorage.setItem("Prgid", program?.program_id);
                    sessionStorage.setItem("campaignName", basic?.program_name);
                    setLogo(basic?.logo);
                    localStorage.setItem("logo", basic?.logo);
                  }}
                  className="rounded-pill bg-purple-color border-0 px-4 py-2 font-14 montserrat-medium text-white"
                >
                  Dashboard
                </button>
              </NavLink> */}

                                  <NavLink
                                    to="/campaignform"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "editProgramData",
                                        JSON.stringify(program))
                                        setContextToEditForm(true);
                                    }}
                                  >
                                    <button
                                      className="border-purple text-purple-color font-14 montserrat-medium rounded-pill bg-transparent px-4 py-2 d-flex align-items-center gap-2"
                                    >
                                      Edit
                                    </button>
                                  </NavLink>


                                  {/* <div
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal-${program?.program_id}`}
                style={{ cursor: "pointer" }}
              >
                <RiDeleteBin5Fill className="font-24 text-danger mt-2" />
              </div> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Delete Modal */}
                          {/* <div
        className="modal fade"
        id={`deleteModal-${program?.program_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this campaign?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => HandleCampDelete(program?.program_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> */}
                        </div>
                      ))
                    )}

                  </div>
                </>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                  <img src={Astronut} className="pt-5" alt="Loading" />
                  <p className="font-18 montserrat-medium text-gray-color text-center mt-3">Looks like you haven’t created any campaigns yet.
                    <br />
                    Let’s add one to move forward!</p>
                </div>

              )}

            </div>
          </div>
        </main >

        {/* Footer */}
        {/* <footer className="bg-light border-top fixed-bottom">
          <div className="container-fluid py-3">
            <div className="row align-items-center">
              <div className="col-auto d-flex align-items-center gap-3">
                <span className="fw-semibold">viral.loops</span>
                <span className="small text-muted">
                  ©2025 Viral Loops. All rights reserved. Terms and Privacy
                </span>
              </div>

              <div className="col d-flex justify-content-end">
                <div className="text-end">
                  <div className="fw-medium">Activate Windows</div>
                  <div className="small text-muted">
                    Go to Settings to activate Windows.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer> */}

        {/* Create Campaign Modal */}
        {
          showModal && (
            <div
              className="modal fade show d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title fw-semibold">
                      Create New Campaign
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body pt-3">
                    <div>
                      <div className="mb-3">
                        <label
                          htmlFor="campaignName"
                          className="form-label fw-medium"
                        >
                          Campaign Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="campaignName"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter campaign name"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="campaignSubtitle"
                          className="form-label fw-medium"
                        >
                          Subtitle
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="campaignSubtitle"
                          name="subtitle"
                          value={formData.subtitle}
                          onChange={handleInputChange}
                          placeholder="Enter campaign subtitle"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="campaignUrl"
                          className="form-label fw-medium"
                        >
                          Campaign URL
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          id="campaignUrl"
                          name="url"
                          value={formData.url}
                          onChange={handleInputChange}
                          placeholder="https://pages.viral-loops.com/..."
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-medium">
                          Company Logo
                        </label>
                        <div className="d-flex align-items-center gap-3">
                          {logoPreview ? (
                            <div className="position-relative">
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="rounded border"
                                style={{
                                  width: "64px",
                                  height: "64px",
                                  objectFit: "cover",
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle p-1"
                                style={{
                                  transform: "translate(50%, -50%)",
                                  width: "24px",
                                  height: "24px",
                                }}
                                onClick={() => {
                                  setLogoPreview(null);
                                  setFormData((prev) => ({
                                    ...prev,
                                    logo: null,
                                  }));
                                }}
                              >
                                <IoClose size={14} />
                              </button>
                            </div>
                          ) : (
                            <div
                              className="border border-2 border-dashed rounded d-flex align-items-center justify-content-center text-muted"
                              style={{
                                width: "64px",
                                height: "64px",
                              }}
                            >
                              <span style={{ fontSize: "24px" }}>+</span>
                            </div>
                          )}
                          <div className="flex-grow-1">
                            <input
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={handleLogoUpload}
                            />
                            <div className="form-text">
                              Upload PNG, JPG, or GIF. Max size: 2MB
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={handleSubmit}
                        >
                          <IoAdd size={16} />
                          Create Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div >
      {/* 
      <style jsx>{`
        .bg-purple {
          background-color: #6f42c1;
        }
        .hover-shadow:hover {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }
        .transition {
          transition: all 0.2s ease-in-out;
        }
      `}</style> */}
    </>
  );
};

export default CampaignDashboard;
