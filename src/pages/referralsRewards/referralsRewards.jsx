import React, { useRef, useState } from "react";
import NavBar from "../../components/navbar";
import { Nav } from "react-bootstrap";
import {
  IoIosArrowForward,
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoTwitter,
  IoIosArrowDown,
} from "react-icons/io";
import { Dropdown } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import {
  PiExport,
  PiFadersHorizontal,
  PiPencilSimple,
  PiUploadSimpleBold,
} from "react-icons/pi";
import { GrAttachment } from "react-icons/gr";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
// import { BsArrowsAngleExpand } from 'react-icons/bs';
import { CgArrowsExpandRight } from "react-icons/cg";
import EarningsTable from "../../components/earningsTable";
import Button from "../../components/button";

// Import Images
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";



const ReferralsRewards = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [primaryShare, setPrimaryShare] = useState("WhatsApp");
  const [platforms, setPlatforms] = useState([
    "Facebook",
    "Instagram",
    "YouTube",
    "Twitter",
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const {
    register: registerSpecial,
    handleSubmit: handleSubmitSpecial,
    formState: { errors: errorsSpecial, isSubmitting: isSpecialSubmitting },
    watch: watchSpecial,
  } = useForm();
  const {
    register: registerShare,
    handleSubmit: handleSubmitShare,
    formState: { errors: errorsShare, isSubmitting: isShareSubmitting },
    watch: watchShare,
  } = useForm();
  const {
    register: registerReward,
    handleSubmit: handleSubmitReward,
    formState: { errors: errorsReward, isSubmitting: isRewardSubmitting },
    watch: watchReward,
  } = useForm();
  const {
    register: registerGalaxy,
    handleSubmit: handleSubmitGalaxy,
    setValue: setGalaxyValue,
    formState: { errors: errorsGalaxy, isSubmitting: isGalaxySubmitting },
    watch: watchGalaxy,
  } = useForm();
    const {
    register: registerNewGalaxy,
    handleSubmit: handleSubmitNewGalaxy,
    setValue: setNewGalaxyValue,
    formState: { errors: errorsNewGalaxy, isSubmitting: isNewGalaxySubmitting },
    watch: watchNewGalaxy,
  } = useForm();

  const GetAdminUid = sessionStorage.getItem("Auth");

  // Add Icons
  const platformIcons = {
    WhatsApp: <IoLogoWhatsapp size={25} />,
    Facebook: <IoLogoFacebook size={25} />,
    Instagram: <IoLogoInstagram size={25} />,
    YouTube: <IoLogoYoutube size={25} />,
    Twitter: <IoLogoTwitter size={25} />,
  };

  //  Remove Social Icons function
  const removePlatform = (platform) => {
    setPlatforms(platforms.filter((p) => p !== platform));
  };
  const [primarySelected, setPrimarySelected] = useState("Choose one");
  const [otherSelected, setOtherSelected] = useState("Choose one");
  const [selectedGalaxy, setSelectedGalaxy] = useState("Milky Way Galaxy");

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

  
  const handleSelect = (eventKey) => {
    setSelectedGalaxy(eventKey);
    setGalaxyValue("galaxyTitle", eventKey);
  };

  // ======================
  // API FUNCTIONALITY
  // ======================

  const [Loading, setLoading] = useState(false);

  const StartDate = watchSpecial("start_date");
  const EndDate = watchSpecial("end_date");

  const HandleGentLink = async () => {
    setLoading(true);
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.access_token,
        log_alt: getAuth?.session_id,
        start_date: new Date(StartDate)?.toLocaleDateString("en-GB"),
        expiry_date: new Date(EndDate)?.toLocaleDateString("en-GB"),
      };
      const response = await postData("/generate-link", payload);
      if (response?.success) {
        toastSuccess(response?.message);
        setValue("invite_link", response?.link);
        setValue("active", response?.active);
      }
      setLoading(false);
    } catch (error) {
      toastError(error?.error);
      setLoading(false);
    }
  };

  const onsubmit = async (data) => {
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

  const HandleShareForm = async (data) => {
    setLoading(true);
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.access_token,
        log_alt: getAuth?.session_id,
        primary_platform: primaryShare,
        platforms: [
          { platform: "FACEBOOK", message: data?.fb },
          { platform: "INSTAGRAM", message: data?.insta },
          { platform: "YOUTUBE", message: data?.yt },
          { platform: "TWITTER", message: data?.tw },
        ],
      };
      const response = await postData("/admin/sharing-apps", payload);
      if (response?.success) {
        toastSuccess(response?.message);
      }
      setLoading(false);
    } catch (error) {
      toastError(error?.error);
      setLoading(false);
    }
  };
  const HandleRewardForm = async (data) => {
    console.log("data: ", data);
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

  const HandleGalaxyForm = async (data) => {
    try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.access_token,
        log_alt: getAuth?.session_id,
        galaxy_name: data?.galaxyTitle,
        highest_reward: data?.galaxyReward,
        total_milestones: Number(data?.milestone),
        stars: Number(data?.star),
      };
      const response = await postData("/admin/add-new-galaxy", payload);

      if (response?.success) {
        toastSuccess(response?.message);
      }
      setLoading(false);
    } catch (error) {
      toastError(error?.message);
      setLoading(false);
    }
  };
  const HandleGalaxyNewForm =async(data)=>{
        try {
      const getAuth = await postData("/admin/auths", {
        admin_uid: GetAdminUid,
      });
      const payload = {
        admin_uid: GetAdminUid,
        mode: getAuth?.access_token,
        log_alt: getAuth?.session_id,
        galaxy_name: data?.galaxy,
        highest_reward: data?.galaxyReward,
        total_milestones: Number(data?.newmilestone),
        stars: Number(data?.galaxystar),
      };
      const response = await postData("/admin/add-new-galaxy", payload);

      if (response?.success) {
        toastSuccess(response?.message);
      }
      setLoading(false);
    } catch (error) {
      toastError(error?.message);
      setLoading(false);
    }

  }
  return (
    <>
      <NavBar />
      <div className="bg-light-blue-color py-5 min-vh-100">
        <div className="container">
          <div>
            <p className="mb-0 text-blue-color montserrat-semibold font-24">
              Referrals & Rewards
            </p>
            <p className="mb-0 text-blue-color montserrat-medium font-12">
              All rewards, exciting prizes and etc
            </p>
          </div>
        </div>

        <div className="nav-tab-bg">
          <Nav
            className="mt-4 container"
            activeKey={activeTab}
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="tab1"
                className="font-24 montserrat-semibold text-border-gray-color"
              >
                Refer <IoIosArrowForward className="mx-4" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="tab2"
                className="font-24 montserrat-semibold text-border-gray-color"
              >
                Rewards <IoIosArrowForward className="mx-4" />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="container p-lg-4">
          {/* Tab Content */}
          {/* tab 1 (Refer) Start Here */}
          {activeTab === "tab1" && (
            <div className="row gy-3 mt-3">
              <div className="col-lg-7">
                <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                  Generate a special link
                </p>
                <p className="text-blue-color font-12 montserrat-medium">
                  Select a start date and an end date to generate unique link
                  for every user
                </p>

                <form className="row" onSubmit={handleSubmitSpecial(onsubmit)}>
                  {/* Start Date */}
                  <div className="col-lg-6 mb-3">
                    <input
                      type="date"
                      placeholder="Start Date"
                      className="form-control text-blue-color rounded-3 border-0 py-2"
                      {...registerSpecial("start_date", {
                        required: "Start Date is required",
                      })}
                      defaultValue={new Date().toISOString().split("T")[0]}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errorsSpecial.start_date && (
                      <p className="text-danger">
                        {errorsSpecial.start_date.message}
                      </p>
                    )}
                  </div>

                  {/* End Date */}
                  <div className="col-lg-6 mb-3">
                    <input
                      type="date"
                      placeholder="End Date"
                      className="form-control text-blue-color rounded-3 border-0 py-2"
                      {...registerSpecial("end_date", {
                        required: "End Date is required",
                      })}
                      min={
                        new Date(Date.now() + 86400000)
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                    {errorsSpecial.end_date && (
                      <p className="text-danger">
                        {errorsSpecial.end_date.message}
                      </p>
                    )}
                  </div>

                  {/* Generate a Link */}
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control py-3 border-radiu-8 font-14 border-0"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      {...registerSpecial("invite_link", {
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
                  {errorsSpecial.invite_link && (
                    <p className="text-danger">
                      {errorsSpecial.invite_link.message}
                    </p>
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
                      {...registerSpecial("referrer_reward_type", {
                        required: "Reward Type is required",
                      })}
                    >
                      <option value="">Select one</option>
                      <option value="Meteor">Meteor</option>
                      <option value="Star">Star</option>
                      <option value="Cash">Cash</option>
                      <option value="Custom">Custom</option>
                    </select>
                    {errorsSpecial.referrer_reward_type && (
                      <p className="text-danger">
                        {errorsSpecial.referrer_reward_type.message}
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
                      {...registerSpecial("referrer_reward_value", {
                        required: "Reward Value is required",
                      })}
                    />
                    {errorsSpecial.referrer_reward_value && (
                      <p className="text-danger">
                        {errorsSpecial.referrer_reward_value.message}
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
                      {...registerSpecial("referee_reward_type", {
                        required: "Reward Type is required",
                      })}
                    >
                      <option value="">Select one</option>
                      <option value="Meteor">Meteor</option>
                      <option value="Star">Star</option>
                      <option value="Cash">Cash</option>
                      <option value="Custom">Custom</option>
                    </select>
                    {errorsSpecial.referee_reward_type && (
                      <p className="text-danger">
                        {errorsSpecial.referee_reward_type.message}
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
                      {...registerSpecial("referee_reward_value", {
                        required: "Reward Value is required",
                      })}
                    />
                    {errorsSpecial.referee_reward_value && (
                      <p className="text-danger">
                        {errorsSpecial.referee_reward_value.message}
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
                      {...registerSpecial("reward_condition", {
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
                    {errorsSpecial.reward_condition && (
                      <p className="text-danger">
                        {errorsSpecial.reward_condition.message}
                      </p>
                    )}
                  </div>

                  {/* What Referrer will get */}
                  <div className="col-lg-12 mb-3">
                    <label className="form-label font-12 montserrat-medium text-blue-color">
                      What Referrrer will get on successfully completing the
                      condition
                    </label>
                    <select
                      className="form-select text-blue-color rounded-3 border-0 py-2"
                      aria-label="Default select example"
                      {...registerSpecial("success_reward", {
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
                    {errorsSpecial.success_reward && (
                      <p className="text-danger">
                        {errorsSpecial.success_reward.message}
                      </p>
                    )}
                  </div>

                  {/* Save Button */}
                  <div className="col-6">
                    <Button
                      btn_class={"text-white px-5 bg-blue-color border-0 mt-3"}
                      disabled={isSpecialSubmitting}
                      btn_title={
                        isSpecialSubmitting ? "Sending..." : "Save Changes"
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="col-lg-5">
                <form onSubmit={handleSubmitShare(HandleShareForm)}>
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
                    </div>
                    {/* </form> */}

                    <div className="mb-3 border-bottom pb-3">
                      <label className="form-label font-12 montserrat-medium text-blue-color">
                        Message with invite
                      </label>
                      <textarea
                        class="form-control login-input rounded-3 border-0 py-2"
                        rows="2"
                        {...registerShare("primary_platform")}
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
                        {...registerShare("fb")}
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
                        {...registerShare("insta")}
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
                        {...registerShare("yt")}
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
                        {...registerShare("tw")}
                      ></textarea>
                    </div>
                    <div>
                      <Button
                        btn_class={
                          "text-white px-5 bg-blue-color border-0 mt-3"
                        }
                        btn_title={"Save Changes"}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tab 2 (Rewards) Content Start Here */}
          {activeTab === "tab2" && (
            <div className="row gy-3 mt-3">
              <div className="col-lg-7 scroll-section hide-scroll">
                <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                  Referrer Rewards{" "}
                </p>
                <p className="text-blue-color font-12 montserrat-medium">
                  What referrers get for successfully referring their friends{" "}
                </p>
                {/* Reward form Start Here */}
                <form onSubmit={handleSubmitReward(HandleRewardForm)}>
                  <div className="d-flex justify-content-between align-items-center">
                    <input
                      type="text"
                      className="form-control w-75 border-radiu-8 font-14 py-2 border-0"
                      {...registerReward("referrer", {
                        required: "referrer is required",
                      })}
                    />

                    <span className="reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center">
                      {" "}
                      <PiPencilSimple className="font-18" />
                    </span>
                    {/* Attach Icon & Hidden File Input */}
                    <span
                      className="reward-icon rounded-circle reward-attach-icon d-flex justify-content-center align-items-center"
                      onClick={() => referrerInputRef.current.click()}
                      style={{ cursor: "pointer" }}
                    >
                      <GrAttachment className="font-18" />
                    </span>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={referrerInputRef}
                      onChange={handleReferrerFileChange}
                      style={{ display: "none" }}
                    />

                    <span className="reward-icon rounded-circle reward-delete-icon d-flex justify-content-center align-items-center">
                      <RiDeleteBin7Line className="font-18" />
                    </span>
                  </div>
                  {errorsReward.referrer && (
                    <p className="text-danger">
                      {errorsReward.referrer.message}
                    </p>
                  )}
                  {/* Referrer image preview */}
                  {referrerImages.length > 0 && (
                    <div className="d-flex gap-3 flex-wrap mt-3">
                      {referrerImages.map((img) => (
                        <div key={img.id} className="position-relative">
                          <img
                            src={img.url}
                            alt="Uploaded"
                            className="border-radius-12"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                          <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-white border text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeReferrerImage(img.id)}
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3">
                    <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                      Invitee Rewards
                    </p>
                    <p className="text-blue-color font-12 montserrat-medium">
                      What do their friends get after they successfully receive
                      their invite
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        className="form-control w-75 border-radiu-8 font-14 py-2 border-0"
                        {...registerReward("reward", {
                          required: "reward is required",
                        })}
                      />

                      <span className="reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center">
                        {" "}
                        <PiPencilSimple className="font-18" />
                      </span>
                      <span className="reward-icon rounded-circle reward-attach-icon d-flex justify-content-center align-items-center">
                        <GrAttachment className="font-18" />
                      </span>
                      <span className="reward-icon rounded-circle reward-delete-icon d-flex justify-content-center align-items-center">
                        <RiDeleteBin7Line className="font-18" />
                      </span>
                    </div>
                  </div>
                  {errorsReward.reward && (
                    <p className="text-danger">{errorsReward.reward.message}</p>
                  )}
                  {/* Set Conversion Rates */}
                  <div>
                    <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                      Set Conversion rates
                    </p>
                    <p className="text-blue-color font-12 montserrat-medium">
                      Define how users can convert their meteors into stars and
                      then into rewards
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
                            {...registerReward("meteor", {
                              required: "meteor is required",
                            })}
                          />
                          {errorsReward.meteor && (
                            <p className="text-danger">
                              {errorsReward.meteor.message}
                            </p>
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
                            {...registerReward("y_star", {
                              required: "y_star is required",
                            })}
                          />
                          {errorsReward.y_star && (
                            <p className="text-danger">
                              {errorsReward.y_star.message}
                            </p>
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
                            {...registerReward("star", {
                              required: "star is required",
                            })}
                          />
                          {errorsReward.star && (
                            <p className="text-danger">
                              {errorsReward.star.message}
                            </p>
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
                            {...registerReward("point", {
                              required: "point is required",
                            })}
                          />
                          {errorsReward.point && (
                            <p className="text-danger">
                              {errorsReward.point.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    btn_class={"text-white px-5 bg-blue-color border-0 mt-5"}
                    type="submit"
                    btn_title={"Save Changes"}
                  />
                </form>

               
              </div>
              <div className="col-lg-5">
                <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                  Current Galaxy (Level)
                </p>
                <p className="text-blue-color font-12 montserrat-medium">
                  You can add and edit Galaxies. The milestones below are part
                  of this galaxy only
                </p>
                <div className="bg-white d-flex justify-content-between border-radius-12">
                  <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      variant="light"
                      className="milky-dropdown border-0 px-5 py-3"
                    >
                      <span className="text-blue-color">{selectedGalaxy}</span>
                      <IoIosArrowDown className="text-blue-color ms-3 font-20" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item eventKey="Milky Way Galaxy">
                        Milky Way Galaxy
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Andromeda Galaxy">
                        Andromeda Galaxy
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Bear Paw Galaxy">
                        Bear Paw Galaxy
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Blinked Galaxy">
                        Blinked Galaxy
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Fireworks Galaxy">
                        Fireworks Galaxy
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="d-flex justify-content-evenly gap-4 align-items-center me-4">
                    <span
                      className="reward-icon rounded-circle reward-edit-icon d-flex justify-content-center align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#emailUpdatesModal"
                    >
                      {" "}
                      <PiPencilSimple className="font-18" />
                    </span>
                    <span
                      className="reward-icon rounded-circle reward-plus-icon d-flex justify-content-center align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#addnewModalGalaxy"
                    >
                      {" "}
                      <GoPlus className="font-18" />
                    </span>
                  </div>

                  {/* Edit and Add Galaxy Modal */}
                  <div
                    className="modal fade"
                    id="emailUpdatesModal"
                    tabIndex="-1"
                    aria-labelledby="emailUpdatesModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content border-radius-16 p-3">
                        <div className="modal-header border-0 pb-0">
                          <h5
                            className="modal-title text-border-gray-color font-18 montserrat-semibold"
                            id="emailUpdatesModalLabel"
                          >
                            Create New Galaxy
                          </h5>
                          <button
                            type="button"
                            className="btn-close text-blue-color rounded-circle push-edit-icon"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body pt-0">
                          <p className="font-12 montserrat-medium text-blue-color">
                            This is the first milestone/ Level of the reward{" "}
                            <br /> and referral program
                          </p>
                          <form
                            className="row"
                            onSubmit={handleSubmitGalaxy(HandleGalaxyForm)}
                          >
                            <div className="col-lg-12 mb-3">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                Galaxy Title
                              </label>
                              <input
                                type="text"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                Value={selectedGalaxy}
                                {...registerGalaxy("galaxyTitle", {
                                  required: "Galaxy Title is required",
                                })}
                              />
                              {errors.galaxyTitle && (
                                <div className="text-danger">
                                  {errors.galaxyTitle.message}
                                </div>
                              )}
                            </div>

                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Highest Galaxy Reward
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                placeholder="X Meteors"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...registerGalaxy("galaxyReward")}
                              />
                              {errors.galaxyReward && (
                                <div className="text-danger">
                                  {errors.galaxyReward.message}
                                </div>
                              )}
                            </div>
                            <div className="col-lg-6 mb-3">
                              <input
                                type="text"
                                placeholder="Y Stars"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...registerGalaxy("star")}
                              />
                              {errors.star && (
                                <div className="text-danger">
                                  {errors.star.message}
                                </div>
                              )}
                            </div>
                            <div className="col-lg-12">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                No of Milestones (levels inside)
                              </label>
                              <select
                                class="form-select login-input text-border-gray-color"
                                aria-label="Default select example"
                                {...registerGalaxy("milestone")}
                              >
                                <option selected>Choose the numbers</option>
                                <option value="One">One</option>
                                <option value="Two">Two</option>
                                <option value="Three">Three</option>
                              </select>
                            </div>

                            <div className="d-flex justify-content-start align-items-center mt-4 gap-4">
                              {/* <Button
                                type="button"
                                btn_class={
                                  "border-blue bg-transparent text-blue-color w-100"
                                }
                                btn_title={"Create New"}
                              /> */}
                              <Button
                                type="submit"
                                btn_class={
                                  "text-white bg-blue-color border-0 w-100"
                                }
                                btn_title={"Save Changes"}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Edit and Add Galaxy Modal */}
                  <div
                    className="modal fade"
                    id="addnewModalGalaxy"
                    tabIndex="-1"
                    aria-labelledby="addnewModalGalaxyLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content border-radius-16 p-3">
                        <div className="modal-header border-0 pb-0">
                          <h5
                            className="modal-title text-border-gray-color font-18 montserrat-semibold"
                            id="addnewModalGalaxyLabel"
                          >
                            Create New Galaxy
                          </h5>
                          <button
                            type="button"
                            className="btn-close text-blue-color rounded-circle push-edit-icon"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body pt-0">
                          <p className="font-12 montserrat-medium text-blue-color">
                            This is the first milestone/ Level of the reward{" "}
                            <br /> and referral program
                          </p>
                          <form
                            className="row"
                            onSubmit={handleSubmitNewGalaxy(HandleGalaxyNewForm)}
                          >
                            <div className="col-lg-12 mb-3">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                Galaxy Title
                              </label>
                              <input
                                type="text"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...registerNewGalaxy("galaxy", {
                                  required: "Galaxy Title is required",
                                })}
                              />
                              {errorsNewGalaxy.galaxy && (
                                <div className="text-danger">
                                  {errorsNewGalaxy.galaxy.message}
                                </div>
                              )}
                            </div>

                            <label className="form-label font-14 montserrat-regular text-border-gray-color">
                              Highest Galaxy Reward
                            </label>
                            <div className="col-lg-6">
                              <input
                                type="text"
                                placeholder="X Meteors"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...registerNewGalaxy("galaxyReward")}
                              />
                              {errorsNewGalaxy.galaxyReward && (
                                <div className="text-danger">
                                  {errorsNewGalaxy.galaxyReward.message}
                                </div>
                              )}
                            </div>
                            <div className="col-lg-6 mb-3">
                              <input
                                type="text"
                                placeholder="Y Stars"
                                className="form-control login-input rounded-3 border-0 py-2 text-blue-color montserrat-medium"
                                {...registerNewGalaxy("galaxystar")}
                              />
                              {errorsNewGalaxy.galaxystar && (
                                <div className="text-danger">
                                  {errorsNewGalaxy.galaxystar.message}
                                </div>
                              )}
                            </div>
                            <div className="col-lg-12">
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                No of Milestones (levels inside)
                              </label>
                              <select
                                class="form-select login-input text-border-gray-color"
                                aria-label="Default select example"
                                {...registerNewGalaxy("newmilestone")}
                              >
                                <option selected>Choose the numbers</option>
                                <option value="One">One</option>
                                <option value="Two">Two</option>
                                <option value="Three">Three</option>
                              </select>
                            </div>

                            <div className="d-flex justify-content-start align-items-center mt-4 gap-4">
                              {/* <Button
                                type="button"
                                btn_class={
                                  "border-blue bg-transparent text-blue-color w-100"
                                }
                                btn_title={"Create New"}
                              /> */}
                              <Button
                                type="submit"
                                btn_class={
                                  "text-white bg-blue-color border-0 w-100"
                                }
                                btn_title={"Save Changes"}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-radius-16 border-purple mt-4">
                  <ul className="nav nav-tabs" id="milestoneTab" role="tablist">
                    <li className="nav-item border-0 w-50" role="presentation">
                      <button
                        className="nav-link border-0 py-3 tab-color milstone-tab1 font-16 montserrat-medium text-center active w-100"
                        id="edit-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#EditTab"
                        type="button"
                        role="tab"
                        aria-controls="EditTab"
                        aria-selected="true"
                      >
                        <PiPencilSimple className="font-20 me-2" /> Edit Email
                      </button>
                    </li>
                    <li className="nav-item w-50" role="presentation">
                      <button
                        className="nav-link border-0 py-3 tab-color milstone-tab2 font-16 montserrat-medium text-center w-100"
                        id="add-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#AddTab"
                        type="button"
                        role="tab"
                        aria-controls="AddTab"
                        aria-selected="false"
                      >
                        <GoPlus className="font-20 me-2" /> Milestone
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content p-3">
                    <div
                      className="tab-pane fade px-3 show active"
                      id="EditTab"
                      role="tabpanel"
                      aria-labelledby="edit-tab"
                    >
                      <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                        Milestone Email
                      </p>
                      <p className="text-blue-color font-12 montserrat-medium">
                        Edit the email the participant will receive when they
                        reach this milestone{" "}
                      </p>
                      <form className="row scroll-height ">
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-14 montserrat-regular text-border-gray-color">
                            From Name
                          </label>
                          <input
                            type="text"
                            className="form-control login-input rounded-3 border-0 py-2 "
                            {...register("name", {
                              required: "name is required",
                            })}
                          />
                          {errors.name && (
                            <div className="text-danger">
                              {errors.name.message}
                            </div>
                          )}
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-14 montserrat-regular text-border-gray-color">
                            From E-mail
                          </label>
                          <input
                            type="email"
                            className="form-control login-input rounded-3 border-0 py-2 "
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                              },
                            })}
                          />
                          {errors.email && (
                            <div className="text-danger">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-14 montserrat-regular text-border-gray-color">
                            Subject
                          </label>
                          <input
                            type="text"
                            className="form-control login-input rounded-3 border-0 py-2 "
                            {...register("subject")}
                          />
                          {errors.subject && (
                            <div className="text-danger">
                              {errors.subject.message}
                            </div>
                          )}
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-14 montserrat-regular text-border-gray-color">
                            Reply to
                          </label>
                          <input
                            type="text"
                            className="form-control login-input rounded-3 border-0 py-2 "
                            {...register("replyTo")}
                          />
                          {errors.replyTo && (
                            <div className="text-danger">
                              {errors.replyTo.message}
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="col-lg-12 mb-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Milestone Description
                          </label>
                          <textarea
                            class="form-control login-input border-0"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-14 montserrat-regular text-border-gray-color">
                            Button Text
                          </label>
                          <input
                            type="text"
                            className="form-control login-input rounded-3 border-0 py-2 "
                            {...register("buttonText")}
                          />
                          {errors.buttonText && (
                            <div className="text-danger">
                              {errors.buttonText.message}
                            </div>
                          )}
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label className="form-label font-14 montserrat-regular text-border-gray-color">
                            Button URL
                          </label>
                          <input
                            type="text"
                            className="form-control login-input rounded-3 border-0 py-2 "
                            {...register("buttonUrl")}
                          />
                          {errors.buttonUrl && (
                            <div className="text-danger">
                              {errors.buttonUrl.message}
                            </div>
                          )}
                        </div>
                        <hr />
                        <p className="font-14 montserrat-regular text-border-gray-color">
                          Upload a logo or header image related to your program.
                          Higher resolution look nicer but it will be resized to
                          maximum 600 px width
                        </p>
                        {/* Radio button */}
                        <div className="d-flex mb-3">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                            />
                            <label
                              class="form-check-label text-blue-color font-14 montserrat-medium"
                              for="inlineRadio1"
                            >
                              Header Image
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <label
                              class="form-check-label text-blue-color font-14 montserrat-medium"
                              for="inlineRadio2"
                            >
                              Logo
                            </label>
                          </div>
                        </div>

                        <div className="mb-3 col-lg-6">
                          <label class="upload-box d-flex text-center login-input bg-light-white-3-color p-2 rounded-3 text-blue-color font-12 montserrat-medium">
                            <div class="upload-icon">
                              <PiUploadSimpleBold className="font-16 me-3" />
                            </div>
                            Upload
                            <input type="file" id="formFile" />
                          </label>
                        </div>
                        <div className="d-flex justify-content-start mt-4 gap-4">
                          <Button
                            btn_class={
                              "border-blue bg-transparent text-blue-color mt-3 w-100 px-0"
                            }
                            btn_title={"Send a test mail"}
                          />
                          <Button
                            btn_class={
                              "text-white bg-blue-color border-0 mt-3 w-100"
                            }
                            btn_title={"Save & Send"}
                          />
                        </div>
                      </form>
                    </div>
                    {/* Add tab Content */}
                    <div
                      className="tab-pane fade ps-3"
                      id="AddTab"
                      role="tabpanel"
                      aria-labelledby="add-tab"
                    >
                      <form className="row scroll-height pe-5">
                        <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                          Milestone 1
                        </p>
                        <p className="text-blue-color font-12 montserrat-medium">
                          This is the first milestone/ Level of the reward and
                          referral program
                        </p>
                        <div class="col-lg-12 mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            class="form-control login-input border-0"
                            id="exampleFormControlInput1"
                          />
                        </div>
                        <div class="col-lg-6 mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Milestone Reward
                          </label>
                          <input
                            type="text"
                            class="form-control login-input border-0"
                          />
                        </div>
                        <div class="col-lg-6 mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Meteors required to unlock
                          </label>
                          <input
                            type="text"
                            class="form-control login-input border-0"
                          />
                        </div>
                        <div class="col-lg-12 mb-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Milestone Description
                          </label>
                          <textarea
                            class="form-control login-input border-0"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                        </div>
                        <hr />

                        <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                          Milestone 1
                        </p>
                        <p className="text-blue-color font-12 montserrat-medium">
                          This is the first milestone/ Level of the reward and
                          referral program
                        </p>
                        <div class="col-lg-12 mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            class="form-control login-input border-0"
                            id="exampleFormControlInput1"
                          />
                        </div>
                        <div class="col-lg-6 mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Milestone Reward
                          </label>
                          <input
                            type="text"
                            class="form-control login-input border-0"
                          />
                        </div>
                        <div class="col-lg-6 mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Meteors required to unlock
                          </label>
                          <input
                            type="text"
                            class="form-control login-input border-0"
                          />
                        </div>
                        <div class="col-lg-12 mb-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label font-14 montserrat-regular text-border-gray-color"
                          >
                            Milestone Description
                          </label>
                          <textarea
                            class="form-control login-input border-0"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mt-3 gap-3">
                          <Button
                            btn_class={
                              "border-blue bg-transparent text-blue-color w-100 px-0"
                            }
                            btn_title={"Add New Milestone"}
                          />
                          <Button
                            btn_class={
                              "text-white bg-blue-color border-0 w-100"
                            }
                            btn_title={"Save Changes"}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReferralsRewards;
