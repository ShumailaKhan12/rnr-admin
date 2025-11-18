// // import React, { useContext, useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useNavigate } from "react-router-dom";
// // import { Nav } from "react-bootstrap";

// // // Components
// // import CampaignNavbar from "../../components/campaignNavbar";
// // import Button from "../../components/button";
// // import ConfirmDeleteModal from "../../components/modal";
// // import { postData } from "../../services/api";
// // import { toastError, toastSuccess } from "../../utils/toster";
// // import { UserContext } from "../../utils/UseContext/useContext";

// // // React icon
// // import { IoIosArrowForward } from "react-icons/io";
// // import { RxCross2 } from "react-icons/rx";
// // import { FaFacebookSquare, FaTwitterSquare, FaYoutube } from "react-icons/fa";
// // import { AiFillInstagram } from "react-icons/ai";

// // // Tab
// // const tabs = [
// //   { key: "tab1", label: "Basic Info" },
// //   { key: "tab2", label: "Create Galaxy" },
// //   { key: "tab3", label: "Rewards" },
// // ];

// // const CampaignForm = () => {
// //   // react-hook-form (kept for mail form if needed)
// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     formState: { errors },
// //     watch,
// //     reset,
// //     trigger,
// //   } = useForm();
// //   const { ContextToEditForm } = useContext(UserContext);
// //   const navigate = useNavigate();

// //   // Auth & Program from sessionStorage
// //   const adminUid = sessionStorage.getItem("Auth");

// //   // ------------------
// //   // STATE
// //   // ------------------
// //   const [logo, setLogo] = useState(null);
// //   const [galaxyCount, setGalaxyCount] = useState(1);
// //   const [activeTab, setActiveTab] = useState(tabs[0].key);
// //   const [enabledTabs, setEnabledTabs] = useState([tabs[0].key]);
// //   const [deleteModal, setDeleteModal] = useState({ show: false, index: null });

// //   const galaxies = watch("galaxies") || [];
// //   const isFirstGalaxyValid =
// //     galaxies[0]?.galaxy_name?.trim() &&
// //     Number(galaxies[0]?.total_milestones) > 0;

// //   // Validation
// //   const validateAllGalaxies = () => {
// //     if (!galaxies.length)
// //       return toastError("At least one galaxy is required") || false;

// //     for (let g = 0; g < galaxies.length; g++) {
// //       const galaxy = galaxies[g];
// //       if (!galaxy.galaxy_name?.trim())
// //         return toastError(`Fill Galaxy Name for Galaxy ${g + 1}`) || false;
// //       if (!galaxy.total_milestones || galaxy.total_milestones < 1)
// //         return toastError(`Select milestones for Galaxy ${g + 1}`) || false;

// //       const milestones = galaxy.milestones || [];
// //       for (let m = 0; m < Number(galaxy.total_milestones); m++) {
// //         const ms = milestones[m];
// //         if (!ms?.milestone_name?.trim())
// //           return (
// //             toastError(
// //               `Fill Milestone Name in Galaxy ${g + 1}, Milestone ${m + 1}`
// //             ) || false
// //           );
// //         if (!ms?.display_message?.trim())
// //           return (
// //             toastError(
// //               `Fill Display Message in Galaxy ${g + 1}, Milestone ${m + 1}`
// //             ) || false
// //           );
// //         if (
// //           ms?.referrals_required_to_unlock === "" ||
// //           ms?.referrals_required_to_unlock === undefined
// //         )
// //           return (
// //             toastError(
// //               `Fill Referrals Required in Galaxy ${g + 1}, Milestone ${m + 1}`
// //             ) || false
// //           );
// //         if (
// //           ms?.meteors_required_to_unlock === "" ||
// //           ms?.meteors_required_to_unlock === undefined
// //         )
// //           return (
// //             toastError(
// //               `Fill Meteors Required in Galaxy ${g + 1}, Milestone ${m + 1}`
// //             ) || false
// //           );
// //         if (!ms?.milestone_description?.trim())
// //           return (
// //             toastError(
// //               `Fill Description in Galaxy ${g + 1}, Milestone ${m + 1}`
// //             ) || false
// //           );
// //       }
// //     }
// //     return true;
// //   };

// //   // Navigation
// //   const goToNextTab = async () => {
// //     const currentIdx = tabs.findIndex((t) => t.key === activeTab);
// //     const nextTab = tabs[currentIdx + 1];
// //     if (!nextTab) return;

// //     const tabFields = {
// //       tab1: ["program_name"],
// //       tab2: ["galaxies"],
// //       tab3: [
// //         "joining_bonus",
// //         "meteors_referral",
// //         "stars_joining",
// //         "link_validity",
// //         "meteor",
// //         "y_star",
// //       ],
// //     };

// //     if (
// //       !ContextToEditForm &&
// //       !(await trigger(tabFields[activeTab], { shouldFocus: true }))
// //     ) {
// //       return toastError("Fill all required fields!");
// //     }

// //     setEnabledTabs((prev) =>
// //       prev.includes(nextTab.key) ? prev : [...prev, nextTab.key]
// //     );
// //     setActiveTab(nextTab.key);
// //   };

// //   // Delete Galaxy
// //   const confirmDelete = () => {
// //     if (galaxies.length === 1)
// //       return (
// //         toastError("At least one galaxy required") ||
// //         setDeleteModal({ show: false, index: null })
// //       );
// //     setValue(
// //       "galaxies",
// //       galaxies.filter((_, i) => i !== deleteModal.index),
// //       { shouldValidate: true }
// //     );
// //     setGalaxyCount((prev) => prev - 1);
// //     toastSuccess("Galaxy deleted");
// //     setDeleteModal({ show: false, index: null });
// //   };

// //   // File Upload
// //   const handleLogoUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (!file || !file.type.startsWith("image/"))
// //       return alert("Select valid image");
// //     const reader = new FileReader();
// //     reader.onload = (e) => setLogo(e.target.result);
// //     reader.readAsDataURL(file);
// //   };

// //   // Submit
// //   const onSubmit = async (data) => {
// //     try {
// //       const payload = {
// //         admin_uid: adminUid,
// //         program_name: data.program_name || "",
// //         galaxies: data.galaxies || [],
// //         joining_bonus: data.joining_bonus ?? 0,
// //         meteors_referral: data.meteors_referral ?? 0,
// //         stars_joining: data.stars_joining ?? 0,
// //         link_validity: data.link_validity ?? 0,
// //         meteor: data.meteor ?? 1,
// //         y_star: data.y_star ?? 1,
// //       };

// //       const res = await postData(`/admin/add-rewards/${adminUid}`, payload);
// //       if (res?.success) {
// //         toastSuccess(
// //           ContextToEditForm ? "Campaign updated!" : "Campaign created!"
// //         );
// //         navigate("/dashboard");
// //       }
// //     } catch (err) {
// //       console.error("Submit error:", err);
// //       toastError("Failed to save campaign");
// //     }
// //   };

// //   // Load edit data
// //   useEffect(() => {
// //     const stored = localStorage.getItem("editProgramData");
// //     if (!stored)
// //       return !ContextToEditForm && reset({ program_name: "", galaxies: [] });

// //     const data = JSON.parse(stored);
// //     const program = data?.basic_info?.[0] || {};
// //     const gal = data?.galaxies || [];
// //     const rewards = data?.rewards_rule?.[0] || {};

// //     reset({
// //       program_name: program.program_name || "",
// //       galaxies: gal.map((g) => ({
// //         galaxy_name: g.galaxy_name,
// //         stars: g.stars_to_be_achieved,
// //         total_milestones: g.milestones.length,
// //         milestones: g.milestones.map((m) => ({
// //           milestone_name: m.milestone_name,
// //           display_message: m.display_message,
// //           referrals_required_to_unlock: m.referrals_required_to_unlock,
// //           meteors_required_to_unlock: m.meteors_required_to_unlock,
// //           milestone_description: m.milestone_description,
// //         })),
// //       })),
// //       joining_bonus: rewards.joining_bonus_meteors,
// //       meteors_referral: rewards.meteors_per_referral,
// //       stars_joining: rewards.stars_on_joining,
// //       link_validity: rewards.link_validity_days,
// //       meteor: rewards.meteors_to_rupees_rate,
// //       y_star: rewards.meteors_to_rupees_rate,
// //     });
// //     setGalaxyCount(gal.length);
// //   }, [reset, ContextToEditForm]);

