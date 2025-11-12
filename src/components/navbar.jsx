// import { useContext, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";

// // Images
// import Logo from "../assets/images/Dashboard-img/logo.svg";
// import Earning from "../assets/images/Navbar-img/white-voucher.svg";
// import Reward from "../assets/images/Navbar-img/reward.svg";
// import Home from "../assets/images/Navbar-img/home.svg";
// import User from "../assets/images/Navbar-img/User-60.svg";

// // React Icon
// import { GoBell } from "react-icons/go";
// import { IoColorPalette, IoSettingsOutline } from "react-icons/io5";
// import { PiPencilSimple, PiUploadSimpleBold } from "react-icons/pi";
// import { BiSolidCheckShield } from "react-icons/bi";
// import { HiOutlineLogout } from "react-icons/hi";
// import { FaLanguage } from "react-icons/fa";
// import { useForm } from "react-hook-form";

// // Components
// import Button from "./button";
// import { toastError, toastSuccess } from "../utils/toster";
// import { postData } from "../services/api";
// import { UserContext } from "../utils/UseContext/useContext";

// const NavBar = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const campaignName = sessionStorage.getItem("campaignName");
//   const { logo, setLogo, setAuthLocal } = useContext(UserContext);

//   useEffect(() => {
//     const storedLogo = localStorage.getItem("logo");
//     if (storedLogo) {
//       setLogo(storedLogo);
//     }
//   }, []);

//   // const HandleImgUpld =()=>{}
//   const GetAdminUid = sessionStorage.getItem("Auth");
//   const onSubmit = async (data) => {
//     const file = data?.file[0];
//     let image;
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         image = base64String;
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.log("No file provided");
//     }
//     try {
//       const getAuth = await postData("/admin/auths", {
//         admin_uid: GetAdminUid,
//       });
//       const payload = {
//         admin_uid: GetAdminUid,
//         mode: getAuth?.access_token,
//         log_alt: getAuth?.session_id,
//         username: data?.name,
//         email: data?.email,
//         mobile_number: data?.mobile,
//         image: image,
//         password: data?.password,
//       };
//       const response = await postData("/admin/edit-profile", payload);
//       if (response?.success) {
//         toastSuccess(response?.message);
//       }
//     } catch (error) {
//       toastError(error?.message);
//     }
//   };

//   // ------Logout Functionailty
//   const HandleLogout = () => {
//     sessionStorage.removeItem('Auth');
//     setAuthLocal('');
//     console.log('check auth');
//     navigate('/login');
//   };
//   return (
//     <>
//       <Navbar
//         collapseOnSelect
//         expand="lg"
//         sticky="top"
//         className="bg-light-white-3-color pt-4 box-shadow"
//       >
//         <Container>

//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between mt-60">
//             <Navbar.Brand href="/" className="width-26">
//               {/* {logo && (
//                 <img src={logo} alt="Logo" className="logo" />
//               )} */}
//               {logo !== "undefined" ? (
//                 <img src={logo} alt="Logo" className="logo" />
//               ) : (
//                 <div className="nav-user-text mb-0 text-white font-20 montserrat-semibold text-uppercase bg-border-gray-color rounded-circle d-flex align-items-center justify-content-center shadow">
//                   <span className="font-20"> {campaignName?.slice(0, 2) || "CAM"}</span>
//                 </div>
//               )}

//             </Navbar.Brand>

           

//             <Nav className="d-flex align-items-center justify-content-center gap-3 flex-row mt-3 mt-lg-0 ms-auto">
            
//               <NavLink
//                 to="/dashboard-campaigns"
//                 className={`nav-link text-blue-color bg-transparent border-blue mt-lg-0 mt-2 rounded-pill py-2 d-flex align-itmes-center justify-content-center font-14 montserrat-semibold me-3 px-5`}
//               >
//                 <span>My Campaigns</span>
//               </NavLink>
//               <Nav.Link href="#deets" className="font-32 text-border-gray-color pe-none">
//                 <GoBell />
//               </Nav.Link>
//               <Nav.Link
//                 eventKey={2}
//                 href="#memes"
//                 className="font-32 text-border-gray-color pe-none"
//               >
//                 <IoSettingsOutline />
//               </Nav.Link>

//               <div className="dropdown">
//                 <button
//                   className="btn nav-link border-0 bg-transparent p-0"
//                   id="userDropdown"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <img src={User} alt="User" className="user-icon" />
//                 </button>

