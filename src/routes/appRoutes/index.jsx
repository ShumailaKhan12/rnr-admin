// import React, { useContext, useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Dashboarcampaigns from "../../pages/dashboard/campaignDashboard";
// import Dashboard from "../../pages/dashboard/dashboard";
// import ReferralsRewards from "../../pages/referralsRewards/referralsRewards";
// import EarningRedemption from "../../pages/earningRedemptions/earningRedemption";
// import Login from "../../pages/auth/Login";
// import Forgot from "../../pages/auth/Forgot";
// import PushupNotification from "../../pages/pushupNotification/pushupNotification";
// import { UserContext } from "../../utils/UseContext/useContext";
// import Error from "../../pages/Errror/error";
// import MainForm from "../../pages/dashboard/mainForm";
// import SpecialOfferForm from "../../pages/specialOffer/specialOfferForm";
// import CampaignForm from "../../pages/dashboard/campaignForm";
// import Product from "../../pages/product/product";

// const AppRoutes = () => {
//   // Check Auth Functionality
//   const { AuthLocal, setAuthLocal } = useContext(UserContext);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getValue = sessionStorage.getItem("Auth");
//     setAuthLocal(getValue);
//     setLoading(false);
//   }, []);

//   if (loading) return null;

//   return (
//     <Router>
//       <Routes>
//         <Route path="*" element={<Error />} />
//         <Route path="/" element={<Dashboarcampaigns />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot" element={<Forgot />} />
//         <Route path="/campaignform" element={<CampaignForm />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;

{
  /* <Route path="/earning" element={<EarningRedemption />} /> */
}
{
  /* <Route path="/pushup" element={<PushupNotification />} /> */
}

// <Route path="/referral" element={<ReferralsRewards />} />
{
  /* <Route path="/mainform" element={<MainForm />} />  */
}
{
  /* <Route path="/specialoffer" element={<SpecialOfferForm />} />  */
}


import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboarcampaigns from "../../pages/dashboard/campaignDashboard";
import Dashboard from "../../pages/dashboard/dashboard";
import ReferralsRewards from "../../pages/referralsRewards/referralsRewards";
import EarningRedemption from "../../pages/earningRedemptions/earningRedemption";
import Login from "../../pages/auth/Login";
import Forgot from "../../pages/auth/Forgot";
import PushupNotification from "../../pages/pushupNotification/pushupNotification";
import { UserContext } from "../../utils/UseContext/useContext";
import Error from "../../pages/Errror/error";
import MainForm from "../../pages/dashboard/mainForm";
import SpecialOfferForm from "../../pages/specialOffer/specialOfferForm";
import CampaignForm from "../../pages/dashboard/campaignForm";
import Product from "../../pages/product/product";

const AppRoutes = () => {
  const { AuthLocal, setAuthLocal } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getValue = sessionStorage.getItem("Auth");
    setAuthLocal(getValue);
    setLoading(false);
  }, [setAuthLocal]);

  if (loading) return null;

  // Protected route wrapper
  const PrivateRoute = ({ children }) => {
    return AuthLocal ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard-campaigns"
          element={
            <PrivateRoute>
              <Dashboarcampaigns />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/campaignform"
          element={
            <PrivateRoute>
              <CampaignForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/referrals"
          element={
            <PrivateRoute>
              <ReferralsRewards />
            </PrivateRoute>
          }
        />
        <Route
          path="/earnings"
          element={
            <PrivateRoute>
              <EarningRedemption />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <PushupNotification />
            </PrivateRoute>
          }
        />
        <Route
          path="/mainform"
          element={
            <PrivateRoute>
              <MainForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/specialoffer"
          element={
            <PrivateRoute>
              <SpecialOfferForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
