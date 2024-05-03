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
import Profile from "./pages/Profile";
import Currency from "./pages/Setting/Currency";
import StaticPages from "./pages/Setting/StaticPages";
import Static from "./pages/Setting/StaticPages/Static";
import Delivery from "./pages/Setting/Delivery";
import Payment from "./pages/Setting/Payment";
import WebsiteBanners from "./pages/Website/Banners";
import Members from "./pages/Website/Members";
import BranchesAndMarkets from "./pages/Website/Branches and Markets"
import Activities from "./pages/Website/Activities"
import News from "./pages/Website/News"
import Offers from "./pages/Website/Offers";
import Shareholders from "./pages/Website/Shareholders";
import ContactUs from "./pages/Website/ContactUs";
import Notification from "./pages/Website/Notification";
import AddNotification from "./pages/Website/Notification/AddNotification";
import Diwans from "./pages/Website/Diwans";
import Products from "./pages/Website/Products";
import ShareholdersRequests from "./pages/Website/ShareholdersRequests";
import Attachments from "./pages/Website/ShareholdersRequests/Attachments";

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

    // Website
    { url : "website-banners", component: <WebsiteBanners />},
    { url: "branches-and-markets", component: <BranchesAndMarkets /> },
    { url: "activities", component: <Activities /> },
    { url: "members", component: <Members /> },
    { url: "shareholders", component: <Shareholders /> },
    { url: "shareholders_requests", component: <ShareholdersRequests /> },
    { url: "shareholders_requests/attachments", component: <Attachments /> },
    { url: "products", component: <Products /> },
    { url: "news", component: <News /> },
    { url: "diwans", component: <Diwans /> },
    { url: "offers", component: <Offers /> },
    { url: "contact-us", component: <ContactUs /> },
    { url: "notification", component: <Notification /> },
    { url: "notification/add-notification", component: <AddNotification /> },

    // Ad Screen
    // { url: "ad-screen", component: <AdScreen /> },

    // Users
    { url: "users", component: <Users /> },

    //Setting
    { url: "social", component: <SocialMedia /> },
    { url: "currency", component: <Currency /> },
    { url: "pages", component: <StaticPages /> },
    { url: "about", component: <Static /> },
    { url: "privacy", component: <Static /> },
    { url: "faqs", component: <Static /> },
    { url: "delivery", component: <Delivery /> },
    { url: "payment", component: <Payment /> },

    //Profile
    { url: "profile", component: <Profile /> },

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
