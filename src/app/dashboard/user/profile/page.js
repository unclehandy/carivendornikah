
"use client";

import { TemplateUser } from "@/components/templateUser";
import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState (null);
  const router = useRouter();

  function handleLogout () {
    localStorage.removeItem("user");
    Cookies.remove("token");
    router.push("/auth/login");

  }

  useEffect(()=> {
    const userFromLs = localStorage.getItem("user");
    const parsedUserData =  JSON.parse(userFromLs);
    setUser(parsedUserData);
  },[])

  return (
      <TemplateUser>
      <div className="personal-information border border-gray-300 rounded-lg p-4 m-4">
        <div className="flex items-center justify-between ">
          <h3 className="text-lg font-semibold p-2">Profil Pengguna</h3>
          <div className="space-x-2">
            <button className="btn-sm btn btn-neutral">Edit</button>
            <button onClick={handleLogout} className="btn-sm btn btn-neutral">Log Out</button>
          </div>
        </div>
        <div className="ml-2">
              <Avatar size={30} name={user?.nama} variant="beam" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}/>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div>
            <h5 className="profile-heading">Nama Pengguna</h5>
            <p className="profile-subheading">{user?.nama}</p>
          </div>
          <div>
            <h5 className="profile-heading">Alamat Email</h5>
            <p className='profile-subheading'>{user?.email}</p>
          </div>
          
          <div>
            <h5 className="profile-heading">Nomor Telepon</h5>
            <p className='profile-subheading'>{user?.phone}</p>
          </div>
          <div>
            <h5 className="profile-heading">Role</h5>
            <p className='profile-subheading'>{user?.role}</p>
          </div>
        </div>
      </div>
      </TemplateUser>
  );

}
