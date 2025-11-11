import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

// Image
import Logo from "../../assets/images/Logo-img/wealth-Elite-Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";
import { UserContext } from "../../utils/UseContext/useContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAuthLocal, AuthLocal } = useContext(UserContext)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setloading(true)
      const payload = {
        email: data?.email,
        password: data?.password,
      };
      let response = await postData("/admin/login", payload);
      if (response?.admin_uid) {
        toastSuccess(response?.message);
        sessionStorage.setItem("Auth", response?.admin_uid);
        setAuthLocal(response?.admin_uid)
        setloading(false)
        navigate("/dashboard")
      }
    } catch (error) {
      toastError(error?.message);
      setloading(false)
    }
  };

  return (
    <div className="bg-light-blue-color min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <img src={Logo} alt="Logo" />

      <div className="bg-white login-box border-radius-16 p-5 mt-4 shadow-sm">
        <p className="text-blue-color font-18 montserrat-semibold mb-0">
          Login
        </p>
        <p className="text-border-gray-color font-12 montserrat-medium">
          Please fill the details below to login to the admin account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4 mt-5">
            <label className="form-label font-14 montserrat-medium text-border-gray-color">
              E-mail ID
            </label>
            <input
              type="email"
              className="form-control login-input rounded-3 border-0 py-2 "
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

          {/* Password Field */}
            <label className="form-label font-14 montserrat-medium text-border-gray-color">
              Password
            </label>
          <div className="mb-2 position-relative">
            <input
              // type="password"
              type={showPassword ? 'text' : 'password'}
              className="form-control login-input rounded-3 border-0 py-2"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y me-3"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? (
                <FaEye size={20} />
              ) : (
                <FaEyeSlash size={20} />
              )}
            </span>
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {/* <p className='font-12 text-blue-color inter-font-family-400'>Remember me</p> */}
            <div className="form-check d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input border-blue"
                id="rememberMe"
                {...register("rememberMe")}
              />
              <label
                htmlFor="rememberMe"
                className="form-check-label font-12 text-blue-color inter-font-family-400 mb-0"
              >
                Remember me
              </label>
            </div>
            <NavLink to={"/forgot"}>
              <p className="font-12 text-blue-color inter-font-family-400 mb-0">
                Forgot Password?
              </p>
            </NavLink>
          </div>
          {/* Submit Button */}
          <Button
            disabled={loading}
            btn_class={"text-white bg-blue-color border-0 w-100 mt-5"}
            btn_title={loading ? "loging..." : "Login"}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
