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
    
      <div className="">
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
