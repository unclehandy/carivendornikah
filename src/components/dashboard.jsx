"use client";

import React from "react";
import { MyProfile } from "@/components/vendorProfile";
import { ButtonLogout } from "./buttonLogout";

const Dashboard = () => {
  return (
        <div className="bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4 mt-4">Profile</h2>
            <ButtonLogout />
          </div>
          <MyProfile />
        </div>
  );
};

export default Dashboard;
