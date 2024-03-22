"use client";

import React, { useState } from "react";
import { MyProfile } from "@/components/vendorProfile";
import { ImageGrid } from "./portfolio";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (

    <div className="bg-white flex flex-col lg:flex-row">
      <div className="bg-gray-100 p-4 lg:w-1/6 h-lvh fixed">
        <div className="rounded-lg overflow-hidden">
          <img
            className="rounded-full mx-auto mt-4 object-contain"
            src="https://www.bridestory.com/_nuxt/img/bs_logo_dark-HJ6X7hQcPce7eceff4fdd3988b58ef900028ffc0a.webp"
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="text-center mt-4">
            <p className="text-sm text-gray-700">Bride Story</p>
            <p className="text-xs text-gray-500">@bridestory</p>
            <button className="text-xs mt-2 py-1 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400">
              Edit Profile
            </button>
          </div>
        </div>
        <ul className="menu-md bg-gray-100 w-56 rounded-box text-gray-600 mt-4 ml-4">
          <li>
            <a
              href="#"
              className={`${activeTab === "Profile" ? "active" : ""} flex flex-row items-center gap-2`}
              onClick={() => handleTabChange("Profile")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${activeTab === "Portfolio" ? "active" : ""} flex flex-row items-center gap-2`}
              onClick={() => handleTabChange("Portfolio")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Porfolio
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${activeTab === "Package" ? "active" : ""} flex flex-row items-center gap-2`}
              onClick={() => handleTabChange("Package")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Package
            </a>
          </li>
        </ul>
        {/* <MainMenu /> */}
      </div>
      <div className="bg-white p-4 lg:w-3/4 ml-60">

        {activeTab === "Profile" && (
          <div>
          <h2 className="text-2xl font-bold mb-4 mt-4">Profile</h2>
          <MyProfile />
        </div>
        )}
        {activeTab === "Portfolio" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-4">Portfolio</h2>
            <ImageGrid />
          </div>
        )}
        {activeTab === "Package" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-4">Package</h2>
            <p>Belum ada isinya</p>
          </div>
        )}
      </div>
  
  );
};

export default Dashboard;