//                 <ul
//                   className="dropdown-menu dropdown-menu-end border-0 border-radius-16 custom-dropdown-width p-0"
//                   aria-labelledby="userDropdown"
//                 >
//                   <li className="profile-header px-3 py-2">
//                     <div className="d-flex align-items-center justify-content-between">
//                       <img
//                         src={User}
//                         alt="avatar"
//                         className="rounded-circle"
//                         width="40"
//                       />
//                       <button
//                         className="ms-3 schedule-right-side p-2 border-0 rounded-3 d-flex align-items-center"
//                         data-bs-toggle="offcanvas"
//                         data-bs-target="#profileEditPanel"
//                       >
//                         <PiPencilSimple className="font-20 text-blue-color" />
//                       </button>
//                     </div>
//                     <h6 className="mb-0 text-blue-color font-20 montserrat-medium">
//                       Adity Sharma
//                     </h6>
//                   </li>
//                   <li className="border-bottom pt-3 px-3 pe-none">
//                     <button className="dropdown-item d-flex align-items-center gap-2 py-3">
//                       <FaLanguage className="font-20 text-border-gray-color" />
//                       <span className="text-border-gray-color font-16 montserrat-medium">
//                         Languages
//                       </span>
//                     </button>
//                   </li>
//                   <li className="border-bottom px-3 pe-none">
//                     <button className="dropdown-item d-flex align-items-center gap-2 py-3">
//                       <IoColorPalette className="font-20 text-border-gray-color" />
//                       <span className="text-border-gray-color font-16 montserrat-medium">
//                         Themes
//                       </span>
//                     </button>
//                   </li>
//                   <li className="border-bottom px-3 pe-none">
//                     <button className="dropdown-item d-flex align-items-center gap-2 py-3">
//                       <BiSolidCheckShield className="font-20 text-border-gray-color" />
//                       <span className="text-border-gray-color font-16 montserrat-medium">
//                         Security
//                       </span>
//                     </button>
//                   </li>
//                   <li className="border-bottom px-3">
//                     <button className="dropdown-item d-flex align-items-center gap-2 py-3">
//                       <HiOutlineLogout className="font-20 text-border-gray-color" />
//                       <span className="text-blue-color font-16 montserrat-medium"
//                         onClick={() => HandleLogout()}
//                       >
//                         Logout
//                       </span>
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </Nav>

//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       {/* Edit  Right Side Panel */}
//       <div
//         className="offcanvas px-3 offcanvas-end bg-light-white-3-color right-sidepanel"
//         tabIndex="-1"
//         id="profileEditPanel"
//         aria-labelledby="profileEditPanelLabel"
//       >
//         <div className="offcanvas-header">
//           <p
//             className="offcanvas-title font-20 montserrat-semibold text-blue-color mb-0"
//             id="profileEditPanelLabel"
//           >
//             Edit Admin Profile
//           </p>
//           <button
//             type="button"
//             className="btn-close text-reset"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <p className="font-14 montserrat-regular sidepanel-gray-text lh-1 px-3">
//           Make changes to the admin’s name, contact <br /> info, or other
//           profile details.
//         </p>

//         <div className="offcanvas-body">
//           <form onSubmit={handleSubmit(onSubmit)} className="row">
//             <div className="mb-3 col-lg-12">
//               <label className="form-label text-blue-color font-12 montserrat-semibold">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
//                 placeholder="Enter name"
//                 {...register("name")}
//               />
//               {/* {errors.name && (
//                 <small className="text-danger">{errors.name.message}</small>
//               )} */}
//             </div>
//             <div className="mb-3 col-lg-12">
//               <label className="form-label text-blue-color font-12 montserrat-semibold">
//                 Mobile Number
//               </label>
//               <input
//                 type="number"
//                 className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
//                 placeholder="Enter Mobile No."
//                 {...register("mobile"
//                   //   , {
//                   //   required: "Mobile number is required",
//                   // }
//                 )}
//               />
//               {/* {errors.mobile && (
//                 <small className="text-danger">{errors.mobile.message}</small>
//               )} */}
//             </div>
//             <div className="mb-3 col-lg-12">
//               <label className="form-label text-blue-color font-12 montserrat-semibold">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
//                 placeholder="Enter Email"
//                 {...register("email", {
//                   // required: "Email is required",
//                   pattern: {
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {/* {errors.email && (
//                 <small className="text-danger">{errors.email.message}</small>
//               )} */}
//             </div>
//             <div className="mb-3 col-lg-12">
//               <label className="form-label text-blue-color font-12 montserrat-semibold">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
//                 placeholder="Enter Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//               />
//               {errors.password && (
//                 <small className="text-danger">{errors.password.message}</small>
//               )}
//             </div>

