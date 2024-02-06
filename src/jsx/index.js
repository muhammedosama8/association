import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Pages
import Error404 from "./common/Error404";

//Scroll To Top
import ScrollToTop from "./layouts/ScrollToTop";

import Admins from "./pages/Admin";
import AddAdmin from "./pages/Admin/AddAdmin";
import Banners from "./pages/Banners";
import Users from "./pages/Users";
import Home from "./pages/Dashboard";
import AdScreen from "./pages/AdScreen";
import SocialMedia from "./pages/Setting/SocialMedia";
import Permission from "./pages/Rules";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Brands from "./pages/Brand";
import Currency from "./pages/Setting/Currency";
import StaticPages from "./pages/Setting/StaticPages";
import AddNotification from "./pages/Notification/AddNotification";
import Static from "./pages/Setting/StaticPages/Static";
import Delivery from "./pages/Setting/Delivery";
import Payment from "./pages/Setting/Payment";
import OrderSuccessful from "./common/OrderSuccessful";
import OrderFailed from "./common/OrderFailed";
import BiddingManagement from "./pages/BiddingManagement";
import KYCRequests from "./pages/KYCRequests";
import TimeManagement from "./pages/TimeManagement";
import AppCommissionManagement from "./pages/AppCommissionManagement";
import WalletManagement from "./pages/WalletManagement";
import PromCodes from "./pages/PromoCodes";
import AddPromoCodes from "./pages/PromoCodes/AddPromoCodes";
import TimeSlot from "./pages/TimeSlot";
import SpecificBlock from "./pages/TimeSlot/SpecificBlock";

const Markup = () => {
  const allroutes = [
    // Home
    { url: "", component: <Home /> },

    // Admins
    { url: "admins", component: <Admins /> },
    { url: "admins/add-admins", component: <AddAdmin /> },
    { url: "admins/edit-admin/:id/:name", component: <AddAdmin /> },

    // Rules
    { url: "rules", component: <Permission /> },
    { url: "rules/:id", component: <Permission /> },

    // Banners
    { url: "banners", component: <Banners /> },

    // Promo Codes
    { url: "promo-codes", component: <PromCodes /> },
    { url: "promo-codes/add-promo-codes", component: <AddPromoCodes /> },
    { url: "promo-codes/edit-promo-codes", component: <AddPromoCodes /> },

    // Time Slot
    { url: "time-slot", component: <TimeSlot /> },
    { url: "time-slot/specific-block", component: <SpecificBlock /> },

    // Ad Screen
    { url: "ad-screen", component: <AdScreen /> },

    // Brand
    { url: "brands", component: <Brands /> },

    // Users
    { url: "users", component: <Users /> },

    // Bidding Management
    { url: "bidding-management", component: <BiddingManagement /> },

    // KYCRequests
    { url: "kyc-requests", component: <KYCRequests /> },

    // TimeManagement
    { url: "time-management", component: <TimeManagement /> },

    // AppCommissionManagement
    {
      url: "app-commission-management",
      component: <AppCommissionManagement />,
    },

    // WalletManagement
    { url: "wallet-management", component: <WalletManagement /> },

    // Notification
    { url: "notification", component: <Notification /> },
    { url: "notification/add-notification", component: <AddNotification /> },

    //Setting
    { url: "social", component: <SocialMedia /> },
    { url: "currency", component: <Currency /> },
    { url: "pages", component: <StaticPages /> },
    { url: "pages/about", component: <Static /> },
    { url: "pages/privacy", component: <Static /> },
    { url: "pages/faqs", component: <Static /> },
    { url: "delivery", component: <Delivery /> },
    { url: "payment", component: <Payment /> },

    //Profile
    { url: "profile", component: <Profile /> },

    { url: "admin/successful", component: <OrderSuccessful /> },
    { url: "admin/failed", component: <OrderFailed /> },

    // Error
    { url: "*", component: <Error404 /> },
  ];

  return (
    <>
      <Routes>
        <Route path="page-error-404" element={<Error404 />} />
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  return (
    <div id="main-wrapper" className={`show `}>
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Markup;