// //   // Number input handler
// //   const preventNegative = (e) =>
// //     ["-", "e", "E", "+"].includes(e.key) && e.preventDefault();

// //   return (
// //     <div className="min-vh-100 bg-light-white-3-color">
// //       <CampaignNavbar />

// //       <div className="container pt-5">
// //         <p className="text-blue-color font-24 montserrat-semibold mb-0">
// //           {ContextToEditForm ? "Edit Campaign" : "Create Campaign"}
// //         </p>
// //         <p className="text-blue-color font-12 montserrat-medium">
// //           {ContextToEditForm
// //             ? "Edit the fields below to update your campaign"
// //             : "Start a new campaign by filling out the details below."}
// //         </p>
// //       </div>

// //       <form
// //         onSubmit={handleSubmit(onSubmit)}
// //         onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
// //       >
// //         {/* Tab Navigation */}
// //         <div className="campaign-tab-bg d-flex justify-content-between align-items-center">
// //           <div className="container ps-5">
// //             <Nav
// //               activeKey={activeTab}
// //               onSelect={(key) =>
// //                 (ContextToEditForm || enabledTabs.includes(key)) &&
// //                 setActiveTab(key)
// //               }
// //             >
// //               {tabs.map((tab) => (
// //                 <Nav.Item key={tab.key}>
// //                   <Nav.Link
// //                     eventKey={tab.key}
// //                     className={`font-16 montserrat-semibold ${
// //                       ContextToEditForm
// //                         ? "text-blue-color"
// //                         : !enabledTabs.includes(tab.key)
// //                         ? "text-border-gray-color disabled-tab"
// //                         : "text-border-gray-color"
// //                     }`}
// //                     disabled={
// //                       !ContextToEditForm && !enabledTabs.includes(tab.key)
// //                     }
// //                   >
// //                     {tab.label} <IoIosArrowForward className="mx-1 font-20" />
// //                   </Nav.Link>
// //                 </Nav.Item>
// //               ))}
// //             </Nav>
// //           </div>

// //           {activeTab === "tab3" ? (
// //             <button
// //               type="submit"
// //               className="border-0 bg-blue-color text-white px-4 py-2"
// //             >
// //               Submit
// //             </button>
// //           ) : (
// //             <button
// //               onClick={() => {
// //                 (ContextToEditForm &&
// //                   activeTab === "tab2" &&
// //                   !validateAllGalaxies()) ||
// //                   goToNextTab();
// //               }}
// //               type="button"
// //               className="border-0 bg-blue-color text-white px-4 py-2"
// //             >
// //               Next <IoIosArrowForward className="ms-2" />
// //             </button>
// //           )}
// //         </div>

// //         <div className="container py-3">
// //           {/* TAB 1: Basic Info */}
// //           {activeTab === "tab1" && (
// //             <div className="camp-form row border-radius-16 py-4">
// //               <div className="col-lg-6">
// //                 <div className="mb-3">
// //                   <label className="form-label font-14 text-gray-color montserrat-regular">
// //                     Campaign Name
// //                   </label>
// //                   <input
// //                     {...register("program_name", {
// //                       required: "Campaign name required",
// //                     })}
// //                     className="form-control border-0 login-input text-blue-color montserrat-medium"
// //                     placeholder="Enter campaign name"
// //                   />
// //                   {errors.program_name && (
// //                     <p className="text-danger">{errors.program_name.message}</p>
// //                   )}
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="form-label font-14 text-gray-color montserrat-regular">
// //                     Company Logo
// //                   </label>
// //                   <div className="d-flex align-items-center gap-3">
// //                     {logo ? (
// //                       <div className="position-relative">
// //                         <img
// //                           src={logo}
// //                           alt="Logo"
// //                           className="rounded border"
// //                           style={{
// //                             width: "64px",
// //                             height: "64px",
// //                             objectFit: "cover",
// //                           }}
// //                         />
// //                         <button
// //                           type="button"
// //                           className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle p-1"
// //                           style={{
// //                             transform: "translate(50%, -50%)",
// //                             width: "24px",
// //                             height: "24px",
// //                           }}
// //                           onClick={() => setLogo(null)}
// //                         >
// //                           <IoClose size={14} />
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <div
// //                         className="border border-2 login-input border-dashed rounded d-flex align-items-center justify-content-center text-muted"
// //                         style={{ width: "64px", height: "64px" }}
// //                       >
// //                         <span>+</span>
// //                       </div>
// //                     )}
// //                     <div>
// //                       <label className="upload-box d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
// //                         Upload Image
// //                         <input
// //                           type="file"
// //                           {...register("logo")}
// //                           onChange={handleLogoUpload}
// //                         />
// //                       </label>
// //                       <div className="form-text font-12 montserrat-medium text-gray-color">
// //                         PNG, JPG, GIF. Max 2MB
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* TAB 2: Create Galaxy */}
// //           {activeTab === "tab2" && (
// //             <>
// //               {Array.from({ length: galaxyCount }).map((_, gIdx) => (
// //                 <div key={`galaxy-${gIdx}`} className="row py-4">
// //                   <div className="col-lg-6">
// //                     <div className="bg-white border-radius-12 box-shadow p-4">
// //                       <div className="d-flex justify-content-between mb-3">
// //                         <h5 className="font-18 montserrat-semibold text-gray-color mb-0">
// //                           Galaxy {gIdx + 1}
// //                         </h5>
// //                         <button
// //                           type="button"
// //                           onClick={() =>
// //                             setDeleteModal({ show: true, index: gIdx })
// //                           }
// //                           className="btn border-0 p-1"
// //                           style={{ background: "transparent" }}
// //                         >
// //                           <RxCross2 size={22} color="gray" />
// //                         </button>
// //                       </div>

// //                       <div className="mb-3">
// //                         <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                           Galaxy Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           {...register(`galaxies.${gIdx}.galaxy_name`, {
// //                             required: "Required",
// //                           })}
// //                           className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
// //                         />
// //                       </div>

// //                       <div className="mb-3">
// //                         <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                           Stars
// //                         </label>
// //                         <input
// //                           type="number"
// //                           placeholder="Y Stars"
// //                           min="0"
// //                           onKeyDown={preventNegative}
// //                           {...register(`galaxies.${gIdx}.stars`)}
// //                           className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium no-arrows"
// //                         />
// //                       </div>

// //                       <div>
// //                         <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                           Milestones
// //                         </label>
// //                         <select
// //                           {...register(`galaxies.${gIdx}.total_milestones`)}
// //                           className="form-select login-input text-border-gray-color"
// //                           defaultValue=""
// //                         >
// //                           <option value="">Choose</option>
// //                           {[...Array(8)].map((_, i) => (
// //                             <option key={i + 3} value={i + 3}>
// //                               {i + 3}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Milestones */}
// //                   <div className="col-lg-6 new-milestone-form">
// //                     <div className="bg-white border-radius-12 border-light-gray p-4 milestone-form-sect">
// //                       {Array.from({
// //                         length: Number(
// //                           watch(`galaxies.${gIdx}.total_milestones`) || 1
// //                         ),
// //                       }).map((_, mIdx) => (
// //                         <div key={mIdx} className="row milestone-form">
// //                           {mIdx > 0 && <hr />}
// //                           <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
// //                             Milestone {mIdx + 1}
// //                           </p>

// //                           <div className="col-12 mb-3">
// //                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                               Name
// //                             </label>
// //                             <input
// //                               {...register(
// //                                 `galaxies.${gIdx}.milestones.${mIdx}.milestone_name`,
// //                                 { required: "Required" }
// //                               )}
// //                               className="form-control login-input border-0"
// //                             />
// //                           </div>

// //                           <div className="col-12 mb-3">
// //                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                               Display Message
// //                             </label>
// //                             <input
// //                               {...register(
// //                                 `galaxies.${gIdx}.milestones.${mIdx}.display_message`,
// //                                 { required: "Required" }
// //                               )}
// //                               className="form-control login-input border-0"
// //                             />
// //                           </div>

