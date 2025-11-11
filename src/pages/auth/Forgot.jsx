import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/Logo-img/wealth-Elite-Logo.svg";
import Button from "../../components/button";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate()

  const [step, setStep] = useState("email"); // email | otp | password
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  

  const onSubmit = async (data) => {
    try {
      if (step === "email") {
        setloading(true);
        const payload = { email: data?.email };
        const EmailResp = await postData("/admin/forgot-password", payload);
        if (EmailResp?.success) {
          toastSuccess(EmailResp?.message);
          setEmail(data.email);
          setStep("otp");
          setloading(false);
        }
      } else if (step === "otp") {
        setloading(true);
        const payload = { email: data?.email, code: data?.otp };
        const OtpResp = await postData("/admin/verify-otp", payload);
        if (OtpResp?.success) {
          toastSuccess(OtpResp?.message);
          setStep("password");
          setloading(false);
        }
      } else if (step === "password") {
        setloading(true);
        const payload = {
          email: data?.email,
          new_password: data?.newPassword,
          confirm_password: data?.confirmPassword,
        };
        const ResetResp = await postData("/admin/reset-password", payload);
        if (ResetResp?.success) {
          toastSuccess(ResetResp?.message);
          reset();
          setStep("email");
          setloading(false);
          navigate("/login")
        }
      }
    } catch (error) {
      if (error?.error) {
        toastError(error?.error);
      } else {
        toastError(error?.message);
      }
      setloading(false);
    }
  };

  return (
    <div className="bg-light-blue-color min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <img src={Logo} alt="Logo" />

      <div
        className="bg-white login-box border-radius-16 p-5 mt-4 shadow-sm"
        style={{ width: "100%", maxWidth: 420 }}
      >
        <p className="text-blue-color font-18 montserrat-semibold mb-0">
          {step === "email"
            ? "Forgot Password?"
            : step === "otp"
            ? "Verify OTP"
            : "Reset Password"}
        </p>

        <p className="text-border-gray-color font-12 montserrat-medium">
          {step === "email" &&
            "Enter your registered E-mail ID and we will send you a verification code"}
          {step === "otp" && `We’ve sent an OTP to ${email}`}
          {step === "password" && "Enter your new password below"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column h-75"
        >
          <div className="flex-grow-1">
            {step === "email" && (
              <div className="mb-4 mt-4">
                <label className="form-label font-14 montserrat-medium text-border-gray-color">
                  E-mail ID
                </label>
                <input
                  type="email"
                  className="form-control login-input rounded-3 border-0 py-2"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email.message}</div>
                )}
              </div>
            )}

            {step === "otp" && (
              <div className="mb-4 mt-4">
                <label className="form-label font-14 montserrat-medium text-border-gray-color">
                  OTP
                </label>
                <input
                  type="text"
                  className="form-control login-input rounded-3 border-0 py-2"
                  placeholder="Enter OTP"
                  {...register("otp", {
                    required: "OTP is required",
                  })}
                />
                {errors.otp && (
                  <div className="text-danger">{errors.otp.message}</div>
                )}
              </div>
            )}

            {step === "password" && (
              <>
                <div className="mb-3 mt-4">
                  <label className="form-label font-14 montserrat-medium text-border-gray-color">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control login-input rounded-3 border-0 py-2"
                    placeholder="Enter new password"
                    {...register("newPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <div className="text-danger">
                      {errors.newPassword.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label font-14 montserrat-medium text-border-gray-color">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control login-input rounded-3 border-0 py-2"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="text-danger">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* <button
                        type="submit"
                        className="montserrat-medium w-100 border-0 font-14 py-2 rounded-pill bg-blue-color text-white mt-4"
                    >
                        {step === 'email' && 'Send Verification Code'}
                        {step === 'otp' && 'Submit'}
                        {step === 'password' && 'Set New Password'}
                    </button> */}

          <Button
            btn_class="text-white bg-blue-color border-0 w-100 mt-5"
            disabled={loading}
            btn_title={
              step === "email"
                ? loading
                  ? "sending code..."
                  : "Send Verification Code"
                : step === "otp"
                ? loading
                  ? "submiting..."
                  : "Submit"
                : step === "password"
                ? loading
                  ? "submiting..."
                  : "Set New Password"
                : ""
            }
          />
        </form>
      </div>
    </div>
  );
};

export default Forgot;
