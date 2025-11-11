import React from "react";
import { useForm } from "react-hook-form";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import NavBar from "../../components/navbar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

const SpecialOfferForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const GetAdminUid = sessionStorage.getItem("Auth");
  const ProgramId = sessionStorage.getItem("Prgid");

  const isBanShow = watch("showBanner");
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
        offer_title: data?.offerTitle,
        offer_desc: data?.offerDescription,
        tag: data?.occasionTag,
        start_date: new Date(data?.startDate)?.toLocaleDateString("en-GB"),
        start_time: data?.startTime,
        end_date: new Date(data?.endDate)?.toLocaleDateString("en-GB"),
        end_time: data?.endTime,
        code: data?.offerCode,
        pop_up_text: data?.popupContent,
        hide: data?.showBanner,
      };
      const response = await postData("/admin/special-offer", payload);
      toastSuccess(response?.message);
    } catch (error) {
      toastError(error?.error);
    }
  };

  return (
    <section className="bg-light-white-3-color min-vh-100">
      <NavBar />
      <div className="container mt-3 pb-5">
        {/* Header Section */}
       <NavLink to={"/dashboard"}>
         <p className="text-blue-color font-14 montserrat-medium"> <IoIosArrowBack className="font-16" />
          Back</p>
       </NavLink>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-blue-color font-24 montserrat-semibold mb-0">
              Add Special Offer
            </h2>
            <p className="text-blue-color font-12 montserrat-medium">
              Give your special offer a title that captures the occasion and
              excites your users
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="text-blue-color font-14 montserrat-medium me-2">
              View all special offers
            </span>
            <IoIosArrowForward className="text-blue-color font-20" />

          </div>
        </div>

        {/* Form Start */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Banner Basic Details */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Banner Basic Details
          </p>
          <div className="row mb-3">
            {/* Offer Title */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                Offer Title
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("offerTitle", {
                  required: "Offer title is required",
                })}
              />
              {errors.offerTitle && (
                <p className="text-danger">{errors.offerTitle.message}</p>
              )}
            </div>
            {/* Offer Description */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                Offer Description
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("offerDescription", {
                  required: "Description is required",
                })}
              />
              {errors.offerDescription && (
                <p className="text-danger">{errors.offerDescription.message}</p>
              )}
            </div>
            {/* CTA Button */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                CTA Button
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("ctaButton", {
                  required: "CTA Button is required",
                })}
              />
              {errors.ctaButton && (
                <p className="text-danger">{errors.ctaButton.message}</p>
              )}
            </div>
            {/* Occasion/Tag (Optional) */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                Occasion/Tag (Optional)
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("occasionTag")}
              />
            </div>
          </div>

          {/* Validity Section */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Validity
          </p>
          <div className="row mb-3">
            {/* Start Date */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                Start Date
              </label>
              <input
                type="date"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("startDate")}
              />
            </div>
            {/* Start Time */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                Start Time
              </label>
              <input
                type="time"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("startTime")}
              />
            </div>
            {/* End Date */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                End Date
              </label>
              <input
                type="date"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("endDate")}
              />
            </div>
            {/* End Time */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                End Time
              </label>
              <input
                type="time"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("endTime")}
              />
            </div>
          </div>

          {/* Create Code */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Create Code
          </p>
          <div className="row mb-3 align-items-center">
            {/* Code Input */}
            <div className="col-lg-3 mb-3">
              <input
                type="text"
                placeholder="Create code here"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("offerCode", { required: "Code is required" })}
              />
              {errors.offerCode && (
                <p className="text-danger">{errors.offerCode.message}</p>
              )}
            </div>
            {/* Show/Hide Banner Switch */}
            <div className="col-lg-3 mb-3 d-flex align-items-center">
              <label
                htmlFor="bannerSwitch"
                className="font-16 montserrat-semibold text-blue-color form-label mb-0"
              >
                <span
                  className={`${!isBanShow ? "text-border-gray-color" : ""}`}
                >
                  Show
                </span>{" "}
                /{" "}
                <span
                  className={`${isBanShow ? "text-border-gray-color" : ""}`}
                >
                  hide
                </span>{" "}
                the banner
              </label>
              <div className="form-check form-switch mx-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="bannerSwitch"
                  {...register("showBanner")}
                />
              </div>
            </div>
          </div>

          {/* Banner Pop Up Details */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Pop Up Details
          </p>
          <div className="row mb-3">
            {/* Pop Up Content */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                Pop Up Content
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("popupContent")}
              />
            </div>
            {/* Button Text */}
            <div className="col-lg-3 mb-3">
              <label className="form-label font-12 montserrat-medium text-blue-color">
                Button Text
              </label>
              <input
                type="text"
                placeholder="Give title"
                className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
                {...register("buttonText")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-5 py-2 rounded-5  border-0 text-white bg-purple-color font-14 montserrat-medium mt-3"
          >
            Save & Create
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-5 mx-4 border-purple text-purple-color bg-transparent font-14 montserrat-medium mt-3"
          >
            Create New
          </button>
        </form>
      </div>
    </section>
  );
};

export default SpecialOfferForm;