// //                           <div className="col-6 mb-3">
// //                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                               Referrals
// //                             </label>
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               onKeyDown={preventNegative}
// //                               {...register(
// //                                 `galaxies.${gIdx}.milestones.${mIdx}.referrals_required_to_unlock`,
// //                                 {
// //                                   required: "Required",
// //                                   setValueAs: (v) => (v ? Number(v) : 0),
// //                                 }
// //                               )}
// //                               className="form-control login-input border-0 no-arrows"
// //                             />
// //                           </div>

// //                           <div className="col-6 mb-3">
// //                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                               Meteors
// //                             </label>
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               onKeyDown={preventNegative}
// //                               {...register(
// //                                 `galaxies.${gIdx}.milestones.${mIdx}.meteors_required_to_unlock`,
// //                                 {
// //                                   required: "Required",
// //                                   setValueAs: (v) => (v ? Number(v) : 0),
// //                                 }
// //                               )}
// //                               className="form-control login-input border-0 no-arrows"
// //                             />
// //                           </div>

// //                           <div className="col-12 mb-3">
// //                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
// //                               Description
// //                             </label>
// //                             <textarea
// //                               {...register(
// //                                 `galaxies.${gIdx}.milestones.${mIdx}.milestone_description`
// //                               )}
// //                               rows={3}
// //                               className="form-control login-input border-0"
// //                             />
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}

// //               <Button
// //                 type="button"
// //                 onClick={() =>
// //                   validateAllGalaxies() && setGalaxyCount((prev) => prev + 1)
// //                 }
// //                 btn_class={`border-purple bg-transparent px-4 w-25 ${
// //                   isFirstGalaxyValid
// //                     ? "text-purple-color"
// //                     : "text-gray-color opacity-50 cursor-not-allowed"
// //                 }`}
// //                 btn_title="Create New"
// //                 disabled={!isFirstGalaxyValid}
// //               />
// //             </>
// //           )}

// //           <ConfirmDeleteModal
// //             show={deleteModal.show}
// //             onClose={() => setDeleteModal({ show: false, index: null })}
// //             onConfirm={confirmDelete}
// //             title="Delete Galaxy"
// //             message="Are you sure?"
// //           />

// //           {/* TAB 3: Rewards */}
// //           {activeTab === "tab3" && (
// //             <div className="row py-4">
// //               <div className="col-lg-6">
// //                 <div className="bg-white box-shadow border-radius-12 p-4">
// //                   <p className="font-18 montserrat-semibold text-gray-color mb-0">
// //                     Referrer Rewards
// //                   </p>
// //                   <p className="text-blue-color font-12 montserrat-medium mb-3">
// //                     What referrers get for referring friends
// //                   </p>

// //                   <div className="row">
// //                     {[
// //                       "joining_bonus",
// //                       "meteors_referral",
// //                       "stars_joining",
// //                       "link_validity",
// //                     ].map((field) => (
// //                       <div key={field} className="col-lg-6 mb-3">
// //                         <label className="form-label font-12 montserrat-medium text-gray-color">
// //                           {field
// //                             .split("_")
// //                             .map((w) => w[0].toUpperCase() + w.slice(1))
// //                             .join(" ")}
// //                         </label>
// //                         <input
// //                           type="number"
// //                           min="1"
// //                           onKeyDown={preventNegative}
// //                           {...register(field, {
// //                             required: "Required",
// //                             min: { value: 1, message: "Min 1" },
// //                             setValueAs: (v) => (v ? Number(v) : 1),
// //                           })}
// //                           className="form-control login-input text-blue-color rounded-3 border-0 py-2 no-arrows"
// //                         />
// //                         {errors[field] && (
// //                           <p className="text-danger">{errors[field].message}</p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="bg-white box-shadow border-radius-12 p-4 mt-4">
// //                   <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
// //                     Conversion Rates
// //                   </p>
// //                   <div className="d-flex align-items-center my-3">
// //                     <div>
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         onKeyDown={preventNegative}
// //                         {...register("meteor", {
// //                           required: "Required",
// //                           setValueAs: (v) => (v ? Number(v) : 0),
// //                         })}
// //                         className="form-control login-input border-0 no-arrows"
// //                         placeholder="X Meteor"
// //                       />
// //                       {errors.meteor && (
// //                         <p className="text-danger">{errors.meteor.message}</p>
// //                       )}
// //                     </div>
// //                     <span className="mx-3">=</span>
// //                     <div>
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         onKeyDown={preventNegative}
// //                         {...register("y_star", {
// //                           required: "Required",
// //                           setValueAs: (v) => (v ? Number(v) : 0),
// //                         })}
// //                         className="form-control login-input border-0 no-arrows"
// //                         placeholder="Y Rupees"
// //                       />
// //                       {errors.y_star && (
// //                         <p className="text-danger">{errors.y_star.message}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Invite Card */}
// //               <div className="col-lg-6">
// //                 <div className="bg-white border-light-gray border-radius-12 p-4">
// //                   <div className="invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center p-4">
// //                     <p className="text-white montserrat-semibold font-16">
// //                       Invite A Friend
// //                     </p>
// //                     <div className="position-relative w-100 mb-2">
// //                       <input
// //                         type="text"
// //                         className="form-control bg-white border-0"
// //                         readOnly
// //                       />
// //                       <button
// //                         type="button"
// //                         className="btn btn-sm bg-blue-color text-white position-absolute top-50 end-0 translate-middle-y me-1"
// //                       >
// //                         Copy
// //                       </button>
// //                     </div>
// //                     <div className="my-2">
// //                       <span className="text-white">Or</span>
// //                     </div>
// //                     <button
// //                       type="button"
// //                       className="btn bg-blue-color text-white rounded-pill px-4 py-1 mb-2"
// //                     >
// //                       Share Via WhatsApp
// //                     </button>
// //                     <div className="d-flex gap-2 mt-2">
// //                       <FaFacebookSquare className="text-blue-color font-18 cursor-pointer" />
// //                       <AiFillInstagram className="text-blue-color font-18 cursor-pointer" />
// //                       <FaYoutube className="text-blue-color font-18 cursor-pointer" />
// //                       <FaTwitterSquare className="text-blue-color font-18 cursor-pointer" />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CampaignForm;

// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { Nav } from "react-bootstrap";

// // Components
// import CampaignNavbar from "../../components/campaignNavbar";
// import Button from "../../components/button";
// import ConfirmDeleteModal from "../../components/modal";
// import { postData } from "../../services/api";
// import { toastError, toastSuccess } from "../../utils/toster";
// import { UserContext } from "../../utils/UseContext/useContext";

// // React icon
// import { IoIosArrowForward } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { FaFacebookSquare, FaTwitterSquare, FaYoutube } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";
// import { IoClose } from "react-icons/io5";

// // Tab
// const tabs = [
//   { key: "tab1", label: "Basic Info" },
//   { key: "tab2", label: "Create Galaxy" },
//   { key: "tab3", label: "Rewards" },
// ];

// const CampaignForm = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     watch,
//     reset,
//     trigger,
//   } = useForm();
//   const { ContextToEditForm } = useContext(UserContext);
//   const navigate = useNavigate();

//   const adminUid = sessionStorage.getItem("Auth");

//   // STATE
//   const [logo, setLogo] = useState(null);
//   const [activeTab, setActiveTab] = useState(tabs[0].key);
//   const [enabledTabs, setEnabledTabs] = useState([tabs[0].key]);
//   const [deleteModal, setDeleteModal] = useState({ show: false, galaxyId: null });

//   const galaxies = watch("galaxies") || [];

//   // Generate unique ID for new galaxies
//   const generateGalaxyId = () => `galaxy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//   // Validation - Check if a specific galaxy is valid
//   const isGalaxyValid = (galaxy) => {
//     if (!galaxy) return false;
//     if (!galaxy.galaxy_name?.trim()) return false;
//     if (!galaxy.total_milestones || Number(galaxy.total_milestones) < 3) return false;

//     const milestones = galaxy.milestones || [];
//     const requiredMilestones = Number(galaxy.total_milestones);

//     for (let m = 0; m < requiredMilestones; m++) {
//       const ms = milestones[m];
//       if (!ms) return false;
//       if (!ms.milestone_name?.trim()) return false;
//       if (!ms.display_message?.trim()) return false;
//       if (ms.referrals_required_to_unlock === "" || ms.referrals_required_to_unlock === undefined) return false;
//       if (ms.meteors_required_to_unlock === "" || ms.meteors_required_to_unlock === undefined) return false;
//       if (!ms.milestone_description?.trim()) return false;
//     }
//     return true;
//   };

