import React, { useContext, useEffect, useRef, useState } from "react";
import CampaignNavbar from "../../components/campaignNavbar";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Dropdown, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import moment from "moment";

import {
  IoClose,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io5";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import Button from "../../components/button";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { PiPencilSimple, PiUploadSimpleBold } from "react-icons/pi";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTelegram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { UserContext } from "../../utils/UseContext/useContext";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Planet1 from "../../assets/images/campForm/HIW-planet-1.svg";
import Planet2 from "../../assets/images/campForm/HIW-planet-2.svg";
import Planet3 from "../../assets/images/campForm/HIW-planet-3.svg";
import Rocketgif from "../../assets/images/campForm/racketgif.gif";

const tabs = [
  { key: "tab1", label: "Basic Info" },
  { key: "tab2", label: "Create Galaxy" },
  // { key: "tab3", label: "Refer" },
  { key: "tab4", label: "Rewards" },
  // { key: "tab5", label: "Miscellaneous" },
];
// Add Icons
const platformIcons = {
  WhatsApp: <IoLogoWhatsapp size={25} />,
  Facebook: <IoLogoFacebook size={25} />,
  LinkedIn: <FaLinkedin size={25} />,
  Telegram: <FaTelegram size={25} />,
  Twitter: <IoLogoTwitter size={25} />,
};

const CampaignForm = () => {
  // ===================
  // useForm
  // ===================
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    reset,
    trigger,
  } = useForm();

  const { ContextToEditForm, ContextCampEditDataAPI } = useContext(UserContext);
  console.log("ContextCampEditDataAPI: ", ContextCampEditDataAPI);
  console.log("ContextToEditForm: ", ContextToEditForm);

  const GetAdminUid = sessionStorage.getItem("Auth");
  const NewMilestone = watch("addnewmilestone");
  const navigate = useNavigate();
  // ==============
  // useStates
  // =================
  const [Loading, setLoading] = useState(false);
  const [CampLogo, SetCampLogo] = useState();
  const [NoGalaxy, SetNoGalaxy] = useState(1);
  const [InviteLink, SetInviteLink] = useState();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [enabledTabs, setEnabledTabs] = useState([tabs[0].key]);
  const [primaryShare, setPrimaryShare] = useState("WhatsApp");
  const [otherSelected, setOtherSelected] = useState("Choose one");
  const [primarySelected, setPrimarySelected] = useState("Choose one");
  const [platforms, setPlatforms] = useState([
    "Facebook",
    "LinkedIn",
    "Telegram",
    "Twitter",
  ]);

  // =========================
  // Show Values In Preview
  // =========================

  const title1 = watch("title1");
  const title2 = watch("title2");
  const title3 = watch("title3");
  const desc1 = watch("desc1");
  const desc2 = watch("desc2");
  const desc3 = watch("desc3");

  //=============
  // Function
  //=============

  // Active Tab Function
  // const goToNextTab = () => {
  //   const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
  //   const nextTab = tabs[currentIndex + 1];
  //   if (nextTab) {
  //     setEnabledTabs((prev) =>
  //       prev.includes(nextTab.key) ? prev : [...prev, nextTab.key]
  //     );
  //     setActiveTab(nextTab.key);
  //   }
  // };

  const galaxies = watch("galaxies") || [];
  const isFirstGalaxyValid =
    galaxies.length > 0 &&
    galaxies[0]?.galaxy_name?.trim() &&
    galaxies[0]?.total_milestones &&
    Number(galaxies[0]?.total_milestones) > 0;


  const goToNextTab = async () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const nextTab = tabs[currentIndex + 1];

    // Define required fields per tab
    const tabFields = {
      tab1: ["program_name"],
      tab2: ["galaxies"],
      tab3: ["invite_link", "start_date", "end_date", "referrer_reward_type", "referrer_reward_value"],
      tab4: ["joining_bonus", "meteors_referral", "stars_joining", "link_validity", "meteor", "y_star"],
    };

    if (!ContextToEditForm) {
      // Validate only in create mode
      const fieldsToValidate = tabFields[activeTab];
      const isValid = await trigger(fieldsToValidate, { shouldFocus: true });

      if (!isValid) {
        toastError("Please fill all required fields before proceeding!");
        return;
      }
    }

    if (nextTab) {
      setEnabledTabs((prev) =>
        prev.includes(nextTab.key) ? prev : [...prev, nextTab.key]
      );
      setActiveTab(nextTab.key);
    }
  };


  // Upload Logo function
  const handleCampLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith("image/")) {
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          SetCampLogo(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file (PNG, JPG, GIF, etc.)");
      }
    }
  };

  // image Upload function
  const [referrerImages, setReferrerImages] = useState([]);
  const referrerInputRef = useRef(null);

  const handleReferrerFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // unique id using blob URL
      url: URL.createObjectURL(file),
    }));
    setReferrerImages((prev) => [...prev, ...newImages]);
  };

  const removeReferrerImage = (id) => {
    setReferrerImages((prev) => prev.filter((img) => img.id !== id));
  };

  const HandleRewardForm = async (data) => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.access_token,
        log_alt: getAuth?.session_id,
        conversion_rates: {
          meteors_to_stars: data?.meteor,
          stars: data?.y_star,
          stars_to_currency: data?.star,
          currency: data?.point,
        },

        referrer_reward: data?.referrer,
        invitee_reward: data?.reward,
      };
      const response = await postData("/admin/set-referral-rewards", payload);

      if (response?.success) {
        toastSuccess(response?.message);
      }
      setLoading(false);
    } catch (error) {
      toastError(error?.error);
      setLoading(false);
    }
  };

  const StartDate = watch("start_date");
  const EndDate = watch("end_date");

  const HandleGentLink = async () => {
    setLoading(true);
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
        start_date: new Date(StartDate)?.toLocaleDateString("en-GB"),
        expiry_date: new Date(EndDate)?.toLocaleDateString("en-GB"),
      };
      const response = await postData("/generate-link", payload);
      if (response?.success) {
        toastSuccess(response?.message);
        setValue("invite_link", response?.link);
        setValue("active", response?.active);
        SetInviteLink(response?.link);
      }
      setLoading(false);
    } catch (error) {
      toastError(error?.error);
      setLoading(false);
    }
  };


  const handlePrimarySelect = (platform) => {
    setPrimarySelected(platform);
    setPrimaryShare(platform); // update primaryShare icon
  };
  const handleOtherSelect = (platform) => {
    setOtherSelected(platform);
    if (!platforms.includes(platform) && platforms.length < 4) {
      setPlatforms([...platforms, platform]);
    }
  };
  // const onAddGalaxySubmit = (data) => { };

  const onSubmit = async (data) => {
    console.log("data: ", data);
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      // participant-table
      const payload = {
        admin_uid: GetAdminUid,
        galaxies: data?.galaxies || [],
        link: data?.invite_link || "",
        joining_bonus: data?.joining_bonus ?? 0,
        link_validity: data?.link_validity ?? 0,
        meteor: data?.meteor ?? 1,
        meteors_referral: data?.meteors_referral ?? 0,
        stars_joining: data?.stars_joining ?? 0,
        y_star: data?.y_star ?? 1,
        program_name: data?.program_name || "",
      };

      if (ContextToEditForm && ContextCampEditDataAPI?.campaign_info?.program_id) {
        payload.program_id = ContextCampEditDataAPI.campaign_info.program_id;
      }


      const apiUrl = `/admin/add-rewards/${GetAdminUid}`;
      const response = await postData(apiUrl, payload);


      // if (ContextToEditForm) {
      //   const program_id = ContextCampEditDataAPI?.campaign_info?.program_id;

      //   // Update campaign logic
      //   const updateUrl = `/admin/update-campaign/${program_id}`;
      //   response = await postData(updateUrl, payload);
      // } else {
      //   // Create campaign logic
      //   const addrewards = `/admin/add-rewards/${GetAdminUid}`;
      //   response = await postData(addrewards, payload);
      // }

      if (response?.success) {
        toastSuccess(
          ContextToEditForm
            ? "Campaign updated successfully!"
            : "Campaign created successfully!"
        );
        navigate("/dashboard-campaigns");
      }
    } catch (error) {
      console.error("Error while saving campaign:", error);
      toastError("Something went wrong while saving the campaign!");
    }
    //   const response = await postData("/admin/create-campaign", payload);
    //   console.log("response: ", response);
    //   if (response?.success) {
    //     navigate("/");
    //   }
    //   // const Decrpt = await DecryptFunction(response?.data);
    //   toastSuccess(response?.message);
    // } catch (error) {
    //   toastError(error?.message);
    // }
  };


  useEffect(() => {
    if (!ContextToEditForm) {
      reset({
        program_name: "",
        joining_bonus: "",
        meteors_referral: "",
        stars_joining: "",
        link_validity: "",
        meteor: "",
        y_star: "",
        galaxies: [],
      });
      localStorage.removeItem("editProgramData");
    }
  }, [ContextToEditForm, reset]);


  const handleUrlBlur = (e) => {
    try {
      const inputUrl = new URL(e.target.value);
      const baseUrl = inputUrl.origin;
      setValue("url", baseUrl, { shouldValidate: true });
    } catch (error) {
      // Optional: you can handle invalid URLs here if needed
    }
  };

  const [faqList, setFaqList] = useState([{ question: "", answer: "" }]);

  const handleAddFAQ = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };



  useEffect(() => {
    const stored = localStorage.getItem("editProgramData");
    if (stored) {
      const data = JSON.parse(stored);

      // Extract actual details
      const program = data?.basic_info?.[0] || {};
      const galaxies = data?.galaxies || [];
      const rewards = data?.rewards_rule?.[0] || {};

      // Reset form with full structure
      reset({
        program_name: program?.program_name || "",
        logo: program?.logo || "",
        galaxies: galaxies.map((g) => ({
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
        y_star: rewards.meteors_to_rupees_rate, // adjust if needed
      });
    }
  }, [reset]);



  // Set Edit Form Data
  useEffect(() => {
    if (ContextToEditForm) {
      console.log("ContextToEditForm: ", ContextToEditForm);
      console.log("ContextCampEditDataAPI: ", ContextCampEditDataAPI);
      // Set Camp Details
      setValue("name", ContextCampEditDataAPI?.campaign_info?.program_name);
      setValue("url", ContextCampEditDataAPI?.campaign_info?.base_url);
      // CampLogo,ContextCampEditDataAPI?.campaign?.image);
      // setValue("galaxies", dumy?.galaxies);

      // Set Conversion rate Data
      setValue(
        "meteor",
        ContextCampEditDataAPI?.referral_info?.conversion_rates
          ?.meteors_to_stars
      );
      setValue(
        "y_star",
        ContextCampEditDataAPI?.referral_info?.conversion_rates?.stars
      );
      setValue(
        "star",
        ContextCampEditDataAPI?.referral_info?.conversion_rates
          ?.stars_to_currency
      );
      setValue(
        "point",
        ContextCampEditDataAPI?.referral_info?.conversion_rates?.currency
      );

      // Set Special Link Data
      setValue(
        "start_date",
        moment(ContextCampEditDataAPI?.link_info?.start_date).format(
          "YYYY-MM-DD"
        )
      );
      setValue(
        "end_date",
        moment(ContextCampEditDataAPI?.link_info?.end_date).format("YYYY-MM-DD")
      );
      setValue(
        "invite_link",
        ContextCampEditDataAPI?.link_info?.invitation_link
      );
      setValue(
        "referrer_reward_type",
        ContextCampEditDataAPI?.link_info?.referrer_reward_type
      );
      setValue(
        "referrer_reward_value",
        ContextCampEditDataAPI?.link_info?.referee_reward_value
      );
      setValue(
        "referee_reward_type",
        ContextCampEditDataAPI?.link_info?.referee_reward_type
      );
      setValue(
        "referee_reward_value",
        ContextCampEditDataAPI?.link_info?.referee_reward_value
      );
      setValue(
        "reward_condition",
        ContextCampEditDataAPI?.link_info?.reward_condition
      );
      setValue(
        "success_reward",
        ContextCampEditDataAPI?.link_info?.success_reward
      );

      // Set Social icons Data
      // setValue("ln", ContextCampEditDataAPI?.sharing_apps_info?.platform);

      // setValue("tw", ContextCampEditDataAPI?.sharing_apps_info?.platform);

      // // setValue("messagewithinvite", ContextCampEditDataAPI?.sharing_apps_info?.messagewithinvite);

      // setValue("tl", ContextCampEditDataAPI?.sharing_apps_info?.platform);

      // setValue("fb", ContextCampEditDataAPI?.sharing_apps_info?.platform);

      const sharingInfo = ContextCampEditDataAPI?.sharing_apps_info || [];

      // Platform name to field key mapping
      const fieldMap = {
        facebook: "fb",
        telegram: "tl",
        linkedIn: "ln",
        twitter: "tw",
      };

      // Set each platform's message to the right form field
      sharingInfo.forEach((item) => {
        const fieldName = fieldMap[item.platform];
        if (fieldName) {
          setValue(fieldName, item.message);
        }
      });

      // For Whatsapp Text
      if (sharingInfo.length > 0) {
        setValue("messagewithinvite", sharingInfo[0].message);
      }

      // primaryShare,
      setValue(
        "signup_reward_value",
        ContextCampEditDataAPI?.participant_info?.signup_reward
      );
      setValue(
        "signup_reward_type",
        ContextCampEditDataAPI?.participant_info?.signup_reward_type
      );
      setValue(
        "login_reward_value",
        ContextCampEditDataAPI?.participant_info?.login_reward
      );
      setValue(
        "login_reward_type",
        ContextCampEditDataAPI?.participant_info?.login_reward_type
      );
      setValue(
        "refer_reward",
        ContextCampEditDataAPI?.referral_info?.referrer_reward
      );
      setValue(
        "refer_reward_type",
        ContextCampEditDataAPI?.referral_info?.referrer_reward_type
      );
      setValue(
        "invitee_reward",
        ContextCampEditDataAPI?.referral_info?.invitee_reward
      );
      setValue(
        "invitee_reward_type",
        ContextCampEditDataAPI?.referral_info?.invitee_reward_type
      );
    }
    // galaxay
    ContextCampEditDataAPI?.galaxy_info?.galaxies?.forEach(
      (galaxy, galaxyIndex) => {
        setValue(`galaxies.${galaxyIndex}.galaxy_name`, galaxy.galaxy_name);
        setValue(
          `galaxies.${galaxyIndex}.highest_reward`,
          galaxy.highest_reward
        );
        setValue(`galaxies.${galaxyIndex}.stars`, galaxy.stars_to_be_achieved);
        setValue(
          `galaxies.${galaxyIndex}.total_milestones`,
          galaxy.total_milestones
        );

        galaxy?.milestones?.forEach((milestone, milestoneIndex) => {
          setValue(
            `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.milestone_name`,
            milestone.milestone_name
          );
          setValue(
            `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.milestone_reward`,
            milestone.milestone_reward
          );
          setValue(
            `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.meteors_required_to_unlock`,
            milestone.Number(meteors_required_to_unlock)
          );
          setValue(
            `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.milestone_description`,
            milestone.milestone_description
          );
        });
      }
    );
  }, []);

  //
  const [activeAccordion, setActiveAccordion] = useState("flush-collapseOne");

  const handleAccordionToggle = (id) => {
    setActiveAccordion((prev) => (prev === id ? "" : id));
  };

  const getHeadingText = () => {
    switch (activeAccordion) {
      case "flush-collapseOne":
        return "How It Works";
      case "flush-collapseTwo":
        return "Advertisement Banner 1";
      case "flush-collapseThree":
        return "Frequently Asked Questions";
      case "flush-collapseFour":
        return "Footer Section";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="min-vh-100 bg-light-white-3-color">
        {/* Header */}
        <CampaignNavbar />
        <div className="container pt-5">
          <p className="text-blue-color font-24 montserrat-semibold mb-0">
            {ContextToEditForm ? <>Edit Campaign</> : <>Create Campaign</>}
          </p>
          <p className="text-blue-color font-12 montserrat-medium">
            {ContextToEditForm ? (
              <>Edit the fields below to update your campaign</>
            ) : (
              <>Start a new campaign by filling out the details below.</>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          onChange={(e) => e.target.type === "submit" && e.preventDefault()}
        >
          <div className="campaign-tab-bg d-flex justify-content-between align-items-center">
            {/* <p className='mb-0 text-blue-color font-16'>Info</p> */}
            <div className="container ps-5">
              {!ContextToEditForm ? (
                <Nav
                  // className="mt-2"
                  activeKey={activeTab}
                  onSelect={(selectedKey) => {
                    if (enabledTabs.includes(selectedKey)) {
                      setActiveTab(selectedKey);
                    }
                  }}
                >
                  {tabs.map((tab) => (
                    <Nav.Item key={tab.key}>
                      <Nav.Link
                        eventKey={tab.key}
                        className={`font-16 montserrat-semibold text-border-gray-color ${!enabledTabs.includes(tab.key) ? "disabled-tab" : ""
                          }`}
                        disabled={!enabledTabs.includes(tab.key)}
                      >
                        {tab.label}{" "}
                        <IoIosArrowForward className="mx-1 font-20" />
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              ) : (
                <Nav
                  // className="mt-2"
                  activeKey={activeTab}
                  onSelect={(selectedKey) => {
                    // if (enabledTabs.includes(selectedKey)) {
                    setActiveTab(selectedKey);
                    // }
                  }}
                >
                  {tabs.map((tab) => (
                    <Nav.Item key={tab.key}>
                      <Nav.Link
                        eventKey={tab.key}
                        className={`font-16 montserrat-semibold text-blue-color ${enabledTabs.includes(tab.key) ? "disabled-tab" : ""
                          }`}
                      // disabled={!enabledTabs.includes(tab.key)}
                      >
                        {tab.label}{" "}
                        <IoIosArrowForward className="mx-1 font-20" />
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              )}
            </div>
            {ContextToEditForm ? (
              // 🛠 Edit Mode
              <>
                {activeTab === "tab4" ? (
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)} // ✅ Submits only on click
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
              </>
            ) : (

              <>
                {activeTab === "tab4" ? (
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
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
              </>
            )}
          </div>

          <div className="container py-3">
            {/* Tab1 content Start here */}
            {activeTab === "tab1" && (
              <>
                <div className="camp-form row border-radius-16 py-4">
                  <div className="col-lg-6">
                    {/* Campaign Name */}
                    <div className="mb-3">
                      <label
                        htmlFor="campaignName"
                        className="form-label font-14 text-gray-color montserrat-regular"
                      >
                        Campaign Name
                      </label>
                      <input
                        id="campaignName"
                        {...register("program_name", {
                          required: "Campaign name is required",
                        })}
                        className="form-control border-0 border-radiu-8 login-input text-blue-color montserrat-medium"
                        placeholder="Enter campaign name"
                      />
                      {errors.program_name && (
                        <p className="text-danger">{errors.program_name.message}</p>
                      )}
                    </div>

                    {/* Company Logo */}
                    <div className="mb-4">
                      <label className="form-label font-14 text-gray-color montserrat-regular">
                        Company Logo
                      </label>
                      <div className="d-flex align-items-center gap-3">
                        {CampLogo ? (
                          <div className="position-relative">
                            <img
                              src={CampLogo}
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
                              onClick={() => setCampLogo(null)}
                            >
                              <IoClose size={14} />
                            </button>
                          </div>
                        ) : (
                          <div
                            className="border border-2 login-input border-dashed rounded d-flex align-items-center justify-content-center text-muted"
                            style={{
                              width: "64px",
                              height: "64px",
                            }}
                          >
                            <span>+</span>
                          </div>
                        )}
                        <div>
                          <label className="upload-box d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
                            Upload Image
                            <input
                              type="file"
                              id="formFile"
                              {...register("logo")}
                              onChange={(e) => handleCampLogoUpload(e)}
                            />
                          </label>
                          <div className="form-text font-12 montserrat-medium text-gray-color">
                            Upload PNG, JPG, or GIF. Max size: 2MB
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}


            {/* Tab2 content Start here */}
            {activeTab === "tab2" && (
              <>
              
                {Array.from({ length: Number(NoGalaxy) || 1 })?.map(
                  (_, galaxyIndex) => (
                    <div className="row py-4">
                      <div className="col-lg-6">
                        <div className="bg-white border-radius-12 box-shadow p-4">
                          {/* <div className="col-lg-12"> */}
                          <div
                            // onSubmit={handleSubmitAddGalaxy(onAddGalaxySubmit)}
                            className="row"
                          >
                            <h5 className=" font-18 montserrat-semibold text-gray-color mb-0">
                              Create New Galaxy {galaxyIndex + 1}
                            </h5>
                            <p className="text-blue-color font-12 montserrat-medium">
                              This is the first level of the reward and referral
                              program
                            </p>
                            {/* Galaxy Title */}
                            <div className="col-lg-12 mb-3">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                Galaxy Name
                              </label>
                              <input
                                type="text"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...register(
                                  `galaxies.${galaxyIndex}.galaxy_name`,
                                  {
                                    required: "Galaxy Title is required",
                                  }
                                )}
                              />
                            </div>

                            {/* Galaxy Stars */}
                            <div className="col-lg-12 mb-3">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                Star
                              </label>
                              <input
                                type="number"
                                placeholder="Y Stars"
                                min="0"
                                onKeyDown={(e) => {
                                  if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                                }}
                                onInput={(e) => {
                                  if (e.target.value < 0) e.target.value = 0;
                                }}
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...register(`galaxies.${galaxyIndex}.stars`)}
                              />
                            </div>

                            {/* No of Milestones */}
                            <div className="col-lg-12">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                No of Milestones (levels inside)
                              </label>
                              <select
                                {...register(
                                  `galaxies.${galaxyIndex}.total_milestones`
                                )}
                                className="form-select login-input text-border-gray-color"
                                defaultValue=""
                              >
                                <option value="">Choose the numbers</option>

                                {[...Array(8)].map((_, i) => {
                                  const value = i + 3; // 3 to 10
                                  return (
                                    <option key={value} value={value}>
                                      {value}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      </div>

                      <div className="col-lg-6 new-milestone-form">
                        <div className="bg-white border-radius-12 border-light-gray p-4 milestone-form-sect">
                          {/* MileStone Form */}
                          {Array.from({
                            length: Number(
                              watch(
                                `galaxies.${galaxyIndex}.total_milestones`
                              ) || 1
                            ),
                          }).map((_, milestoneIndex) => (
                            <div
                              key={milestoneIndex}
                              className="milestone-form row"
                            >
                              <hr
                                className={`${milestoneIndex == 0 ? "d-none" : ""
                                  }`}
                              />
                              <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                                Milestone {milestoneIndex + 1}
                              </p>
                              <p className="text-blue-color font-12 montserrat-medium">
                                This is the first milestone/ Level of the reward
                                and referral program
                              </p>

                              {/* Milestone Title */}
                              <div className="col-lg-12 mb-3">
                                <label
                                  htmlFor="milestoneTitle"
                                  className="form-label font-14 montserrat-regular text-border-gray-color"
                                >
                                  Milestone Name
                                </label>
                                <input
                                  id="milestoneTitle"
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.milestone_name`,
                                    {
                                      required: "Milestone Name is required",
                                    }
                                  )}
                                  type="text"
                                  className="form-control login-input border-0"
                                />
                                {/* {errors.milestoneTitle && (
                                                                      <p className="text-danger">
                                                                          {errors.milestoneTitle.message}
                                                                      </p>
                                                                      )} */}
                              </div>

                              {/* Display Message */}
                              <div className="col-lg-12 mb-3">
                                <label
                                  htmlFor="displaymessage"
                                  className="form-label font-14 montserrat-regular text-border-gray-color"
                                >
                                  Display Message
                                </label>
                                <input
                                  id="displaymessage"
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.display_message`,
                                    {
                                      required: "Display Message is required",
                                    }
                                  )}
                                  type="text"
                                  className="form-control login-input border-0"
                                />
                              </div>

                              {/* Icon Url */}

                              {/* Milestone Reward */}
                              <div className="col-lg-6 mb-3">
                                <label
                                  htmlFor="referrals_required_to_unlock"
                                  className="form-label font-14 montserrat-regular text-border-gray-color"
                                >
                                  Referrals required to unlock
                                </label>
                                <input
                                  id="referrals_required_to_unlock"
                                  min="0"
                                  onKeyDown={(e) => {
                                    if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                                  }}
                                  onInput={(e) => {
                                    if (e.target.value < 0) e.target.value = 0;
                                  }}
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.referrals_required_to_unlock`,
                                    {
                                      required:
                                        "Referral required to unlock is required",
                                      setValueAs: (value) =>
                                        value ? Number(value) : 0,
                                    }
                                  )}
                                  type="number"
                                  className="form-control login-input border-0"
                                />
                                {/* {errors.milestoneReward && (
                                                                      <p className="text-danger">
                                                                          {errors.milestoneReward.message}
                                                                      </p>
                                                                )} */}
                              </div>

                              {/* Meteors required to unlock */}
                              <div className="col-lg-6 mb-3">
                                <label
                                  htmlFor="meteorsRequired"
                                  className="form-label font-14 montserrat-regular text-border-gray-color"
                                >
                                  Meteors required to unlock
                                </label>
                                <input
                                  id="meteorsRequired"
                                  min="0"
                                  onKeyDown={(e) => {
                                    if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                                  }}
                                  onInput={(e) => {
                                    if (e.target.value < 0) e.target.value = 0;
                                  }}
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.meteors_required_to_unlock`,
                                    {
                                      required: "Meteors required is required",

                                      setValueAs: (value) =>
                                        value ? Number(value) : 0, // Convert value to number
                                    }
                                  )}
                                  type="number"
                                  className="form-control login-input border-0"
                                />
                                {/* {errors.meteorsRequired && (
                                                                                <p className="text-danger">
                                                                      {errors.meteorsRequired.message}
                                                                              </p>
                                                                      )} */}
                              </div>

                              {/* Milestone Description */}
                              <div className="col-lg-12 mb-3">
                                <label
                                  htmlFor="milestoneDescription"
                                  className="form-label font-14 montserrat-regular text-border-gray-color"
                                >
                                  Milestone Description
                                </label>
                                <textarea
                                  id="milestoneDescription"
                                  {...register(
                                    `galaxies.${galaxyIndex}.milestones.${milestoneIndex}.milestone_description`
                                  )}
                                  className="form-control login-input border-0"
                                  rows={3}
                                ></textarea>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
                  <div className="pt-4">
                  <Button
                    type="button"
                    onClick={() => SetNoGalaxy((prev) => prev + 1)}
                    btn_class={`border-purple bg-transparent px-4 w-25 ${isFirstGalaxyValid ? "text-purple-color" : "text-gray-color opacity-50 cursor-not-allowed"
                      }`}
                    btn_title="Create New"
                    disabled={!isFirstGalaxyValid}
                  />
                </div>
              </>
            )}

            {/* Tab3 content Start here */}
            {activeTab === "tab3" && (
              <>
                <div className="row py-4">
                  <div className="col-lg-6">
                    <div
                      class="accordion accordion-flush mb-2 border-0"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="true"
                            aria-controls="flush-collapseOne"
                          >
                            Share direct link via
                          </button>
                          <p className="ps-3 font-12 montserrat-medium text-blue-color">
                            {" "}
                            Choose a primary option to directly share the invite
                            through social media
                          </p>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Primary
                            </label>
                            <div className="d-flex align-items-center gap-3 mb-3">
                              <Dropdown onSelect={handlePrimarySelect}>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="w-100 login-input text-start px-3 py-2 border-0 border-radius-8 d-flex justify-content-between align-items-center"
                                >
                                  <div className="d-flex align-items-center font-14 montserrat-medium text-blue-color gap-2 me-5">
                                    <span>{primarySelected}</span>
                                  </div>

                                  {/* Custom Arrow */}
                                  <IoIosArrowDown className="text-blue-color" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="w-100 shadow-sm rounded">
                                  {Object.entries(platformIcons).map(
                                    ([name, icon]) => (
                                      <Dropdown.Item
                                        key={name}
                                        eventKey={name}
                                        className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                                      >
                                        <span>{name}</span>
                                        {icon}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                              <div className="position-relative text-blue-color">
                                <span
                                  className="badge border-0 cross-icon rounded-circle position-absolute top-0 start-100 translate-middle"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setPrimaryShare("")}
                                >
                                  <RxCross1 className="font-10 text-blue-color" />
                                </span>
                                {platformIcons[primaryShare]}
                              </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                              <label
                                htmlFor="milestoneDescription"
                                className="form-label font-14 montserrat-regular text-border-gray-color"
                              >
                                Message with invite
                              </label>
                              <textarea
                                id="milestoneDescription"
                                {...register(`messagewithinvite`)}
                                className="form-control login-input border-0"
                                rows={3}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add Other PlateForms */}
                      <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                        <h2 className="accordion-header" id="flush-headingTwo">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                          >
                            Add other platforms
                          </button>
                          <p className="ps-3 font-12 montserrat-medium text-blue-color">
                            Choose a primary option to directly share the invite
                            through social media
                          </p>
                        </h2>
                        <div
                          id="flush-collapseTwo"
                          className="accordion-collapse collapse text-blue-color"
                          aria-labelledby="flush-headingTwo"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                              <Dropdown onSelect={handleOtherSelect}>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="w-100 text-start login-input px-3 py-2 border-0 border-radius-8 d-flex justify-content-between align-items-center"
                                >
                                  <div className="d-flex font-14 montserrat-medium text-blue-color align-items-center gap-2 me-5">
                                    {otherSelected}
                                  </div>

                                  {/* Custom Arrow */}
                                  <IoIosArrowDown className="text-blue-color" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="w-100 shadow-sm rounded">
                                  {Object.entries(platformIcons).map(
                                    ([name, icon]) => (
                                      <Dropdown.Item
                                        key={name}
                                        eventKey={name}
                                        className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                                      >
                                        <span>{name}</span>
                                        {icon}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                              {platforms.map((platform) => (
                                <div
                                  className="position-relative mx-2 text-blue-color"
                                  key={platform}
                                >
                                  <span
                                    className="badge text-center cross-icon border-0 rounded-circle position-absolute top-0 start-100 translate-middle"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removePlatform(platform)}
                                  >
                                    <RxCross1 className="font-10 text-blue-color" />
                                  </span>
                                  {platformIcons[platform]}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                                FACEBOOK
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("fb")}
                            ></textarea>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                                Telegram
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("tl")}
                            ></textarea>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                                LinkedIn
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("ln")}
                            ></textarea>
                          </div>
                          <div className="mb-3 px-3">
                            <label className="form-label font-12 montserrat-medium text-blue-color">
                              Message with{" "}
                              <span className="montserrat-semibold text-uppercase">
                                TWITTER
                              </span>{" "}
                              invite
                            </label>
                            <textarea
                              class="form-control login-input rounded-3 border-0 py-2"
                              rows="2"
                              {...register("tw")}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Create Special Link */}
                      <div class="accordion-item bg-white box-shadow border-light-gray border-radius-12">
                        <h2 class="accordion-header" id="flush-headingThree">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                          >
                            Create special link
                          </button>
                          <p className="ps-3 font-12 montserrat-medium text-blue-color">
                            Choose a primary option to directly share the invite
                            through social media
                          </p>
                        </h2>
                        <div
                          id="flush-collapseThree"
                          className="accordion-collapse collapse text-blue-color"
                          aria-labelledby="flush-headingThree"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            <div className="row">
                              {/* Start Date */}
                              <div className="col-lg-6 mb-3">
                                <input
                                  type="date"
                                  placeholder="Start Date"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("start_date", {
                                    required: "Start Date is required",
                                  })}
                                  defaultValue={
                                    new Date().toISOString().split("T")[0]
                                  }
                                  min={new Date().toISOString().split("T")[0]}
                                />
                                {errors.start_date && (
                                  <p className="text-danger">
                                    {errors.start_date.message}
                                  </p>
                                )}
                              </div>

                              {/* End Date */}
                              <div className="col-lg-6 mb-3">
                                <input
                                  type="date"
                                  placeholder="End Date"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("end_date", {
                                    required: "End Date is required",
                                  })}
                                  min={
                                    new Date(Date.now() + 86400000)
                                      .toISOString()
                                      .split("T")[0]
                                  }
                                />
                                {errors.end_date && (
                                  <p className="text-danger">
                                    {errors.end_date.message}
                                  </p>
                                )}
                              </div>

                              {/* Generate a Link */}
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control login-input py-2 border-radiu-8 font-14 border-0"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={InviteLink}
                                  {...register("invite_link", {
                                    required: "Invite link is required",
                                  })}
                                />
                                <button
                                  className="rounded-end bg-purple-color py-2 px-3 font-12 border-0 montserrat-regular text-white"
                                  type="button"
                                  id="button-addon2"
                                  disabled={Loading}
                                  onClick={() => HandleGentLink()}
                                >
                                  {Loading
                                    ? "Link Genrating..."
                                    : "Auto Generate Link"}
                                </button>
                              </div>
                              {errors.invite_link && (
                                <p className="text-danger">
                                  {errors.invite_link.message}
                                </p>
                              )}

                              {/* Referrer’s Reward Section */}
                              <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                Referrer’s Reward
                              </p>

                              {/* Reward Type */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Type
                                </label>
                                <select
                                  className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                                  aria-label="Default select example"
                                  {...register("referrer_reward_type", {
                                    required: "Reward Type is required",
                                  })}
                                >
                                  <option value="">Select one</option>
                                  <option value="Meteor">Meteor</option>
                                  <option value="Star">Star</option>
                                  <option value="Cash">Cash</option>
                                  <option value="Custom">Custom</option>
                                </select>
                                {errors.referrer_reward_type && (
                                  <p className="text-danger">
                                    {errors.referrer_reward_type.message}
                                  </p>
                                )}
                              </div>

                              {/* Reward Value */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Value
                                </label>
                                <input
                                  type="text"
                                  placeholder="Select one"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("referrer_reward_value", {
                                    required: "Reward Value is required",
                                  })}
                                />
                                {errors.referrer_reward_value && (
                                  <p className="text-danger">
                                    {errors.referrer_reward_value.message}
                                  </p>
                                )}
                              </div>

                              {/* Referree’s Reward */}
                              <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                Referree’s Reward
                              </p>

                              {/* Reward Type */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Type
                                </label>
                                <select
                                  className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                                  aria-label="Default select example"
                                  {...register("referee_reward_type", {
                                    required: "Reward Type is required",
                                  })}
                                >
                                  <option value="">Select one</option>
                                  <option value="Meteor">Meteor</option>
                                  <option value="Star">Star</option>
                                  <option value="Cash">Cash</option>
                                  <option value="Custom">Custom</option>
                                </select>
                                {errors.referee_reward_type && (
                                  <p className="text-danger">
                                    {errors.referee_reward_type.message}
                                  </p>
                                )}
                              </div>

                              {/* Reward Value */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Value
                                </label>
                                <input
                                  type="text"
                                  placeholder="Select one"
                                  className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                  {...register("referee_reward_value", {
                                    required: "Reward Value is required",
                                  })}
                                />
                                {errors.referee_reward_value && (
                                  <p className="text-danger">
                                    {errors.referee_reward_value.message}
                                  </p>
                                )}
                              </div>

                              {/* Reward Condition */}
                              <p className="font-18 montserrat-semibold text-gray-color mb-0">
                                Reward Condition
                              </p>
                              <div className="col-lg-12 mb-3">
                                <label className="form-label font-12 montserrat-medium text-gray-color">
                                  Reward Condition
                                </label>
                                <select
                                  className="form-select login-input text-blue-color rounded-3 border-0 py-2"
                                  aria-label="Default select example"
                                  {...register("reward_condition", {
                                    required: "Reward Condition is required",
                                  })}
                                >
                                  <option value="">Select one</option>
                                  <option value="On Sign up">On Sign up</option>
                                  <option value="On 10 referrals">
                                    On 10 referrals
                                  </option>
                                  <option value="When all referred users spend ₹5000 total">
                                    When all referred users spend ₹5000 total
                                  </option>
                                  <option value="On Monthly Leaderboard Ranking">
                                    On Monthly Leaderboard Ranking
                                  </option>
                                  <option value="Custom">Custom</option>
                                </select>
                                {errors.reward_condition && (
                                  <p className="text-danger">
                                    {errors.reward_condition.message}
                                  </p>
                                )}
                              </div>

                              {/* What Referrer will get */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invite Card Start Here */}
                  <div className="col-lg-6">
                    <div className="bg-white border-light-gray border-radius-12 p-4">
                      <div className="invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center">
                        <p className="text-white montserrat-semibold font-16">
                          Invite A Friend
                        </p>
                        <div className="copy-input-container position-relative">
                          <input
                            type="text"
                            className="copy-input input-invite-friend bg-white rounded-1 border-0"
                          />
                          <button
                            type="button"
                            className="invite-copy-butto text-white bg-blue-color font-12 rounded-1 me-1 px-2 position-absolute top-50 end-0 translate-middle-y border-0"
                          >
                            Copy
                          </button>
                        </div>
                        <div className="divider-with-text my-2">
                          <span className="divider-border mx-2 font-12">
                            Or
                          </span>
                        </div>

                        <button
                          type="button"
                          className="btn-share-via-whatsapp border-0 bg-blue-color width-40 rounded-pill poppins-regular text-white bg-primary-color font-12 py-1 my-2"
                        >
                          Share Via Whatsapp
                        </button>

                        <ul className="social-nav pl-0 d-flex justify-content-center">
                          <li className="social-list cursor-pointer">
                            <FaFacebookSquare className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <AiFillInstagram className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaYoutube className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaTwitterSquare className="text-blue-color font-18" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Tab4 content Start here */}
            {activeTab === "tab4" && (
              <>
                <div className="row py-4">
                  <div className="col-lg-6">
                    <div className="bg-white box-shadow border-radius-12 p-4">
                      {/* Reward form Start Here */}
                      <div className="row">
                        <p className="font-18 montserrat-semibold text-gray-color mb-0">
                          Referrer Rewards{" "}
                        </p>
                        <p className="text-blue-color font-12 montserrat-medium">
                          What referrers get for successfully referring their
                          friends{" "}
                        </p>
                        {/* Reward Type */}

                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Joining Bonus Meteors
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Value"
                            min="0"
                            onKeyDown={(e) => {
                              if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                            }}
                            onInput={(e) => {
                              if (e.target.value < 0) e.target.value = 0;
                            }}

                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("joining_bonus", {
                              required: "Joining bonus is required",
                              min: { value: 0, message: "Value cannot be negative" },
                              setValueAs: (value) =>
                                value ? Number(value) : 0, // Convert value to number
                            })}
                          />
                          {errors.joining_bonus && (
                            <p className="text-danger">
                              {errors.joining_bonus.message}
                            </p>
                          )}
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Meteors per Referral
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Value"
                            min="0"
                            onKeyDown={(e) => {
                              if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                            }}
                            onInput={(e) => {
                              if (e.target.value < 0) e.target.value = 0;
                            }}

                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("meteors_referral", {
                              required: "Meteors referral is required",
                              min: { value: 0, message: "Value cannot be negative" },
                              setValueAs: (value) =>
                                value ? Number(value) : 0, // Convert value to number
                            })}
                          />
                          {errors.mete && (
                            <p className="text-danger">
                              {errors.meteors_referral.message}
                            </p>
                          )}
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Stars On Joining
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Value"
                            min="0"
                            onKeyDown={(e) => {
                              if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                            }}
                            onInput={(e) => {
                              if (e.target.value < 0) e.target.value = 0;
                            }}

                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("stars_joining", {
                              required: "Stars joining is required",
                              min: { value: 0, message: "Value cannot be negative" },
                              setValueAs: (value) =>
                                value ? Number(value) : 0, // Convert value to number
                            })}
                          />
                          {errors.stars_joining && (
                            <p className="text-danger">
                              {errors.stars_joining.message}
                            </p>
                          )}
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-12 montserrat-medium text-gray-color">
                            Link Validity Days
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Value"
                            min="0"
                            onKeyDown={(e) => {
                              if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                            }}
                            onInput={(e) => {
                              if (e.target.value < 0) e.target.value = 0;
                            }}

                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                            {...register("link_validity", {
                              required: "",
                              min: { value: 0, message: "Value cannot be negative" },
                              setValueAs: (value) =>
                                value ? Number(value) : 0, // Convert value to number
                            })}
                          />
                          {errors.link_validity && (
                            <p className="text-danger">
                              {errors.link_validity.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Login Sign-up Reward */}

                    {/* Set Conversion Rate */}
                    <div className="bg-white box-shadow border-radius-12 p-4 mt-4">
                      <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                        Set Conversion rates
                      </p>
                      <p className="text-blue-color font-12 montserrat-medium">
                        Define how users can convert their meteors into stars
                        and then into rewards
                      </p>

                      <div className="row">
                        <div className="col-lg-12 d-flex align-items-center my-2">
                          <div className="">
                            <input
                              className="form-control login-input border-radiu-8 font-14 py-2 border-0"
                              placeholder="For every X Meteor"
                              type="number"
                              min="0"
                              onKeyDown={(e) => {
                                if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                              }}
                              onInput={(e) => {
                                if (e.target.value < 0) e.target.value = 0;
                              }}

                              name=""
                              id=""
                              {...register("meteor", {
                                required: "meteor is required",
                                setValueAs: (value) =>
                                  value ? Number(value) : 0, // Convert value to number
                              })}
                            />
                            {errors.meteor && (
                              <p className="text-danger">
                                {errors.meteor.message}
                              </p>
                            )}
                          </div>
                          <span className="mx-3">=</span>
                          <div>
                            <input
                              className="form-control login-input border-radiu-8 font-14 py-2 border-0"
                              placeholder="Rupees Rate"
                              type="number"
                              min="0"
                              onKeyDown={(e) => {
                                if (["-", "e", "E", "+"].includes(e.key)) e.preventDefault();
                              }}
                              onInput={(e) => {
                                if (e.target.value < 0) e.target.value = 0;
                              }}

                              name=""
                              id=""
                              {...register("y_star", {
                                required: "Rupees Rate is required",
                                setValueAs: (value) =>
                                  value ? Number(value) : 0, // Convert value to number
                              })}
                            />
                            {errors.y_star && (
                              <p className="text-danger">
                                {errors.y_star.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invite Card Start Here */}
                  <div className="col-lg-6">
                    <div className="bg-white border-light-gray border-radius-12 p-4">
                      <div className="invite-card border-radius-8 text-center d-flex flex-column align-items-center justify-content-center">
                        <p className="text-white montserrat-semibold font-16">
                          Invite A Friend
                        </p>
                        <div className="copy-input-container position-relative">
                          <input
                            type="text"
                            className="copy-input input-invite-friend bg-white rounded-1 border-0"
                          />
                          <button
                            type="button"
                            className="invite-copy-butto text-white bg-blue-color font-12 rounded-1 me-1 px-2 position-absolute top-50 end-0 translate-middle-y border-0"
                          >
                            Copy
                          </button>
                        </div>
                        <div className="divider-with-text my-2">
                          <span className="divider-border mx-2 font-12">
                            Or
                          </span>
                        </div>

                        <button
                          type="button"
                          className="btn-share-via-whatsapp border-0 bg-blue-color width-40 rounded-pill poppins-regular text-white bg-primary-color font-12 py-1 my-2"
                        >
                          Share Via Whatsapp
                        </button>

                        <ul className="social-nav pl-0 d-flex justify-content-center">
                          <li className="social-list cursor-pointer">
                            <FaFacebookSquare className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <AiFillInstagram className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaYoutube className="text-blue-color font-18" />
                          </li>
                          <li className="social-list cursor-pointer">
                            <FaTwitterSquare className="text-blue-color font-18" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Tab5 content Start here */}
            {activeTab === "tab5" && (
              <>
                <div className="row py-4">
                  <div className="col-lg-6">
                    <div
                      class="accordion accordion-flush mb-2 border-0"
                      id="accordionFlushExample"
                    >
                      {/* Add How It's Work */}
                      <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="true"
                            aria-controls="flush-collapseOne"
                            onClick={() =>
                              handleAccordionToggle("flush-collapseOne")
                            }
                          >
                            How It Works
                          </button>
                          <p className="px-3 font-12 montserrat-medium text-blue-color">
                            {" "}
                            This will contain all the steps to explain the users
                            how the program will work. Edit the data according
                            to your need.
                          </p>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          {/* Accordian Body */}
                          <div className="accordion-body text-blue-color">
                            <div className="row">
                              {/* Title 1 */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Title 1
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Title 1"
                                  {...register("title1")}
                                />
                              </div>

                              {/* Description 1 */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Add Description (25-30 words)
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Description"
                                  {...register("desc1")}
                                />
                              </div>

                              {/* Title 2 */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Title 2
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Title 2"
                                  {...register("title2")}
                                />
                              </div>

                              {/* Description 2 */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Add Description (25-30 words)
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Description"
                                  {...register("desc2")}
                                />
                              </div>

                              {/* Title 3 */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Title 3
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Title 3"
                                  {...register("title3")}
                                />
                              </div>

                              {/* Description 3 */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Add Description (25-30 words)
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Description"
                                  {...register("desc3")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add Advertisement Banner 1 */}
                      <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                        <h2 className="accordion-header" id="flush-headingTwo">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                            onClick={() =>
                              handleAccordionToggle("flush-collapseTwo")
                            }
                          >
                            Advertisement Banner 1
                          </button>
                          <p className="ps-3 font-12 montserrat-medium text-blue-color">
                            Customize this card to highlight your latest offer
                            or referral perk.
                          </p>
                        </h2>
                        <div
                          id="flush-collapseTwo"
                          className="accordion-collapse collapse text-blue-color"
                          aria-labelledby="flush-headingTwo"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            <div className="row">
                              {/* Title 1 */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Title 1
                                </label>
                                <input
                                  type="text"
                                  {...register("title", {
                                    required: "Title is required",
                                  })}
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Title 1"
                                />
                                {errors.title && (
                                  <small className="text-danger">
                                    {errors.title.message}
                                  </small>
                                )}
                              </div>

                              {/* Description */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Add Description (25-30 words)
                                </label>
                                <input
                                  type="text"
                                  {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                      value: 25,
                                      message: "Minimum 25 characters required",
                                    },
                                    maxLength: {
                                      value: 300,
                                      message: "Maximum 300 characters allowed",
                                    },
                                  })}
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Description"
                                />
                                {errors.description && (
                                  <small className="text-danger">
                                    {errors.description.message}
                                  </small>
                                )}
                              </div>

                              {/* Button Text */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Button text
                                </label>
                                <input
                                  type="text"
                                  {...register("button_txt", {
                                    required: "Button text is required",
                                  })}
                                  className="form-control border-0 login-input"
                                  placeholder="Enter Button text"
                                />
                                {errors.button_txt && (
                                  <small className="text-danger">
                                    {errors.button_txt.message}
                                  </small>
                                )}
                              </div>

                              {/* File Upload */}
                              <div className="col-lg-6 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Attach Image/Icon
                                  <div className="upload-box d-flex flex-wrap text-center login-input rounded-2 form-control border-0 py-2 text-blue-color font-12 montserrat-medium">
                                    <div className="upload-icon">
                                      <PiUploadSimpleBold className="font-16 me-3 mb-1" />
                                    </div>
                                    Upload
                                    <input
                                      type="file"
                                      className="ms-2"
                                      {...register("image", {
                                        required: "Image is required",
                                      })}
                                    />
                                  </div>
                                </label>
                                {errors.image && (
                                  <small className="text-danger">
                                    {errors.image.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add Frequently Asked Questions */}
                      <div class="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                        <h2 class="accordion-header" id="flush-headingThree">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                            onClick={() =>
                              handleAccordionToggle("flush-collapseThree")
                            }
                          >
                            Frequently Asked Questions
                          </button>
                          <p className="px-3 font-12 montserrat-medium text-blue-color">
                            Edit questions and answers to keep your users
                            informed and confident.
                          </p>
                        </h2>
                        <div
                          id="flush-collapseThree"
                          className="accordion-collapse collapse text-blue-color"
                          aria-labelledby="flush-headingThree"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            {faqList.map((item, index) => (
                              <React.Fragment key={index}>
                                <div className="col-lg-12 mb-3">
                                  <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                    Question {index + 1}
                                  </label>
                                  <div className="d-flex gap-3 justify-content-between">
                                    <input
                                      type="text"
                                      className="form-control login-input border-0"
                                      {...register(`faq.${index}.question`)}
                                    />
                                    <div className="login-input rounded-circle faq-add-btn d-flex align-items-center justify-content-center">
                                      <GoPlus className="font-24" />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                  <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                    Answer
                                  </label>
                                  <textarea
                                    className="form-control login-input rounded-3 border-0 py-2"
                                    rows="3"
                                    {...register(`faq.${index}.answer`)}
                                    placeholder="Enter answer"
                                  ></textarea>
                                </div>

                                <hr />
                              </React.Fragment>
                            ))}

                            <div className="text-start">
                              <button
                                type="button"
                                onClick={handleAddFAQ}
                                className="border-0 bg-purple-color text-white font-14 montserrat-medium rounded-pill px-4 py-2"
                              >
                                + Add Faq
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add Footer Section */}
                      <div class="accordion-item bg-white box-shadow border-light-gray border-radius-12">
                        <h2 class="accordion-header" id="flush-headingFour">
                          <button
                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseFour"
                            aria-expanded="false"
                            aria-controls="flush-collapseFour"
                            onClick={() =>
                              handleAccordionToggle("flush-collapseFour")
                            }
                          >
                            Footer Section
                          </button>
                          <p className="px-3 font-12 montserrat-medium text-blue-color">
                            Edit the content you want to display on your footer
                            section
                          </p>
                        </h2>
                        <div
                          id="flush-collapseFour"
                          className="accordion-collapse collapse text-blue-color"
                          aria-labelledby="flush-headingFour"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body text-blue-color">
                            <div className="col-lg-12 mb-3">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                Select or type the content
                              </label>
                              <input
                                type="text"
                                className="form-control border-0 login-input"
                                placeholder="Enter Footer Text"
                                {...register(`footer_text`)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    {activeAccordion && (
                      <div className="bg-light p-4 rounded shadow">
                        <h4 className="text-blue-color font-18 montserrat-semibold">
                          {getHeadingText()}
                        </h4>
                        {activeAccordion == "flush-collapseOne" && (
                          <div
                            className="howitwork-second h-100 d-flex align-items-center justify-content-center"
                            data-aos="zoom-in-up"
                          >
                            <div className="row text-center position-relative inner-row-index">
                              <div className={`col-4 howitworks-step visible`}>
                                <h6 className="montserrat-bold font-10 mb-22">
                                  {/* {ContextFaqsDataAPI?.how_it_works?.[0]?.title1} */}
                                  {title1}
                                </h6>
                                <p className="montserrat-regular font-8">
                                  {/* {ContextFaqsDataAPI?.how_it_works?.[0]?.desc1} */}
                                  {desc1}
                                </p>
                              </div>

                              <div
                                className={`col-4 d-flex align-items-end justify-content-center howitworks-step visible`}
                              >
                                <img
                                  src={Planet2}
                                  className="planet-width mb-3 w-25"
                                  alt="Planet 2"
                                />
                              </div>

                              <div className={`col-4 howitworks-step visible`}>
                                <h6 className="montserrat-bold font-10 mb-22">
                                  {/* {ContextFaqsDataAPI?.how_it_works?.[0]?.title3} */}
                                  {title2}
                                </h6>
                                <p className="montserrat-regular font-8">
                                  {/* {ContextFaqsDataAPI?.how_it_works?.[0]?.desc3} */}
                                  {desc2}
                                </p>
                              </div>

                              <div className="col-12 my-4 position-relative">
                                <div className={`timeline-dot visible`} />
                                <div className={`timeline-dot visible`} />
                                <div className={`timeline-dot visible`} />
                                <div className="timeline-border" />
                                <img
                                  src={Rocketgif}
                                  alt="Rocket"
                                  className="rocket-gif"
                                />
                              </div>

                              <div className={`col-4 howitworks-step visible`}>
                                <img
                                  src={Planet1}
                                  className="planet-width mt-3 w-25"
                                  alt="Planet 1"
                                />
                              </div>

                              <div className={`col-4 howitworks-step visible`}>
                                <h6 className="montserrat-bold font-10 mb-22">
                                  {/* {ContextFaqsDataAPI?.how_it_works?.[0]?.title2} */}
                                  {title3}
                                </h6>
                                <p className="montserrat-regular font-8">
                                  {/* {ContextFaqsDataAPI?.how_it_works?.[0]?.desc2} */}
                                  {desc3}
                                </p>
                              </div>

                              <div className={`col-4 howitworks-step visible`}>
                                <img
                                  src={Planet3}
                                  className="planet-width mt-3 w-25"
                                  alt="Planet 3"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {<div></div>}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CampaignForm;