//             <div className="mb-4 col-lg-12">
//               <label className="form-label text-blue-color font-12 montserrat-semibold">
//                 Upload Picture
//               </label>
//               <label class="upload-box d-flex text-center login-input px-4 py-5 rounded-3 text-blue-color font-12 width-40 justify-content-center flex-column montserrat-medium">
//                 <div class="upload-icon mx-auto text-center">
//                   <PiUploadSimpleBold className="font-16" />
//                 </div>
//                 Upload
//                 <input type="file" id="formFile" {...register("file")} />
//               </label>
//             </div>
//             <Button
//               btn_class={"text-white px-5 bg-blue-color w-100 border-0"}
//               btn_title={"Save Changes"}
//             />
//             {/* <button type='submit' className="rounded-pill font-14 montserrat-medium border-0 text-white bg-blue-color px-3 w-100 py-2">Save Changes</button> */}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavBar;

import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Images
import Logo from "../assets/images/Dashboard-img/logo.svg";
import Earning from "../assets/images/Navbar-img/white-voucher.svg";
import Reward from "../assets/images/Navbar-img/reward.svg";
import Home from "../assets/images/Navbar-img/home.svg";
import User from "../assets/images/Navbar-img/User-60.svg";

// React Icon
import { GoBell } from "react-icons/go";
import { IoColorPalette, IoSettingsOutline } from "react-icons/io5";
import { PiPencilSimple, PiUploadSimpleBold } from "react-icons/pi";
import { BiSolidCheckShield } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { FaLanguage } from "react-icons/fa";
import { useForm } from "react-hook-form";

// Components
import Button from "./button";
import { toastError, toastSuccess } from "../utils/toster";
import { postData } from "../services/api";
import { UserContext } from "../utils/UseContext/useContext";

const NavBar = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const campaignName = sessionStorage.getItem("campaignName");
  const ProgramId = sessionStorage.getItem("Prgid");
  const { logo, setLogo, setAuthLocal } = useContext(UserContext);
  const [profileData, setProfileData] = useState();
  console.log('profileData: ', profileData);