//   // Check if all galaxies are valid
//   const areAllGalaxiesValid = () => {
//     if (!galaxies.length) return false;
//     return galaxies.every(galaxy => isGalaxyValid(galaxy));
//   };

//   // Validate all galaxies with detailed error messages
//   const validateAllGalaxies = () => {
//     if (!galaxies.length) {
//       toastError("At least one galaxy is required");
//       return false;
//     }

//     for (let g = 0; g < galaxies.length; g++) {
//       const galaxy = galaxies[g];

//       if (!galaxy.galaxy_name?.trim()) {
//         toastError(`Please fill Galaxy Name for Galaxy ${g + 1}`);
//         return false;
//       }

//       if (!galaxy.total_milestones || Number(galaxy.total_milestones) < 3) {
//         toastError(`Please select milestones (minimum 3) for Galaxy ${g + 1}`);
//         return false;
//       }

//       const milestones = galaxy.milestones || [];
//       const requiredMilestones = Number(galaxy.total_milestones);

//       for (let m = 0; m < requiredMilestones; m++) {
//         const ms = milestones[m];

//         if (!ms) {
//           toastError(`Please fill all milestone details in Galaxy ${g + 1}, Milestone ${m + 1}`);
//           return false;
//         }

//         if (!ms.milestone_name?.trim()) {
//           toastError(`Fill Milestone Name in Galaxy ${g + 1}, Milestone ${m + 1}`);
//           return false;
//         }

//         if (!ms.display_message?.trim()) {
//           toastError(`Fill Display Message in Galaxy ${g + 1}, Milestone ${m + 1}`);
//           return false;
//         }

//         if (ms.referrals_required_to_unlock === "" || ms.referrals_required_to_unlock === undefined) {
//           toastError(`Fill Referrals Required in Galaxy ${g + 1}, Milestone ${m + 1}`);
//           return false;
//         }

//         if (ms.meteors_required_to_unlock === "" || ms.meteors_required_to_unlock === undefined) {
//           toastError(`Fill Meteors Required in Galaxy ${g + 1}, Milestone ${m + 1}`);
//           return false;
//         }

//         if (!ms.milestone_description?.trim()) {
//           toastError(`Fill Description in Galaxy ${g + 1}, Milestone ${m + 1}`);
//           return false;
//         }
//       }
//     }
//     return true;
//   };

//   // Navigation
//   const goToNextTab = async () => {
//     const currentIdx = tabs.findIndex((t) => t.key === activeTab);
//     const nextTab = tabs[currentIdx + 1];
//     if (!nextTab) return;

//     const tabFields = {
//       tab1: ["program_name"],
//       tab2: ["galaxies"],
//       tab3: ["joining_bonus", "meteors_referral", "stars_joining", "link_validity", "meteor", "y_star"],
//     };

//     if (!ContextToEditForm && !(await trigger(tabFields[activeTab], { shouldFocus: true }))) {
//       toastError("Please fill all required fields!");
//       return;
//     }

//     // Additional validation for tab2
//     if (activeTab === "tab2" && !validateAllGalaxies()) {
//       return;
//     }

//     setEnabledTabs((prev) =>
//       prev.includes(nextTab.key) ? prev : [...prev, nextTab.key]
//     );
//     setActiveTab(nextTab.key);
//   };

//   // Create New Galaxy
//   const handleCreateNewGalaxy = () => {
//     // Validate all existing galaxies first
//     if (!validateAllGalaxies()) {
//       return;
//     }

//     const newGalaxy = {
//       id: generateGalaxyId(),
//       galaxy_name: "",
//       stars: 0,
//       total_milestones: "",
//       milestones: [],
//     };

//     setValue("galaxies", [...galaxies, newGalaxy], { shouldValidate: false });
//     toastSuccess(`Galaxy ${galaxies.length + 1} created`);
//   };

//   // Delete Galaxy by ID
//   const confirmDelete = () => {
//     if (galaxies.length === 1) {
//       toastError("At least one galaxy is required");
//       setDeleteModal({ show: false, galaxyId: null });
//       return;
//     }

//     const updatedGalaxies = galaxies.filter((g) => g.id !== deleteModal.galaxyId);
//     setValue("galaxies", updatedGalaxies, { shouldValidate: true });

//     toastSuccess("Galaxy deleted successfully");
//     setDeleteModal({ show: false, galaxyId: null });
//   };

//   // File Upload
//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith("image/")) {
//       alert("Please select a valid image");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = (e) => setLogo(e.target.result);
//     reader.readAsDataURL(file);
//   };

//   // Submit
//   const onSubmit = async (data) => {
//     try {
//       // Remove the 'id' field from galaxies before submitting
//       const galaxiesWithoutId = (data.galaxies || []).map(({ id, ...rest }) => rest);

//       const payload = {
//         admin_uid: adminUid,
//         program_name: data.program_name || "",
//         galaxies: galaxiesWithoutId,
//         joining_bonus: data.joining_bonus ?? 0,
//         meteors_referral: data.meteors_referral ?? 0,
//         stars_joining: data.stars_joining ?? 0,
//         link_validity: data.link_validity ?? 0,
//         meteor: data.meteor ?? 1,
//         y_star: data.y_star ?? 1,
//       };

//       const res = await postData(`/admin/add-rewards/${adminUid}`, payload);
//       if (res?.success) {
//         toastSuccess(ContextToEditForm ? "Campaign updated!" : "Campaign created!");
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       console.error("Submit error:", err);
//       toastError("Failed to save campaign");
//     }
//   };

//   // Load edit data
//   useEffect(() => {
//     const stored = localStorage.getItem("editProgramData");
//     if (!stored) {
//       if (!ContextToEditForm) {
//         reset({
//           program_name: "",
//           galaxies: [{
//             id: generateGalaxyId(),
//             galaxy_name: "",
//             stars: 0,
//             total_milestones: "",
//             milestones: [],
//           }],
//         });
//       }
//       return;
//     }

//     const data = JSON.parse(stored);
//     const program = data?.basic_info?.[0] || {};
//     const gal = data?.galaxies || [];
//     const rewards = data?.rewards_rule?.[0] || {};

//     reset({
//       program_name: program.program_name || "",
//       galaxies: gal.map((g) => ({
//         id: generateGalaxyId(),
//         galaxy_name: g.galaxy_name,
//         stars: g.stars_to_be_achieved,
//         total_milestones: g.milestones.length,
//         milestones: g.milestones.map((m) => ({
//           milestone_name: m.milestone_name,
//           display_message: m.display_message,
//           referrals_required_to_unlock: m.referrals_required_to_unlock,
//           meteors_required_to_unlock: m.meteors_required_to_unlock,
//           milestone_description: m.milestone_description,
//         })),
//       })),
//       joining_bonus: rewards.joining_bonus_meteors,
//       meteors_referral: rewards.meteors_per_referral,
//       stars_joining: rewards.stars_on_joining,
//       link_validity: rewards.link_validity_days,
//       meteor: rewards.meteors_to_rupees_rate,
//       y_star: rewards.meteors_to_rupees_rate,
//     });
//   }, [reset, ContextToEditForm]);

//   // Number input handler
//   const preventNegative = (e) => {
//     if (["-", "e", "E", "+"].includes(e.key)) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <div className="min-vh-100 bg-light-white-3-color">
//       <CampaignNavbar />

//       <div className="container pt-5">
//         <p className="text-blue-color font-24 montserrat-semibold mb-0">
//           {ContextToEditForm ? "Edit Campaign" : "Create Campaign"}
//         </p>
//         <p className="text-blue-color font-12 montserrat-medium">
//           {ContextToEditForm
//             ? "Edit the fields below to update your campaign"
//             : "Start a new campaign by filling out the details below."}
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
//       >
//         {/* Tab Navigation */}
//         <div className="campaign-tab-bg d-flex justify-content-between align-items-center">
//           <div className="container ps-5">
//             <Nav
//               activeKey={activeTab}
//               onSelect={(key) => {
//                 if (ContextToEditForm || enabledTabs.includes(key)) {
//                   setActiveTab(key);
//                 }
//               }}
//             >
//               {tabs.map((tab) => (
//                 <Nav.Item key={tab.key}>
//                   <Nav.Link
//                     eventKey={tab.key}
//                     className={`font-16 montserrat-semibold ${
//                       ContextToEditForm
//                         ? "text-blue-color"
//                         : !enabledTabs.includes(tab.key)
//                         ? "text-border-gray-color disabled-tab"
//                         : "text-border-gray-color"
//                     }`}
//                     disabled={!ContextToEditForm && !enabledTabs.includes(tab.key)}
//                   >
//                     {tab.label} <IoIosArrowForward className="mx-1 font-20" />
//                   </Nav.Link>
//                 </Nav.Item>
//               ))}
//             </Nav>
//           </div>

