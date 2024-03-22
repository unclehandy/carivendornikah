"use client";

import React from "react";
import { MyProfile } from "@/components/vendorProfile";

const Dashboard = () => {
  return (
        <div className="bg-white">
          <h2 className="text-2xl font-bold mb-4 mt-4">Profile</h2>
          <MyProfile />
        </div>
  );
};

export default Dashboard;