11
  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  // const HandleImgUpld =()=>{}
  const GetAdminUid = sessionStorage.getItem("Auth");
  const onSubmit = async (data) => {
    const file = data?.file[0];
    let image;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        image = base64String;
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file provided");
    }
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.access_token,
        log_alt: getAuth?.session_id,
        username: data?.name,
        email: data?.email,
        mobile_number: data?.mobile,
        image: data.image,
        password: data?.password,
      };
      const response = await postData("/admin/edit-profile", payload);
      if (response?.success) {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error?.message);
    }
  };

  // ------Logout Functionailty
  const HandleLogout = () => {
    sessionStorage.removeItem('Auth');
    setAuthLocal('');
    console.log('check auth');
    navigate('/login');
  };

  // Dashboard APi for showing prfile data
  const HandleDashBoardAPI = async () => {
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
      const responseState = await postData("/admin/dashboard", payload);
      console.log(responseState, "sdfghj");
      if (responseState) {
        // const Decrpt = await DecryptFunction(responseState?.data);
        // setDashStatData(Decrpt);
        const Decrpt = responseState;
        setProfileData(Decrpt);

        // ✅ Prefill form fields
        setValue("name", Decrpt?.admin_data?.username || "");
        setValue("email", Decrpt?.admin_data?.email || "");
        setValue("mobile", Decrpt?.admin_data?.mobile_number || "");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    HandleDashBoardAPI();
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        className="bg-light-white-3-color pt-4 box-shadow"
      >
        <Container>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between mt-60">
            <Navbar.Brand href="/dashboard" className="width-26">
              {/* {logo && (
                <img src={logo} alt="Logo" className="logo" />
              )} */}
              {logo !== "undefined" ? (
                <img src={logo} alt="Logo" className="logo" />
              ) : (
                <div className="nav-user-text mb-0 text-white font-20 montserrat-semibold text-uppercase bg-border-gray-color rounded-circle d-flex align-items-center justify-content-center shadow">
                  <span className="font-20"> {campaignName?.slice(0, 2) || "CAM"}</span>
                </div>
              )}

            </Navbar.Brand>



            <Nav className="d-flex align-items-center justify-content-center gap-3 flex-row mt-3 mt-lg-0 ms-auto">

              <NavLink
                to="/dashboard-campaigns"
                className={`nav-link text-blue-color bg-transparent border-blue mt-lg-0 mt-2 rounded-pill py-2 d-flex align-itmes-center justify-content-center font-14 montserrat-semibold me-3 px-5`}
              >
                <span>My Campaigns</span>
              </NavLink>
              {/* <Nav.Link href="#deets" className="font-32 text-border-gray-color pe-none">
                <GoBell />
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="#memes"
                className="font-32 text-border-gray-color pe-none"
              >
                <IoSettingsOutline />
              </Nav.Link> */}

              <div className="dropdown">
                <button
                  className="btn nav-link border-0 bg-transparent p-0"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={profileData?.admin_data?.profile_picture || User} alt="User" className="user-icon" />
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end border-0 border-radius-16 custom-dropdown-width p-0"
                  aria-labelledby="userDropdown"
                >
                  <li className="profile-header px-3 py-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        src={profileData?.admin_data?.profile_picture || User}
                        alt="avatar"
                        className="rounded-circle"
                        width="40"
                      />
                      <button
                        className="ms-3 schedule-right-side p-2 border-0 rounded-3 d-flex align-items-center"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#profileEditPanel"
                      >
                        <PiPencilSimple className="font-20 text-blue-color" />
                      </button>
                    </div>
                    <h6 className="mb-0 text-blue-color font-20 montserrat-medium text-uppercase">
                     {profileData?.admin_data?.username}
                    </h6>
                  </li>
                  <li className="border-bottom pt-3 px-3 pe-none">
                    <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                      <FaLanguage className="font-20 text-border-gray-color" />
                      <span className="text-border-gray-color font-16 montserrat-medium">
                        Languages
                      </span>
                    </button>
                  </li>
                  <li className="border-bottom px-3 pe-none">
                    <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                      <IoColorPalette className="font-20 text-border-gray-color" />
                      <span className="text-border-gray-color font-16 montserrat-medium">
                        Themes
                      </span>
                    </button>
                  </li>
                  <li className="border-bottom px-3 pe-none">
                    <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                      <BiSolidCheckShield className="font-20 text-border-gray-color" />
                      <span className="text-border-gray-color font-16 montserrat-medium">
                        Security
                      </span>
                    </button>
                  </li>
                  <li className="border-bottom px-3">
                    <button className="dropdown-item d-flex align-items-center gap-2 py-3">
                      <HiOutlineLogout className="font-20 text-border-gray-color" />
                      <span className="text-blue-color font-16 montserrat-medium"
                        onClick={() => HandleLogout()}
                      >
                        Logout
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Edit  Right Side Panel */}
      <div
        className="offcanvas px-3 offcanvas-end bg-light-white-3-color right-sidepanel"
        tabIndex="-1"
        id="profileEditPanel"
        aria-labelledby="profileEditPanelLabel"
      >
        <div className="offcanvas-header">
          <p
            className="offcanvas-title font-20 montserrat-semibold text-blue-color mb-0"
            id="profileEditPanelLabel"
          >
            Edit Admin Profile
          </p>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <p className="font-14 montserrat-regular sidepanel-gray-text lh-1 px-3">
          Make changes to the admin’s name, contact <br /> info, or other
          profile details.
        </p>

        <div className="offcanvas-body">
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="mb-3 col-lg-12">
              <label className="form-label text-blue-color font-12 montserrat-semibold">
                Name
              </label>
              <input
                type="text"
                className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
                placeholder="Enter name"
                {...register("name")}
              />
              {/* {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )} */}
            </div>
            <div className="mb-3 col-lg-12">
              <label className="form-label text-blue-color font-12 montserrat-semibold">
                Mobile Number
              </label>
              <input
                type="number"
                className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
                placeholder="Enter Mobile No."
                {...register("mobile"
                  //   , {
                  //   required: "Mobile number is required",
                  // }
                )}
              />
              {/* {errors.mobile && (
                <small className="text-danger">{errors.mobile.message}</small>
              )} */}
            </div>
            <div className="mb-3 col-lg-12">
              <label className="form-label text-blue-color font-12 montserrat-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
                placeholder="Enter Email"
                {...register("email", {
                  // required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {/* {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )} */}
            </div>
            {/* <div className="mb-3 col-lg-12">
              <label className="form-label text-blue-color font-12 montserrat-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control login-input font-14 montserrat-medium text-blue-color border-0"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div> */}

            <div className="mb-4 col-lg-12">
              <label className="form-label text-blue-color font-12 montserrat-semibold">
                Upload Picture
              </label>
              <label class="upload-box d-flex text-center login-input px-4 py-5 rounded-3 text-blue-color font-12 width-40 justify-content-center flex-column montserrat-medium">
                <div class="upload-icon mx-auto text-center">
                  <PiUploadSimpleBold className="font-16" />
                </div>
                Upload
                <input type="file" id="formFile" {...register("file")} />
              </label>
            </div>
            <Button
              btn_class={"text-white px-5 bg-blue-color w-100 border-0"}
              btn_title={"Save Changes"}
            />
            {/* <button type='submit' className="rounded-pill font-14 montserrat-medium border-0 text-white bg-blue-color px-3 w-100 py-2">Save Changes</button> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default NavBar;

