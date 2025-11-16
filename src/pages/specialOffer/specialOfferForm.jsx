import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";


// Componenets
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import NavBar from "../../components/navbar";

// React icon
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const SpecialOfferForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const adminUid = sessionStorage.getItem("Auth");
  const programId = sessionStorage.getItem("Prgid");

  // Watch Banner Toggle Switch
  const isBannerShown = watch("showBanner");

  // ----------------------------------------
  // SUBMIT HANDLER (API CALL)
  // ----------------------------------------
  const onSubmit = async (data) => {
    try {
      // First fetch admin auth details
      const auth = await postData("/admin/auths", { admin_uid: adminUid });

      // Prepare API Payload
      const payload = {
        admin_uid: adminUid,
        mode: auth?.mode,
        log_alt: auth?.log_alt,
        program_id: programId,
        offer_title: data.offerTitle,
        offer_desc: data.offerDescription,
        tag: data.occasionTag,
        start_date: new Date(data.startDate).toLocaleDateString("en-GB"),
        start_time: data.startTime,
        end_date: new Date(data.endDate).toLocaleDateString("en-GB"),
        end_time: data.endTime,
        code: data.offerCode,
        pop_up_text: data.popupContent,
        hide: data.showBanner,
      };

      // Save Offer
      const res = await postData("/admin/special-offer", payload);
      toastSuccess(res?.message);
    } catch (err) {
      toastError(err?.error);
    }
  };

  // ----------------------------------------
  // REUSABLE INPUT FIELD COMPONENT
  // ----------------------------------------
  const InputField = ({ label, name, type = "text", required }) => (
    <div className="col-lg-3 mb-3">
      {label && (
        <label className="form-label font-12 montserrat-medium text-blue-color">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder="Type here"
        className="form-control login-input rounded-3 font-14 montserrat-medium border-0 py-2"
        {...register(name, required && { required })}
      />
      {errors[name] && <p className="text-danger">{errors[name].message}</p>}
    </div>
  );

  // ----------------------------------------
  // JSX UI
  // ----------------------------------------
  return (
    <section className="bg-light-white-3-color min-vh-100">
      <NavBar />

      <div className="container mt-3 pb-5">
        {/* Back Button */}
        <NavLink to="/dashboard">
          <p className="text-blue-color font-14 montserrat-medium">
            <IoIosArrowBack className="font-16" /> Back
          </p>
        </NavLink>

        {/* Header Title + View All */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-blue-color font-24 montserrat-semibold mb-0">
              Add Special Offer
            </h2>
            <p className="text-blue-color font-12 montserrat-medium">
              Give your special offer a title that excites your users
            </p>
          </div>

          <div className="d-flex align-items-center">
            <span className="text-blue-color font-14 montserrat-medium me-2">
              View all special offers
            </span>
            <IoIosArrowForward className="text-blue-color font-20" />
          </div>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* -------------------- Banner Basic Details -------------------- */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Banner Basic Details
          </p>

          <div className="row">
            <InputField
              label="Offer Title"
              name="offerTitle"
              required="Offer title is required"
            />
            <InputField
              label="Offer Description"
              name="offerDescription"
              required="Description is required"
            />
            <InputField
              label="CTA Button"
              name="ctaButton"
              required="CTA Button is required"
            />
            <InputField label="Occasion/Tag (Optional)" name="occasionTag" />
          </div>

          {/* -------------------- Validity Section -------------------- */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Validity
          </p>

          <div className="row">
            <InputField label="Start Date" name="startDate" type="date" />
            <InputField label="Start Time" name="startTime" type="time" />
            <InputField label="End Date" name="endDate" type="date" />
            <InputField label="End Time" name="endTime" type="time" />
          </div>

          {/* -------------------- Create Code -------------------- */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Create Code
          </p>

          <div className="row align-items-center">
            {/* Offer Code */}
            <InputField name="offerCode" required="Code is required" />

            {/* Show/Hide Banner Switch */}
            <div className="col-lg-3 d-flex align-items-center">
              <label className="font-16 montserrat-semibold text-blue-color mb-0">
                <span
                  className={!isBannerShown ? "text-border-gray-color" : ""}
                >
                  Show
                </span>{" "}
                /{" "}
                <span className={isBannerShown ? "text-border-gray-color" : ""}>
                  Hide
                </span>{" "}
                banner
              </label>

              <div className="form-check form-switch mx-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  {...register("showBanner")}
                />
              </div>
            </div>
          </div>

          {/* -------------------- Pop Up Details -------------------- */}
          <p className="font-16 montserrat-semibold text-border-gray-color mt-2">
            Pop Up Details
          </p>

          <div className="row">
            <InputField label="Pop Up Content" name="popupContent" />
            <InputField label="Button Text" name="buttonText" />
          </div>

          {/* -------------------- Buttons -------------------- */}
          <button
            type="submit"
            className="px-5 py-2 rounded-5 border-0 text-white bg-purple-color font-14 montserrat-medium mt-3"
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