//           {activeTab === "tab3" ? (
//             <button
//               type="submit"
//               className="border-0 bg-blue-color text-white px-4 py-2"
//             >
//               Submit
//             </button>
//           ) : (
//             <button
//               onClick={goToNextTab}
//               type="button"
//               className="border-0 bg-blue-color text-white px-4 py-2"
//             >
//               Next <IoIosArrowForward className="ms-2" />
//             </button>
//           )}
//         </div>

//         <div className="container py-3">
//           {/* TAB 1: Basic Info */}
//           {activeTab === "tab1" && (
//             <div className="camp-form row border-radius-16 py-4">
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label font-14 text-gray-color montserrat-regular">
//                     Campaign Name
//                   </label>
//                   <input
//                     {...register("program_name", {
//                       required: "Campaign name is required",
//                     })}
//                     className="form-control border-0 login-input text-blue-color montserrat-medium"
//                     placeholder="Enter campaign name"
//                   />
//                   {errors.program_name && (
//                     <p className="text-danger">{errors.program_name.message}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <label className="form-label font-14 text-gray-color montserrat-regular">
//                     Company Logo
//                   </label>
//                   <div className="d-flex align-items-center gap-3">
//                     {logo ? (
//                       <div className="position-relative">
//                         <img
//                           src={logo}
//                           alt="Logo"
//                           className="rounded border"
//                           style={{
//                             width: "64px",
//                             height: "64px",
//                             objectFit: "cover",
//                           }}
//                         />
//                         <button
//                           type="button"
//                           className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle p-1"
//                           style={{
//                             transform: "translate(50%, -50%)",
//                             width: "24px",
//                             height: "24px",
//                           }}
//                           onClick={() => setLogo(null)}
//                         >
//                           <IoClose size={14} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div
//                         className="border border-2 login-input border-dashed rounded d-flex align-items-center justify-content-center text-muted"
//                         style={{ width: "64px", height: "64px" }}
//                       >
//                         <span>+</span>
//                       </div>
//                     )}
//                     <div>
//                       <label className="upload-box d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
//                         Upload Image
//                         <input
//                           type="file"
//                           {...register("logo")}
//                           onChange={handleLogoUpload}
//                         />
//                       </label>
//                       <div className="form-text font-12 montserrat-medium text-gray-color">
//                         PNG, JPG, GIF. Max 2MB
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TAB 2: Create Galaxy */}
//           {activeTab === "tab2" && (
//             <>
//               {galaxies.map((galaxy, gIdx) => (
//                 <div key={galaxy.id} className="row py-4">
//                   <div className="col-lg-6">
//                     <div className="bg-white border-radius-12 box-shadow p-4">
//                       <div className="d-flex justify-content-between mb-3">
//                         <h5 className="font-18 montserrat-semibold text-gray-color mb-0">
//                           Galaxy {gIdx + 1}
//                         </h5>
//                         {galaxies.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setDeleteModal({ show: true, galaxyId: galaxy.id })
//                             }
//                             className="btn border-0 p-1"
//                             style={{ background: "transparent" }}
//                           >
//                             <RxCross2 size={22} color="gray" />
//                           </button>
//                         )}
//                       </div>

//                       <div className="mb-3">
//                         <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                           Galaxy Name
//                         </label>
//                         <input
//                           type="text"
//                           {...register(`galaxies.${gIdx}.galaxy_name`, {
//                             required: "Galaxy name is required",
//                           })}
//                           className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
//                           placeholder="Enter galaxy name"
//                         />
//                       </div>

//                       <div className="mb-3">
//                         <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                           Stars
//                         </label>
//                         <input
//                           type="number"
//                           placeholder="Y Stars"
//                           min="0"
//                           onKeyDown={preventNegative}
//                           {...register(`galaxies.${gIdx}.stars`)}
//                           className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium no-arrows"
//                         />
//                       </div>

//                       <div>
//                         <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                           Milestones
//                         </label>
//                         <select
//                           {...register(`galaxies.${gIdx}.total_milestones`, {
//                             required: "Please select number of milestones",
//                           })}
//                           className="form-select login-input text-border-gray-color"
//                           defaultValue=""
//                         >
//                           <option value="">Choose milestones</option>
//                           {[...Array(8)].map((_, i) => (
//                             <option key={i + 3} value={i + 3}>
//                               {i + 3}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Milestones */}
//                   <div className="col-lg-6 new-milestone-form">
//                     <div className="bg-white border-radius-12 border-light-gray p-4 milestone-form-sect">
//                       {Array.from({
//                         length: Number(watch(`galaxies.${gIdx}.total_milestones`) || 0),
//                       }).map((_, mIdx) => (
//                         <div key={mIdx} className="row milestone-form">
//                           {mIdx > 0 && <hr />}
//                           <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
//                             Milestone {mIdx + 1}
//                           </p>

//                           <div className="col-12 mb-3">
//                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                               Name
//                             </label>
//                             <input
//                               {...register(
//                                 `galaxies.${gIdx}.milestones.${mIdx}.milestone_name`,
//                                 { required: "Milestone name is required" }
//                               )}
//                               className="form-control login-input border-0"
//                               placeholder="Enter milestone name"
//                             />
//                           </div>

//                           <div className="col-12 mb-3">
//                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                               Display Message
//                             </label>
//                             <input
//                               {...register(
//                                 `galaxies.${gIdx}.milestones.${mIdx}.display_message`,
//                                 { required: "Display message is required" }
//                               )}
//                               className="form-control login-input border-0"
//                               placeholder="Enter display message"
//                             />
//                           </div>

//                           <div className="col-6 mb-3">
//                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                               Referrals
//                             </label>
//                             <input
//                               type="number"
//                               min="0"
//                               onKeyDown={preventNegative}
//                               {...register(
//                                 `galaxies.${gIdx}.milestones.${mIdx}.referrals_required_to_unlock`,
//                                 {
//                                   required: "Referrals required",
//                                   setValueAs: (v) => (v ? Number(v) : 0),
//                                 }
//                               )}
//                               className="form-control login-input border-0 no-arrows"
//                               placeholder="0"
//                             />
//                           </div>

//                           <div className="col-6 mb-3">
//                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                               Meteors
//                             </label>
//                             <input
//                               type="number"
//                               min="0"
//                               onKeyDown={preventNegative}
//                               {...register(
//                                 `galaxies.${gIdx}.milestones.${mIdx}.meteors_required_to_unlock`,
//                                 {
//                                   required: "Meteors required",
//                                   setValueAs: (v) => (v ? Number(v) : 0),
//                                 }
//                               )}
//                               className="form-control login-input border-0 no-arrows"
//                               placeholder="0"
//                             />
//                           </div>

//                           <div className="col-12 mb-3">
//                             <label className="form-label font-14 montserrat-regular text-border-gray-color">
//                               Description
//                             </label>
//                             <textarea
//                               {...register(
//                                 `galaxies.${gIdx}.milestones.${mIdx}.milestone_description`,
//                                 { required: "Description is required" }
//                               )}
//                               rows={3}
//                               className="form-control login-input border-0"
//                               placeholder="Enter milestone description"
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <Button
//                 type="button"
//                 onClick={handleCreateNewGalaxy}
//                 btn_class={`border-purple bg-transparent px-4 w-25 ${
//                   areAllGalaxiesValid()
//                     ? "text-purple-color"
//                     : "text-gray-color opacity-50 cursor-not-allowed"
//                 }`}
//                 btn_title="Create New Galaxy"
//                 disabled={!areAllGalaxiesValid()}
//               />
//             </>
//           )}

