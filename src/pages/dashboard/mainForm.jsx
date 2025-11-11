import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoChevronDown,
  IoAdd,
  IoHelpCircleOutline,
  IoFlash,
  IoSettingsSharp,
  IoClose,
} from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import {
  IoIosArrowForward,
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoTwitter,
  IoIosArrowDown,
} from "react-icons/io";
import {
  PiExport,
  PiFadersHorizontal,
  PiPencilSimple,
  PiUploadSimpleBold,
} from "react-icons/pi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { Dropdown } from "react-bootstrap";
import { toastError, toastSuccess } from "../../utils/toster";
import { postData } from "../../services/api";
import { useNavigate } from "react-router-dom";
import CampaignNavbar from "../../components/campaignNavbar";

const MainForm = () => {
  // ==================
  // Use Form
  // ====================
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const {
    register: registerAddGalaxy,
    handleSubmit: handleSubmitAddGalaxy,
    formState: { errors: errorsAddGalaxy, isSubmitting: isAddGalaxySubmitting },
    watch: watchAddGalaxy,
  } = useForm();

  // ===========
  //   Json
  // ===========
  // Add Icons
  const platformIcons = {
    WhatsApp: <IoLogoWhatsapp size={25} />,
    Facebook: <IoLogoFacebook size={25} />,
    Instagram: <IoLogoInstagram size={25} />,
    YouTube: <IoLogoYoutube size={25} />,
    Twitter: <IoLogoTwitter size={25} />,
  };

  //=================
  // State
  //=================
  const [CampLogo, SetCampLogo] = useState();
  const [InviteLink, SetInviteLink] = useState();
  const [Loading, setLoading] = useState(false);
  const [primaryShare, setPrimaryShare] = useState("WhatsApp");
  const [primarySelected, setPrimarySelected] = useState("Choose one");
  const [otherSelected, setOtherSelected] = useState("Choose one");
  const [platforms, setPlatforms] = useState([
    "Facebook",
    "Instagram",
    "YouTube",
    "Twitter",
  ]);
  const [referrerImages, setReferrerImages] = useState([]);
  const [selectedGalaxy, setSelectedGalaxy] = useState("Milky Way Galaxy");

  const referrerInputRef = useRef(null);
  const navigate = useNavigate();
  const GetAdminUid = sessionStorage.getItem("Auth");

  //=============
  // Function
  //=============

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
  const handleReferrerFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // unique id using blob URL
      url: URL.createObjectURL(file),
    }));
    setReferrerImages((prev) => [...prev, ...newImages]);
  };
  const handleSelect = (eventKey) => {
    setSelectedGalaxy(eventKey?.target?.value);
    setGalaxyValue("galaxyTitle", eventKey);
  };
  const NoMileStone = watch("newmilestone");
  const NewMilestone = watchAddGalaxy("addnewmilestone");

  //=====================
  //Api Functionality
  //=====================

  const onReferFormSubmit = async (data) => {
    setLoading(true);
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.access_token,
        log_alt: getAuth?.session_id,
        start_date: new Date(data?.start_date)?.toLocaleDateString("en-GB"),
        end_date: new Date(data?.end_date)?.toLocaleDateString("en-GB"),
        referrer_reward_type: data?.referrer_reward_type,
        referrer_reward_value: data?.referrer_reward_value,
        referee_reward_type: data?.referee_reward_type,
        referee_reward_value: data?.referee_reward_value,
        reward_condition: data?.reward_condition,
        success_reward: data?.success_reward,
        invite_link: data?.invite_link,
        active: data?.active,
      };
      console.log("payload: ", payload);
      const response = await postData("/admin/special-referral-link", payload);
      if (response?.success) {
        toastSuccess(response?.message);
      }
      setLoading(false);
    } catch (error) {
      toastError(error?.error);
      setLoading(false);
    }
  };

  const onAddGalaxySubmit = (data) => {};

  const onSubmit = async (data) => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.mode,
        log_alt: getAuth?.log_alt,
        campaign_name: data?.name,
        subtitle: data?.subtitle,
        image: CampLogo,
        url: data?.url,
        referrer_reward: 400,
        invitee_reward: 400,
        conversion_rates: {
          meteors_to_stars: Number(data?.meteor),
          stars: Number(data?.y_star),
          stars_to_currency: Number(data?.star),
          currency: Number(data?.point),
        },
        start_date: data?.start_date,
        end_date: data?.end_date,
        link: data?.invite_link,
        referrer_reward_type: data?.referrer_reward_type,
        referrer_reward_value: Number(data?.referrer_reward_value),
        referee_reward_type: data?.referee_reward_type,
        referee_reward_value: Number(data?.referee_reward_value),
        reward_condition: data?.reward_condition,
        // success_reward : data?.success_reward,
        platforms: [
          {
            platform: "linkedIn",
            message: data?.fb,
          },
          {
            platform: "twitter",
            message: data?.fb,
          },
          {
            platform: "whatsapp",
            message: data?.fb,
          },
          {
            platform: "telegram",
            message: data?.fb,
          },
          {
            platform: "facebook",
            message: data?.fb,
          },
        ],
        primary_platform: primaryShare,
        signup_reward: Number(data?.signup_reward_value),
        signup_reward_type: data?.signup_reward_type,
        login_reward: Number(data?.login_reward_value),
        login_reward_type: data?.login_reward_type,
        referer_reward: Number(data?.referer_reward),
        refer_reward_type: data?.refer_reward_type,
        invitee_reward: Number(data?.invitee_reward),
        invitee_reward_type: data?.invitee_reward_type,
      };
      const response = await postData("/admin/create-campaign", payload);
      // const Decrpt = await DecryptFunction(response?.data);
      toastSuccess(response?.message);
    } catch (error) {
      toastError(error?.message);
    }
  };
  return (
    <>
      <section className="bg-light-blue-color">
        <CampaignNavbar/>
        <div className="container py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campaign Form */}
            <div className="camp-form background-light-color border-radius-16 p-4">
              <h2 className="text-center"> CAMPAIGN FORM</h2>
              <div className="modal-body row pt-3">
                {/* Campaign Name */}
                <div className="col-lg-6 mb-3">
                  <label
                    htmlFor="campaignName"
                    className="form-label fw-medium"
                  >
                    Campaign Name
                  </label>
                  <input
                    id="campaignName"
                    {...register("name", {
                      required: "Campaign name is required",
                    })}
                    className="form-control"
                    placeholder="Enter campaign name"
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>

                {/* Subtitle */}
                <div className="col-lg-6 mb-3">
                  <label
                    htmlFor="campaignSubtitle"
                    className="form-label fw-medium"
                  >
                    Subtitle
                  </label>
                  <input
                    id="campaignSubtitle"
                    {...register("subtitle")}
                    className="form-control"
                    placeholder="Enter campaign subtitle"
                  />
                </div>

                {/* Campaign URL */}
                <div className="col-lg-6 mb-3">
                  <label htmlFor="campaignUrl" className="form-label fw-medium">
                    Campaign URL
                  </label>
                  <input
                    id="campaignUrl"
                    {...register("url", {
                      pattern: {
                        value: /^https?:\/\/.+$/,
                        message: "Enter a valid URL",
                      },
                    })}
                    className="form-control"
                    placeholder="https://pages.viral-loops.com/..."
                  />
                  {errors.url && (
                    <p className="text-danger">{errors.url.message}</p>
                  )}
                </div>

                {/* Company Logo */}
                <div className="col-lg-6 mb-4">
                  <label className="form-label fw-medium">Company Logo</label>
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
                          //   onClick={handleRemoveLogo}
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
                        <span>+</span>
                      </div>
                    )}
                    <div className="flex-grow-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        {...register("logo")}
                        onChange={handleCampLogoUpload}
                      />
                      <div className="form-text">
                        Upload PNG, JPG, or GIF. Max size: 2MB
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <hr />
            {/* Refer and Share Form */}
            <div className="refer-form row background-light-color border-radius-16 p-4">
              <div className="row">
                <h2 className="text-center"> REFER FORM</h2>
                {/* Start Date */}
                <div className="col-lg-6 mb-3">
                  <input
                    type="date"
                    placeholder="Start Date"
                    className="form-control text-blue-color rounded-3 border-0 py-2"
                    {...register("start_date", {
                      required: "Start Date is required",
                    })}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.start_date && (
                    <p className="text-danger">{errors.start_date.message}</p>
                  )}
                </div>

                {/* End Date */}
                <div className="col-lg-6 mb-3">
                  <input
                    type="date"
                    placeholder="End Date"
                    className="form-control text-blue-color rounded-3 border-0 py-2"
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
                    <p className="text-danger">{errors.end_date.message}</p>
                  )}
                </div>

                {/* Generate a Link */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control py-3 border-radiu-8 font-14 border-0"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={InviteLink}
                    {...register("invite_link", {
                      required: "Invite link is required",
                    })}
                  />
                  <button
                    className="rounded-end bg-blue-color py-2 px-3 font-12 border-blue montserrat-regular text-white"
                    type="button"
                    id="button-addon2"
                    disabled={Loading}
                    onClick={() => HandleGentLink()}
                  >
                    {Loading ? "Link Genrating..." : "Auto Generate Link"}
                  </button>
                </div>
                {errors.invite_link && (
                  <p className="text-danger">{errors.invite_link.message}</p>
                )}

                {/* Referrer’s Reward Section */}
                <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                  Referrer’s Reward
                </p>

                {/* Reward Type */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label font-12 montserrat-medium text-blue-color">
                    Reward Type
                  </label>
                  <select
                    className="form-select text-blue-color rounded-3 border-0 py-2"
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
                  <label className="form-label font-12 montserrat-medium text-border-gray-color">
                    Reward Value
                  </label>
                  <input
                    type="text"
                    placeholder="Select one"
                    className="form-control text-blue-color rounded-3 border-0 py-2"
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
                <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                  Referree’s Reward
                </p>

                {/* Reward Type */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label font-12 montserrat-medium text-blue-color">
                    Reward Type
                  </label>
                  <select
                    className="form-select text-blue-color rounded-3 border-0 py-2"
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
                  <label className="form-label font-12 montserrat-medium text-border-gray-color">
                    Reward Value
                  </label>
                  <input
                    type="text"
                    placeholder="Select one"
                    className="form-control text-blue-color rounded-3 border-0 py-2"
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
                <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                  Reward Condition
                </p>
                <div className="col-lg-12 mb-3">
                  <label className="form-label font-12 montserrat-medium text-blue-color">
                    Reward Condition
                  </label>
                  <select
                    className="form-select text-blue-color rounded-3 border-0 py-2"
                    aria-label="Default select example"
                    {...register("reward_condition", {
                      required: "Reward Condition is required",
                    })}
                  >
                    <option value="">Select one</option>
                    <option value="On Sign up">On Sign up</option>
                    <option value="On 10 referrals">On 10 referrals</option>
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
                {/* <div className="col-lg-12 mb-3">
                  <label className="form-label font-12 montserrat-medium text-blue-color">
                    What Referrrer will get on successfully completing the
                    condition
                  </label>
                  <select
                    className="form-select text-blue-color rounded-3 border-0 py-2"
                    aria-label="Default select example"
                    {...register("success_reward", {
                      required: "This field is required",
                    })}
                  >
                    <option value="">Select one</option>
                    <option value="X % Discount on particular product">
                      X % Discount on particular product
                    </option>
                    <option value="Early access to a sale or product drop">
                      Early access to a sale or product drop
                    </option>
                    <option value="Double reward points">
                      Double reward points
                    </option>
                    <option value="Free upgrade to a premium plan">
                      Free upgrade to a premium plan
                    </option>
                    <option value="Custom">Custom</option>
                  </select>
                  {errors.success_reward && (
                    <p className="text-danger">
                      {errors.success_reward.message}
                    </p>
                  )}
                </div> */}
              </div>

              <hr />
              <hr />
              <div className="col-lg-12">
                <h2 className="text-center"> SHARE FORM</h2>

                <div className="bg-white border-radius-16 p-4">
                  {/* Share directly via */}
                  <div className="mb-3">
                    <label className="font-18 montserrat-semibold text-border-gray-color mb-0">
                      Share directly via
                    </label>
                    <p className="text-blue-color font-12 montserrat-medium">
                      Choose a primary option to directly share the invite
                      through social media
                    </p>
                    <div className="d-flex align-items-center gap-3">
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
                          {Object.entries(platformIcons).map(([name, icon]) => (
                            <Dropdown.Item
                              key={name}
                              eventKey={name}
                              className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                            >
                              <span>{name}</span>
                              {icon}
                            </Dropdown.Item>
                          ))}
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
                  </div>
                  {/* </form> */}

                  <div className="mb-3 border-bottom pb-3">
                    <label className="form-label font-12 montserrat-medium text-blue-color">
                      Message with invite
                    </label>
                    <textarea
                      class="form-control login-input rounded-3 border-0 py-2"
                      rows="2"
                      {...register("primary_platform")}
                    ></textarea>
                  </div>

                  {/* Add other platforms */}
                  <div className="mb-3">
                    <label className="form-label font-18 montserrat-semibold text-border-gray-color">
                      Add other platforms
                    </label>
                    <p className="text-blue-color font-12 montserrat-medium">
                      Choose additional platforms you want to share the invite
                      through social media
                    </p>
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
                          {Object.entries(platformIcons).map(([name, icon]) => (
                            <Dropdown.Item
                              key={name}
                              eventKey={name}
                              className="d-flex justify-content-between align-items-center border-bottom text-blue-color font-14 montserrat-medium px-3 py-2"
                            >
                              <span>{name}</span>
                              {icon}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {platforms.map((platform) => (
                        <div
                          className="position-relative mx-2 text-blue-color"
                          key={platform}
                        >
                          {console.log("platform: ", platform)}
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
                  <div className="mb-3">
                    <label className="form-label font-12 montserrat-medium text-blue-color">
                      Message with{" "}
                      <span className="montserrat-semibold">FACEBOOK</span>{" "}
                      invite
                    </label>
                    <textarea
                      class="form-control login-input rounded-3 border-0 py-2"
                      rows="2"
                      {...register("fb")}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-12 montserrat-medium text-blue-color">
                      Message with{" "}
                      <span className="montserrat-semibold">INSTAGRAM</span>{" "}
                      invite
                    </label>
                    <textarea
                      class="form-control login-input rounded-3 border-0 py-2"
                      rows="2"
                      {...register("insta")}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-12 montserrat-medium text-blue-color">
                      Message with{" "}
                      <span className="montserrat-semibold">YOUTUBE</span>{" "}
                      invite
                    </label>
                    <textarea
                      class="form-control login-input rounded-3 border-0 py-2"
                      rows="2"
                      {...register("yt")}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-12 montserrat-medium text-blue-color">
                      Message with{" "}
                      <span className="montserrat-semibold">TWITTER</span>{" "}
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
            </div>
            <hr />
            <hr />

            {/* Reward Form */}
            <div className="reward-form row background-light-color border-radius-16 p-4">
              <h2 className="text-center"> REWARD FORM</h2>

              <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                Referrer Rewards
              </p>

              {/* Reward Type */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-blue-color">
                  Reward Type
                </label>
                <select
                  className="form-select text-blue-color rounded-3 border-0 py-2"
                  aria-label="Default select example"
                  {...register("refer_reward_type", {
                    required: " Reward Type is required",
                  })}
                >
                  <option value="">Select one</option>
                  <option value="Meteor">Meteor</option>
                  <option value="Star">Star</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.refer_reward_type && (
                  <p className="text-danger">
                    {errors.refer_reward_type.message}
                  </p>
                )}
              </div>

              {/* Reward Value */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-border-gray-color">
                  Reward Value
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control text-blue-color rounded-3 border-0 py-2"
                  {...register("refer_reward", {
                    required: "Reward Value is required",
                  })}
                />
                {errors.refer_reward && (
                  <p className="text-danger">{errors.refer_reward.message}</p>
                )}
              </div>
              <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                Invitee Rewards
              </p>

              {/* Reward Type */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-blue-color">
                  Invitee Type
                </label>
                <select
                  className="form-select text-blue-color rounded-3 border-0 py-2"
                  aria-label="Default select example"
                  {...register("invitee_reward_type", {
                    required: " Reward Type is required",
                  })}
                >
                  <option value="">Select one</option>
                  <option value="Meteor">Meteor</option>
                  <option value="Star">Star</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.invitee_reward_type && (
                  <p className="text-danger">
                    {errors.invitee_reward_type.message}
                  </p>
                )}
              </div>

              {/* Reward Value */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-border-gray-color">
                  Invitee Value
                </label>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control text-blue-color rounded-3 border-0 py-2"
                  {...register("invitee_reward", {
                    required: "Reward Value is required",
                  })}
                />
                {errors.invitee_reward && (
                  <p className="text-danger">{errors.invitee_reward.message}</p>
                )}
              </div>

              {/* Set Conversion Rates */}
              <div>
                <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                  Set Conversion rates
                </p>
                <p className="text-blue-color font-12 montserrat-medium">
                  Define how users can convert their meteors into stars and then
                  into rewards
                </p>

                <div className="row">
                  <div className="col-lg-12 d-flex align-items-center my-2">
                    <div className="">
                      <input
                        className="form-control border-radiu-8 font-14 py-2 border-0"
                        placeholder="For every X Meteor"
                        type="number"
                        name=""
                        id=""
                        {...register("meteor", {
                          required: "meteor is required",
                        })}
                      />
                      {errors.meteor && (
                        <p className="text-danger">{errors.meteor.message}</p>
                      )}
                    </div>
                    <span className="mx-3">=</span>
                    <div>
                      <input
                        className="form-control border-radiu-8 font-14 py-2 border-0"
                        placeholder="Y Star"
                        type="number"
                        name=""
                        id=""
                        {...register("y_star", {
                          required: "y_star is required",
                        })}
                      />
                      {errors.y_star && (
                        <p className="text-danger">{errors.y_star.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex align-items-center my-2">
                    <div>
                      <input
                        className="form-control  border-radiu-8 font-14 py-2 border-0"
                        placeholder="For every Y Star"
                        type="number"
                        name=""
                        id=""
                        {...register("star", {
                          required: "star is required",
                        })}
                      />
                      {errors.star && (
                        <p className="text-danger">{errors.star.message}</p>
                      )}
                    </div>
                    <span className="mx-3">=</span>
                    <div>
                      <input
                        className="form-control  border-radiu-8 font-14 py-2 border-0"
                        placeholder="ABC Points/Currency"
                        type="number"
                        name=""
                        id=""
                        {...register("point", {
                          required: "point is required",
                        })}
                      />
                      {errors.point && (
                        <p className="text-danger">{errors.point.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <hr />
            {/* bonus form */}
            <div className="row bonus-form background-light-color border-radius-16 p-4">
              <h2 className="text-center">BONUS FORM</h2>

              {/* Referrer’s Reward Section */}
              <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                Login Rewards
              </p>

              {/* Reward Type */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-blue-color">
                  Reward Type
                </label>
                <select
                  className="form-select text-blue-color rounded-3 border-0 py-2"
                  aria-label="Default select example"
                  {...register("login_reward_type", {
                    required: "Login Reward Type is required",
                  })}
                >
                  <option value="">Select one</option>
                  <option value="Meteor">Meteor</option>
                  <option value="Star">Star</option>
                  <option value="Cash">Cash</option>
                  <option value="Custom">Custom</option>
                </select>
                {errors.login_reward_type && (
                  <p className="text-danger">
                    {errors.login_reward_type.message}
                  </p>
                )}
              </div>

              {/* Reward Value */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-border-gray-color">
                  Reward Value
                </label>
                <input
                  type="text"
                  placeholder="Select one"
                  className="form-control text-blue-color rounded-3 border-0 py-2"
                  {...register("login_reward_value", {
                    required: "Reward Value is required",
                  })}
                />
                {errors.login_reward_value && (
                  <p className="text-danger">
                    {errors.login_reward_value.message}
                  </p>
                )}
              </div>

              {/* Referree’s Reward */}
              <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                Sign Up Reward
              </p>

              {/* Reward Type */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-blue-color">
                  Reward Type
                </label>
                <select
                  className="form-select text-blue-color rounded-3 border-0 py-2"
                  aria-label="Default select example"
                  {...register("signup_reward_type", {
                    required: "Reward Type is required",
                  })}
                >
                  <option value="">Select one</option>
                  <option value="Meteor">Meteor</option>
                  <option value="Star">Star</option>
                  <option value="Cash">Cash</option>
                  <option value="Custom">Custom</option>
                </select>
                {errors.signup_reward_type && (
                  <p className="text-danger">
                    {errors.signup_reward_type.message}
                  </p>
                )}
              </div>

              {/* Reward Value */}
              <div className="col-lg-6 mb-3">
                <label className="form-label font-12 montserrat-medium text-border-gray-color">
                  Reward Value
                </label>
                <input
                  type="text"
                  placeholder="Select one"
                  className="form-control text-blue-color rounded-3 border-0 py-2"
                  {...register("signup_reward_value", {
                    required: "Reward Value is required",
                  })}
                />
                {errors.signup_reward_value && (
                  <p className="text-danger">
                    {errors.signup_reward_value.message}
                  </p>
                )}
              </div>
            </div>

            <hr />
            <hr />
            {/* Galaxy Form */}
            <div className="galaxy-section background-light-color border-radius-16 p-4">
              <h2 className="text-center">GALAXY FORM</h2>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={handleSelect}
              >
                <option selected>Open this select menu</option>
                <option value="Milky Way Galaxy"> Milky Way Galaxy</option>
                <option value="Andromeda Galaxy"> Andromeda Galaxy</option>
                <option value="Bear Paw Galaxy"> Bear Paw Galaxy</option>
                <option value="Blinked Galaxy"> Blinked Galaxy</option>
                <option value="Fireworks Galaxy"> Fireworks Galaxy</option>
              </select>
              <div className="galaxy-form row">
                <div className="col-lg-12">
                  <h5 className="mt-3">Edit Galaxy Form</h5>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label font-14 montserrat-regular text-border-gray-color">
                      Galaxy Title
                    </label>
                    <input
                      type="text"
                      value={selectedGalaxy}
                      className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                      {...register("galaxy", {
                        required: "Galaxy Title is required",
                      })}
                    />
                    {/* {errors.galaxy && (
                      <div className="text-danger">{errors.galaxy.message}</div>
                    )} */}
                  </div>

                  <label className="form-label font-14 montserrat-regular text-border-gray-color">
                    Highest Galaxy Reward
                  </label>
                  <div className="col-lg-12 mb-3">
                    <input
                      type="text"
                      placeholder="X Meteors"
                      className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                      {...register("galaxyReward")}
                    />
                    {/* {errors.galaxyReward && (
                      <div className="text-danger">
                        {errors.galaxyReward.message}
                      </div>
                    )} */}
                  </div>
                  <div className="col-lg-12 mb-3">
                    <input
                      type="text"
                      placeholder="Y Stars"
                      className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                      {...register("galaxystar")}
                    />
                    {/* {errors.galaxystar && (
                      <div className="text-danger">
                        {errors.galaxystar.message}
                      </div>
                    )} */}
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label font-14 montserrat-regular text-border-gray-color">
                      No of Milestones (levels inside)
                    </label>
                    <select
                      class="form-select login-input text-border-gray-color"
                      aria-label="Default select example"
                      {...register("newmilestone")}
                    >
                      <option selected>Choose the numbers</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* MileStone Form */}
              {Array.from({ length: Number(NoMileStone) })?.map(
                (item, index) => (
                  <div className="milestone-form row">
                    <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                      Milestone {index + 1}
                    </p>
                    <p className="text-blue-color font-12 montserrat-medium">
                      This is the first milestone/ Level of the reward and
                      referral program
                    </p>

                    {/* Milestone Title */}
                    <div className="col-lg-12 mb-3">
                      <label
                        htmlFor="milestoneTitle"
                        className="form-label font-14 montserrat-regular text-border-gray-color"
                      >
                        Milestone Title
                      </label>
                      <input
                        id="milestoneTitle"
                        {...register(`milestoneTitle${index + 1}`, {
                          required: "Milestone Title is required",
                        })}
                        type="text"
                        className="form-control login-input border-0"
                      />
                      {/* {errors.milestoneTitle && (
                        <p className="text-danger">
                          {errors.milestoneTitle.message}
                        </p>
                      )} */}
                    </div>

                    {/* Milestone Reward */}
                    <div className="col-lg-6 mb-3">
                      <label
                        htmlFor="milestoneReward"
                        className="form-label font-14 montserrat-regular text-border-gray-color"
                      >
                        Milestone Reward
                      </label>
                      <input
                        id="milestoneReward"
                        {...register(`milestoneReward${index + 1}`, {
                          required: "Milestone Reward is required",
                        })}
                        type="text"
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
                        {...register(`meteorsRequired${index + 1}`, {
                          required: "Meteors required is required",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Please enter a valid number",
                          },
                        })}
                        type="text"
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
                        {...register(`milestoneDescription${index + 1}`)}
                        className="form-control login-input border-0"
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                )
              )}
              <hr />
              <hr />
              {/* Buttons */}
              <div className="d-flex align-items-center justify-content-between mt-3 gap-3">
                <button
                  className="border-0 rounded my-3 bg-blue-color py-2 px-3 font-16  montserrat-semibold text-white"
                  btn_title="Save Changes"
                  type="submit"
                >
                  Submit Form
                </button>
              </div>
              <hr />
            </div>
          </form>
          <div className="background-light-color border-radius-16 p-4">
            <div className="col-lg-12">
              <form onSubmit={handleSubmitAddGalaxy(onAddGalaxySubmit)}>
                <h5 className="mt-3">Add Galaxy Form</h5>

                {/* Galaxy Title */}
                <div className="col-lg-12 mb-3">
                  <label className="form-label font-14 montserrat-regular text-border-gray-color">
                    Galaxy Title
                  </label>
                  <input
                    type="text"
                    className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                    {...registerAddGalaxy("addgalaxy", {
                      required: "Galaxy Title is required",
                    })}
                  />
                  {errorsAddGalaxy.addgalaxy && (
                    <div className="text-danger">
                      {errorsAddGalaxy.addgalaxy.message}
                    </div>
                  )}
                </div>

                {/* Highest Galaxy Reward */}
                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                  Highest Galaxy Reward
                </label>
                <div className="col-lg-12 mb-3">
                  <input
                    type="text"
                    placeholder="X Meteors"
                    className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                    {...registerAddGalaxy("addgalaxyReward")}
                  />
                  {errorsAddGalaxy.addgalaxyReward && (
                    <div className="text-danger">
                      {errorsAddGalaxy.addgalaxyReward.message}
                    </div>
                  )}
                </div>

                {/* Galaxy Stars */}
                <div className="col-lg-12 mb-3">
                  <input
                    type="text"
                    placeholder="Y Stars"
                    className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                    {...registerAddGalaxy("addgalaxystar")}
                  />
                  {errorsAddGalaxy.addgalaxystar && (
                    <div className="text-danger">
                      {errorsAddGalaxy.addgalaxystar.message}
                    </div>
                  )}
                </div>

                {/* No of Milestones */}
                <div className="col-lg-12">
                  <label className="form-label font-14 montserrat-regular text-border-gray-color">
                    No of Milestones (levels inside)
                  </label>
                  <select
                    {...registerAddGalaxy("addnewmilestone")}
                    className="form-select login-input text-border-gray-color"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose the numbers
                    </option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                  </select>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="border-0 rounded my-3 bg-primary py-2 px-3 font-14  montserrat-regular text-white"
                >
                  Add Galaxy
                </button>
                {/* MileStone Form */}
                {Array.from({ length: Number(NewMilestone) })?.map(
                  (item, index) => (
                    <div className="milestone-form row">
                      <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                        Milestone {index + 1}
                      </p>
                      <p className="text-blue-color font-12 montserrat-medium">
                        This is the first milestone/ Level of the reward and
                        referral program
                      </p>

                      {/* Milestone Title */}
                      <div className="col-lg-12 mb-3">
                        <label
                          htmlFor="milestoneTitle"
                          className="form-label font-14 montserrat-regular text-border-gray-color"
                        >
                          Milestone Title
                        </label>
                        <input
                          id="milestoneTitle"
                          {...register(`milestoneTitle${index + 1}`, {
                            required: "Milestone Title is required",
                          })}
                          type="text"
                          className="form-control login-input border-0"
                        />
                        {/* {errors.milestoneTitle && (
                            <p className="text-danger">
                              {errors.milestoneTitle.message}
                            </p>
                          )} */}
                      </div>

                      {/* Milestone Reward */}
                      <div className="col-lg-6 mb-3">
                        <label
                          htmlFor="milestoneReward"
                          className="form-label font-14 montserrat-regular text-border-gray-color"
                        >
                          Milestone Reward
                        </label>
                        <input
                          id="milestoneReward"
                          {...register(`milestoneReward${index + 1}`, {
                            required: "Milestone Reward is required",
                          })}
                          type="text"
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
                          {...register(`meteorsRequired${index + 1}`, {
                            required: "Meteors required is required",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Please enter a valid number",
                            },
                          })}
                          type="text"
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
                          {...register(`milestoneDescription${index + 1}`)}
                          className="form-control login-input border-0"
                          rows={3}
                        ></textarea>
                      </div>
                    </div>
                  )
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainForm;
