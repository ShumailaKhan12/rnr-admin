import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Dashboard from "../../pages/dashboard/dashboard";
import Login from "../../pages/auth/Login";
import Forgot from "../../pages/auth/Forgot";
import Error from "../../pages/Errror/error";
import CampaignForm from "../../pages/dashboard/campaignForm";
import { UserContext } from "../../utils/UseContext/useContext";

const AppRoutes = () => {
  const { AuthLocal, setAuthLocal } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  /**
   * Load authentication status from sessionStorage on refresh.
   * Without this, routes will redirect before state is restored.
   */
  useEffect(() => {
    const authValue = sessionStorage.getItem("Auth");
    setAuthLocal(authValue);
    setLoading(false);
  }, [setAuthLocal]);

  // Prevent UI flicker while checking authentication state
  if (loading) return null;

  /**
   * Protected Route Wrapper
   * If user is not authenticated → redirect to login page.
   * Used to protect dashboard and internal pages.
   */
  const PrivateRoute = ({ children }) =>
    AuthLocal ? children : <Navigate to="/" replace />;

  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Forgot Password */}
        <Route path="/forgot" element={<Forgot />} />

        {/* ================= PROTECTED ROUTES ================= */}

        {/* Dashboard (Requires Login) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Campaign Form (Requires Login) */}
        <Route
          path="/campaignform"
          element={
            //  <PrivateRoute>
              <CampaignForm />
            // </PrivateRoute>
          }
        />

        {/* <Route
          path="/referrals"
          element={
            <PrivateRoute>
              <ReferralsRewards />
           </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/earnings"
          element={
            <PrivateRoute>
              <EarningRedemption />
             </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <PushupNotification />
             </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/specialoffer"
          element={
            <PrivateRoute>
              <SpecialOfferForm />
             </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        /> */}

        {/* ================= 404 CATCH-ALL ================= */}

        {/* Handles all unknown or invalid route paths */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