//           <ConfirmDeleteModal
//             show={deleteModal.show}
//             onClose={() => setDeleteModal({ show: false, galaxyId: null })}
//             onConfirm={confirmDelete}
//             title="Delete Galaxy"
//             message="Are you sure you want to delete this galaxy? This action cannot be undone."
//           />

//           {/* TAB 3: Rewards */}
//           {activeTab === "tab3" && (
//             <div className="row py-4">
//               <div className="col-lg-6">
//                 <div className="bg-white box-shadow border-radius-12 p-4">
//                   <p className="font-18 montserrat-semibold text-gray-color mb-0">
//                     Referrer Rewards
//                   </p>
//                   <p className="text-blue-color font-12 montserrat-medium mb-3">
//                     What referrers get for referring friends
//                   </p>

//                   <div className="row">
//                     {[
//                       { field: "joining_bonus", label: "Joining Bonus" },
//                       { field: "meteors_referral", label: "Meteors Per Referral" },
//                       { field: "stars_joining", label: "Stars On Joining" },
//                       { field: "link_validity", label: "Link Validity (Days)" },
//                     ].map(({ field, label }) => (
//                       <div key={field} className="col-lg-6 mb-3">
//                         <label className="form-label font-12 montserrat-medium text-gray-color">
//                           {label}
//                         </label>
//                         <input
//                           type="number"
//                           min="1"
//                           onKeyDown={preventNegative}
//                           {...register(field, {
//                             required: `${label} is required`,
//                             min: { value: 1, message: "Minimum value is 1" },
//                             setValueAs: (v) => (v ? Number(v) : 1),
//                           })}
//                           className="form-control login-input text-blue-color rounded-3 border-0 py-2 no-arrows"
//                           placeholder="Enter value"
//                         />
//                         {errors[field] && (
//                           <p className="text-danger font-12">{errors[field].message}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-white box-shadow border-radius-12 p-4 mt-4">
//                   <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
//                     Conversion Rates
//                   </p>
//                   <div className="d-flex align-items-center my-3">
//                     <div>
//                       <input
//                         type="number"
//                         min="1"
//                         onKeyDown={preventNegative}
//                         {...register("meteor", {
//                           required: "Meteor value required",
//                           setValueAs: (v) => (v ? Number(v) : 1),
//                         })}
//                         className="form-control login-input border-0 no-arrows"
//                         placeholder="X Meteors"
//                       />
//                       {errors.meteor && (
//                         <p className="text-danger font-12">{errors.meteor.message}</p>
//                       )}
//                     </div>
//                     <span className="mx-3">=</span>
//                     <div>
//                       <input
//                         type="number"
//                         min="1"
//                         onKeyDown={preventNegative}
//                         {...register("y_star", {
//                           required: "Rupees value required",
//                           setValueAs: (v) => (v ? Number(v) : 1),
//                         })}
//                         className="form-control login-input border-0 no-arrows"
//                         placeholder="Y Rupees"
//                       />
//                       {errors.y_star && (
//                         <p className="text-danger font-12">{errors.y_star.message}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Invite Card */}
//               <div className="col-lg-6">
//                 <div className="bg-white border-light-gray border-radius-12 p-4">
//                   <div className="invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center p-4">
//                     <p className="text-white montserrat-semibold font-16">
//                       Invite A Friend
//                     </p>
//                     <div className="position-relative w-100 mb-2">
//                       <input
//                         type="text"
//                         className="form-control bg-white border-0"
//                         readOnly
//                         placeholder="Referral link"
//                       />
//                       <button
//                         type="button"
//                         className="btn btn-sm bg-blue-color text-white position-absolute top-50 end-0 translate-middle-y me-1"
//                       >
//                         Copy
//                       </button>
//                     </div>
//                     <div className="my-2">
//                       <span className="text-white">Or</span>
//                     </div>
//                     <button
//                       type="button"
//                       className="btn bg-blue-color text-white rounded-pill px-4 py-1 mb-2"
//                     >
//                       Share Via WhatsApp
//                     </button>
//                     <div className="d-flex gap-2 mt-2">
//                       <FaFacebookSquare className="text-blue-color font-18 cursor-pointer" />
//                       <AiFillInstagram className="text-blue-color font-18 cursor-pointer" />
//                       <FaYoutube className="text-blue-color font-18 cursor-pointer" />
//                       <FaTwitterSquare className="text-blue-color font-18 cursor-pointer" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CampaignForm;

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

// Components
import CampaignNavbar from "../../components/campaignNavbar";
import Button from "../../components/button";
import ConfirmDeleteModal from "../../components/modal";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import { UserContext } from "../../utils/UseContext/useContext";

