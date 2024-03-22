"use client";
import toast from "react-hot-toast";
import { TemplateUser } from "@/components/templateUser";
import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const DashboardProfileUser =() => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState (null);
  const [nama, setNama] = useState (null);
  // const [phone, setPhone] = useState (null);
  // const [email, setEmail] = useState (null);
  // const [password, setPassword] = useState (null);
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


  async function handleUpdateUser () {
    // const res = await fetch ("/api/users",{
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({"id":item._id,nama,email,phone,password})
    // });
    
    // const dataUser = await res.json()
    router.refresh() 
   toast.success("Data User berhasil Di Update")
    setEditMode(false)
  }


  if (editMode) {
    return (   
      <TemplateUser>
      <main className="space-y-2 bg-secondary rounded-lg p-5 max-w-lg m-auto">
        <h1>Edit Pengguna</h1>
        <div className="space-y-3 max-w-xs">
          <input name="nama" placeholder="nama lengkap"  className="input input-bordered w-full max-w-xs"/>
          <input name="email" placeholder="alamat email" className="input input-bordered w-full max-w-xs"/>
          <input name="phone" placeholder="no telepon"  className="input input-bordered w-full max-w-xs"/>
          <input name="password" type="password" placeholder="kata sandi"  className="input input-bordered w-full max-w-xs"/>
          <button className="btn-md btn btn-neutral" onClick={handleUpdateUser}>
             Update Data
          </button>
      </div>
      </main>
      </TemplateUser>
    )
 
  }

  return (
      <TemplateUser>
      <div className="personal-information border border-gray-300 rounded-lg p-4 m-4">
        <div className="flex items-center justify-between ">
          <h3 className="text-lg font-semibold p-2">Profil Pengguna</h3>
          <div className="space-x-2">
            <button onClick={()=>setEditMode(true)} className="btn-sm btn btn-neutral">Edit</button>
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