// React icon
import { IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaFacebookSquare, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

// Tab
const tabs = [
  { key: "tab1", label: "Basic Info" },
  { key: "tab2", label: "Create Galaxy" },
  { key: "tab3", label: "Rewards" },
];

const CampaignForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    trigger,
  } = useForm();
  const { ContextToEditForm } = useContext(UserContext);
  const navigate = useNavigate();

  const adminUid = sessionStorage.getItem("Auth");

  // STATE
  const [logo, setLogo] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [enabledTabs, setEnabledTabs] = useState([tabs[0].key]);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    galaxyId: null,
  });

  const galaxies = watch("galaxies") || [];

  // Generate unique ID for new galaxies
  const generateGalaxyId = () =>
    `galaxy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Validation - Check if a specific galaxy is valid
  const isGalaxyValid = (galaxy) => {
    if (!galaxy) return false;
    if (!galaxy.galaxy_name?.trim()) return false;
    if (!galaxy.total_milestones || Number(galaxy.total_milestones) < 3)
      return false;

    const milestones = galaxy.milestones || [];
    const requiredMilestones = Number(galaxy.total_milestones);

    for (let m = 0; m < requiredMilestones; m++) {
      const ms = milestones[m];
      if (!ms) return false;
      if (!ms.milestone_name?.trim()) return false;
      if (!ms.display_message?.trim()) return false;
      if (
        ms.referrals_required_to_unlock === "" ||
        ms.referrals_required_to_unlock === undefined
      )
        return false;
      if (
        ms.meteors_required_to_unlock === "" ||
        ms.meteors_required_to_unlock === undefined
      )
        return false;
      if (!ms.milestone_description?.trim()) return false;
    }
    return true;
  };

  // Check if all galaxies are valid
  const areAllGalaxiesValid = () => {
    if (!galaxies.length) return false;
    return galaxies.every((galaxy) => isGalaxyValid(galaxy));
  };

  // Validate all galaxies with detailed error messages
  const validateAllGalaxies = () => {
    if (!galaxies.length) {
      toastError("At least one galaxy is required");
      return false;
    }

    for (let g = 0; g < galaxies.length; g++) {
      const galaxy = galaxies[g];

      if (!galaxy.galaxy_name?.trim()) {
        toastError(`Please fill Galaxy Name for Galaxy ${g + 1}`);
        return false;
      }

      if (!galaxy.total_milestones || Number(galaxy.total_milestones) < 3) {
        toastError(`Please select milestones (minimum 3) for Galaxy ${g + 1}`);
        return false;
      }

      const milestones = galaxy.milestones || [];
      const requiredMilestones = Number(galaxy.total_milestones);

      for (let m = 0; m < requiredMilestones; m++) {
        const ms = milestones[m];

        if (!ms) {
          toastError(
            `Please fill all milestone details in Galaxy ${g + 1}, Milestone ${
              m + 1
            }`
          );
          return false;
        }

        if (!ms.milestone_name?.trim()) {
          toastError(
            `Fill Milestone Name in Galaxy ${g + 1}, Milestone ${m + 1}`
          );
          return false;
        }

        if (!ms.display_message?.trim()) {
          toastError(
            `Fill Display Message in Galaxy ${g + 1}, Milestone ${m + 1}`
          );
          return false;
        }

        if (
          ms.referrals_required_to_unlock === "" ||
          ms.referrals_required_to_unlock === undefined
        ) {
          toastError(
            `Fill Referrals Required in Galaxy ${g + 1}, Milestone ${m + 1}`
          );
          return false;
        }

        if (
          ms.meteors_required_to_unlock === "" ||
          ms.meteors_required_to_unlock === undefined
        ) {
          toastError(
            `Fill Meteors Required in Galaxy ${g + 1}, Milestone ${m + 1}`
          );
          return false;
        }

        if (!ms.milestone_description?.trim()) {
          toastError(`Fill Description in Galaxy ${g + 1}, Milestone ${m + 1}`);
          return false;
        }
      }
    }
    return true;
  };

  // Navigation
  const goToNextTab = async () => {
    const currentIdx = tabs.findIndex((t) => t.key === activeTab);
    const nextTab = tabs[currentIdx + 1];
    if (!nextTab) return;

    const tabFields = {
      tab1: ["program_name"],
      tab2: ["galaxies"],
      tab3: [
        "joining_bonus",
        "meteors_referral",
        "stars_joining",
        "link_validity",
        "meteor",
        "y_star",
      ],
    };

    if (
      !ContextToEditForm &&
      !(await trigger(tabFields[activeTab], { shouldFocus: true }))
    ) {
      toastError("Please fill all required fields!");
      return;
    }

    // Additional validation for tab2
    if (activeTab === "tab2" && !validateAllGalaxies()) {
      return;
    }

    setEnabledTabs((prev) =>
      prev.includes(nextTab.key) ? prev : [...prev, nextTab.key]
    );
    setActiveTab(nextTab.key);
  };

  // Create New Galaxy
  const handleCreateNewGalaxy = () => {
    // Validate all existing galaxies first
    if (!validateAllGalaxies()) {
      return;
    }

    const newGalaxy = {
      id: generateGalaxyId(),
      galaxy_name: "",
      stars: 0,
      total_milestones: "3",
      milestones: [],
    };

    setValue("galaxies", [...galaxies, newGalaxy], { shouldValidate: false });
    toastSuccess(`Galaxy ${galaxies.length + 1} created`);
  };

  // Delete Galaxy by ID
  const confirmDelete = () => {
    if (galaxies.length === 1) {
      toastError("At least one galaxy is required");
      setDeleteModal({ show: false, galaxyId: null });
      return;
    }

    const updatedGalaxies = galaxies.filter(
      (g) => g.id !== deleteModal.galaxyId
    );
    setValue("galaxies", updatedGalaxies, { shouldValidate: true });

    toastSuccess("Galaxy deleted successfully");
    setDeleteModal({ show: false, galaxyId: null });
  };

  // File Upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setLogo(e.target.result);
    reader.readAsDataURL(file);
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      // Remove the 'id' field from galaxies before submitting
      const galaxiesWithoutId = (data.galaxies || []).map(
        ({ id, ...rest }) => rest
      );

      const payload = {
        admin_uid: adminUid,
        program_name: data.program_name || "",
        galaxies: galaxiesWithoutId,
        joining_bonus: data.joining_bonus ?? 0,
        meteors_referral: data.meteors_referral ?? 0,
        stars_joining: data.stars_joining ?? 0,
        link_validity: data.link_validity ?? 0,
        meteor: data.meteor ?? 1,
        y_star: data.y_star ?? 1,
      };

      const res = await postData(`/admin/add-rewards/${adminUid}`, payload);
      if (res?.success) {
        toastSuccess(
          ContextToEditForm ? "Campaign updated!" : "Campaign created!"
        );
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toastError("Failed to save campaign");
    }
  };

  // Load edit data
  useEffect(() => {
    const stored = localStorage.getItem("editProgramData");
    if (!stored) {
      if (!ContextToEditForm) {
        reset({
          program_name: "",
          galaxies: [
            {
              id: generateGalaxyId(),
              galaxy_name: "",
              stars: 0,
              total_milestones: "3",
              milestones: [],
            },
          ],
        });
      }
      return;
    }

    const data = JSON.parse(stored);
    const program = data?.basic_info?.[0] || {};
    const gal = data?.galaxies || [];
    const rewards = data?.rewards_rule?.[0] || {};

    reset({
      program_name: program.program_name || "",
      galaxies: gal.map((g) => ({
        id: generateGalaxyId(),
        galaxy_name: g.galaxy_name,
        stars: g.stars_to_be_achieved,
        total_milestones: g.milestones.length,
        milestones: g.milestones.map((m) => ({
          milestone_name: m.milestone_name,
          display_message: m.display_message,
          referrals_required_to_unlock: m.referrals_required_to_unlock,
          meteors_required_to_unlock: m.meteors_required_to_unlock,
          milestone_description: m.milestone_description,
        })),
      })),
      joining_bonus: rewards.joining_bonus_meteors,
      meteors_referral: rewards.meteors_per_referral,
      stars_joining: rewards.stars_on_joining,
      link_validity: rewards.link_validity_days,
      meteor: rewards.meteors_to_rupees_rate,
      y_star: rewards.meteors_to_rupees_rate,
    });
  }, [reset, ContextToEditForm]);

  // Number input handler
  const preventNegative = (e) => {
    if (["-", "e", "E", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="min-vh-100 bg-light-white-3-color">
      <CampaignNavbar />

      <div className="container pt-5">
        <p className="text-blue-color font-24 montserrat-semibold mb-0">
          {ContextToEditForm ? "Edit Campaign" : "Create Campaign"}
        </p>
        <p className="text-blue-color font-12 montserrat-medium">
          {ContextToEditForm
            ? "Edit the fields below to update your campaign"
            : "Start a new campaign by filling out the details below."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        {/* Tab Navigation */}
        <div className="campaign-tab-bg d-flex justify-content-between align-items-center">
          <div className="container ps-5">
            <Nav
              activeKey={activeTab}
              onSelect={(key) => {
                if (ContextToEditForm || enabledTabs.includes(key)) {
                  setActiveTab(key);
                }
              }}
            >
              {tabs.map((tab) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link
                    eventKey={tab.key}
                    className={`font-16 montserrat-semibold ${
                      ContextToEditForm
                        ? "text-blue-color"
                        : !enabledTabs.includes(tab.key)
                        ? "text-border-gray-color disabled-tab"
                        : "text-border-gray-color"
                    }`}
                    disabled={
                      !ContextToEditForm && !enabledTabs.includes(tab.key)
                    }
                  >
                    {tab.label} <IoIosArrowForward className="mx-1 font-20" />
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          {activeTab === "tab3" ? (
            <button
              type="submit"
              className="border-0 bg-blue-color text-white px-4 py-2"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={goToNextTab}
              type="button"
              className="border-0 bg-blue-color text-white px-4 py-2"
            >
              Next <IoIosArrowForward className="ms-2" />
            </button>
          )}
        </div>

        <div className="container py-3">
          {/* TAB 1: Basic Info */}
          {activeTab === "tab1" && (
            <div className="camp-form row border-radius-16 py-4">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label font-14 text-gray-color montserrat-regular">
                    Campaign Name
                  </label>
                  <input
                    {...register("program_name", {
                      required: "Campaign name is required",
                    })}
                    className="form-control border-0 login-input text-blue-color montserrat-medium"
                    placeholder="Enter campaign name"
                  />
                  {errors.program_name && (
                    <p className="text-danger">{errors.program_name.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label font-14 text-gray-color montserrat-regular">
                    Company Logo
                  </label>
                  <div className="d-flex align-items-center gap-3">
                    {logo ? (
                      <div className="position-relative">
                        <img
                          src={logo}
                          alt="Logo"
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
                          onClick={() => setLogo(null)}
                        >
                          <IoClose size={14} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="border border-2 login-input border-dashed rounded d-flex align-items-center justify-content-center text-muted"
                        style={{ width: "64px", height: "64px" }}
                      >
                        <span>+</span>
                      </div>
                    )}
                    <div>
                      <label className="upload-box d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
                        Upload Image
                        <input
                          type="file"
                          {...register("logo")}
                          onChange={handleLogoUpload}
                        />
                      </label>
                      <div className="form-text font-12 montserrat-medium text-gray-color">
                        PNG, JPG, GIF. Max 2MB
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Create Galaxy */}
          {activeTab === "tab2" && (
            <>
              {galaxies.map((galaxy, gIdx) => (
                <div key={galaxy.id} className="row py-4">
                  <div className="col-lg-6">
                    <div className="bg-white border-radius-12 box-shadow p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="font-18 montserrat-semibold text-gray-color mb-0">
                          Galaxy {gIdx + 1}
                        </h5>
                        {galaxies.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteModal({
                                show: true,
                                galaxyId: galaxy.id,
                              })
                            }
                            className="btn border-0 p-1"
                            style={{ background: "transparent" }}
                          >
                            <RxCross2 size={22} color="gray" />
                          </button>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label font-14 montserrat-regular text-border-gray-color">
                          Galaxy Name
                        </label>
                        <input
                          type="text"
                          {...register(`galaxies.${gIdx}.galaxy_name`, {
                            required: "Galaxy name is required",
                          })}
                          className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                          placeholder="Enter galaxy name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label font-14 montserrat-regular text-border-gray-color">
                          Stars
                        </label>
                        <input
                          type="number"
                          placeholder="Y Stars"
                          min="0"
                          onKeyDown={preventNegative}
                          {...register(`galaxies.${gIdx}.stars`)}
                          className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium no-arrows"
                        />
                      </div>

                      <div>
                        <label className="form-label font-14 montserrat-regular text-border-gray-color">
                          Milestones
                        </label>
                        <select
                          {...register(`galaxies.${gIdx}.total_milestones`, {
                            required: "Please select number of milestones",
                          })}
                          className="form-select login-input text-border-gray-color"
                          defaultValue="3"
                        >
                          {[...Array(8)].map((_, i) => (
                            <option key={i + 3} value={i + 3}>
                              {i + 3}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="col-lg-6 new-milestone-form">
                    <div className="bg-white border-radius-12 border-light-gray p-4 milestone-form-sect">
                      {Array.from({
                        length: Number(
                          watch(`galaxies.${gIdx}.total_milestones`) || 0
                        ),
                      }).map((_, mIdx) => (
                        <div key={mIdx} className="row milestone-form">
                          {mIdx > 0 && <hr />}
                          <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                            Milestone {mIdx + 1}
                          </p>

                          <div className="col-12 mb-3">
                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Name
                            </label>
                            <input
                              {...register(
                                `galaxies.${gIdx}.milestones.${mIdx}.milestone_name`,
                                { required: "Milestone name is required" }
                              )}
                              className="form-control login-input border-0"
                              placeholder="Enter milestone name"
                            />
                          </div>

                          <div className="col-12 mb-3">
                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Display Message
                            </label>
                            <input
                              {...register(
                                `galaxies.${gIdx}.milestones.${mIdx}.display_message`,
                                { required: "Display message is required" }
                              )}
                              className="form-control login-input border-0"
                              placeholder="Enter display message"
                            />
                          </div>

                          <div className="col-6 mb-3">
                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Referrals
                            </label>
                            <input
                              type="number"
                              min="0"
                              onKeyDown={preventNegative}
                              {...register(
                                `galaxies.${gIdx}.milestones.${mIdx}.referrals_required_to_unlock`,
                                {
                                  required: "Referrals required",
                                  setValueAs: (v) => (v ? Number(v) : 0),
                                }
                              )}
                              className="form-control login-input border-0 no-arrows"
                              placeholder="0"
                            />
                          </div>

                          <div className="col-6 mb-3">
                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Meteors
                            </label>
                            <input
                              type="number"
                              min="0"
                              onKeyDown={preventNegative}
                              {...register(
                                `galaxies.${gIdx}.milestones.${mIdx}.meteors_required_to_unlock`,
                                {
                                  required: "Meteors required",
                                  setValueAs: (v) => (v ? Number(v) : 0),
                                }
                              )}
                              className="form-control login-input border-0 no-arrows"
                              placeholder="0"
                            />
                          </div>

                          <div className="col-12 mb-3">
                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Description
                            </label>
                            <textarea
                              {...register(
                                `galaxies.${gIdx}.milestones.${mIdx}.milestone_description`,
                                { required: "Description is required" }
                              )}
                              rows={3}
                              className="form-control login-input border-0"
                              placeholder="Enter milestone description"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={handleCreateNewGalaxy}
                btn_class={`border-purple bg-transparent px-4 w-25 ${
                  areAllGalaxiesValid()
                    ? "text-purple-color"
                    : "text-gray-color opacity-50 cursor-not-allowed"
                }`}
                btn_title="Create New Galaxy"
                disabled={!areAllGalaxiesValid()}
              />
            </>
          )}

          <ConfirmDeleteModal
            show={deleteModal.show}
            onClose={() => setDeleteModal({ show: false, galaxyId: null })}
            onConfirm={confirmDelete}
            title="Delete Galaxy"
            message="Are you sure you want to delete this galaxy? This action cannot be undone."
          />

          {/* TAB 3: Rewards */}
          {activeTab === "tab3" && (
            <div className="row py-4">
              <div className="col-lg-6">
                <div className="bg-white box-shadow border-radius-12 p-4">
                  <p className="font-18 montserrat-semibold text-gray-color mb-0">
                    Referrer Rewards
                  </p>
                  <p className="text-blue-color font-12 montserrat-medium mb-3">
                    What referrers get for referring friends
                  </p>

                  <div className="row">
                    {[
                      { field: "joining_bonus", label: "Joining Bonus" },
                      {
                        field: "meteors_referral",
                        label: "Meteors Per Referral",
                      },
                      { field: "stars_joining", label: "Stars On Joining" },
                      { field: "link_validity", label: "Link Validity (Days)" },
                    ].map(({ field, label }) => (
                      <div key={field} className="col-lg-6 mb-3">
                        <label className="form-label font-12 montserrat-medium text-gray-color">
                          {label}
                        </label>
                        <input
                          type="number"
                          min="1"
                          onKeyDown={preventNegative}
                          {...register(field, {
                            required: `${label} is required`,
                            min: { value: 1, message: "Minimum value is 1" },
                            setValueAs: (v) => (v ? Number(v) : 1),
                          })}
                          className="form-control login-input text-blue-color rounded-3 border-0 py-2 no-arrows"
                          placeholder="Enter value"
                        />
                        {errors[field] && (
                          <p className="text-danger font-12">
                            {errors[field].message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white box-shadow border-radius-12 p-4 mt-4">
                  <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                    Conversion Rates
                  </p>

                  <div className="row align-items-end">
                    <div className="col-lg-5 mb-3">
                      <label className="form-label font-12 montserrat-medium text-gray-color">
                        X Meteors
                      </label>
                      <input
                        type="number"
                        min="1"
                        onKeyDown={preventNegative}
                        {...register("meteor", {
                          required: "Meteor value required",
                          setValueAs: (v) => (v ? Number(v) : 1),
                        })}
                        className="form-control login-input border-0 no-arrows"
                        placeholder="X Meteors"
                      />
                      {errors.meteor && (
                        <p className="text-danger font-12">
                          {errors.meteor.message}
                        </p>
                      )}
                    </div>

                    <div className="col-lg-2 mb-3 text-center">
                      <span className="d-block font-18">=</span>
                    </div>

                    <div className="col-lg-5 mb-3">
                      <label className="form-label font-12 montserrat-medium text-gray-color">
                        Y Star
                      </label>
                      <input
                        type="number"
                        min="1"
                        onKeyDown={preventNegative}
                        {...register("y_star", {
                          required: "Star value required",
                          setValueAs: (v) => (v ? Number(v) : 1),
                        })}
                        className="form-control login-input border-0 no-arrows"
                        placeholder="Y Star"
                      />
                      {errors.y_star && (
                        <div className="text-danger font-12">
                          {errors.y_star.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Invite Card */}
              <div className="col-lg-6">
                <div className="bg-white border-light-gray border-radius-12 p-4">
                  <div className="invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center p-4">
                    <p className="text-white montserrat-semibold font-16">
                      Invite A Friend
                    </p>
                    <div className="position-relative w-100 mb-2">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        readOnly
                        placeholder="Referral link"
                      />
                      <button
                        type="button"
                        className="btn btn-sm bg-blue-color text-white position-absolute top-50 end-0 translate-middle-y me-1"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="my-2">
                      <span className="text-white">Or</span>
                    </div>
                    <button
                      type="button"
                      className="btn bg-blue-color text-white rounded-pill px-4 py-1 mb-2"
                    >
                      Share Via WhatsApp
                    </button>
                    <div className="d-flex gap-2 mt-2">
                      <FaFacebookSquare className="text-blue-color font-18 cursor-pointer" />
                      <AiFillInstagram className="text-blue-color font-18 cursor-pointer" />
                      <FaYoutube className="text-blue-color font-18 cursor-pointer" />
                      <FaTwitterSquare className="text-blue-color font-18 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
