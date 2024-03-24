"use client"
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {UserRound } from "lucide-react";

export const EditUser = ({user}) => {
  const [id, setId] = useState ("");
  const [nama, setNama] = useState ("");
  const [phone, setPhone] = useState ("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const router = useRouter();

 
  function resetState() {
    setId ("");
    setNama("");
    setPhone("");
    setEmail("");
    setPassword("");
  }


  useEffect(() => {
    if (user != null) {
      setId(user.id);
      setNama(user.nama);
      setPhone(user.phone);
      setEmail(user.email);
      setPassword(user.password);
    } else {
      resetState();
    }
  }, [user]);


  async function handleUpdateUser () {
    try {
    const res = await fetch (`/api/users/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama,
        email,
        role: "user",
        phone,
        password})
    });

    if (!res.ok) {
      throw new Error('Failed to update user');
    }
      const dataUser = await res.json()
      // console.log(dataUser);
      
      // const resUser = await fetch (`/api/users/${id}`);
      // const dataUpdateUser = await resUser.json();
      
      // // // console.log(dataUpdateUser);
      // // //hapus localstorage dan token existing
      // // localStorage.removeItem("user");
      // // // Cookies.remove("token");
      // // // add localstorage dengan data api baru
      // localStorage.setItem("user", JSON.stringify(dataUpdateUser));
      // // Cookies.set("token", token);

      router.refresh() 

      toast.success("Data User berhasil Di Update")
      // window.location.replace("/dashboard-user/profile")      
      
  } catch (error) {
      console.error('Error updating user:', error.message);
  }
  }

  return (

    <main className="space-y-2 rounded-lg p-5 max-w-lg m-auto">
           <div className="flex gap-2"><UserRound /> <h1>Edit Pengguna  </h1></div> 
           <div className="space-y-3 max-w-xs">
             <input name="nama" placeholder="nama lengkap"  value={nama} onChange={(e)=> setNama(e.target.value)} className="input input-bordered w-full max-w-xs"/>
             <input name="email" placeholder="alamat email" value={email} disabled onChange={(e)=> setEmail(e.target.value)} className="input input-bordered w-full max-w-xs"/>
             <input name="phone" placeholder="no telepon" value={phone} onChange={(e)=> setPhone(e.target.value)} className="input input-bordered w-full max-w-xs"/>
             <input name="password" type="password" placeholder="kata sandi" value={password} onChange={(e)=> setPassword(e.target.value)} className="input input-bordered w-full max-w-xs"/>
             <button className="btn-md btn btn-neutral" onClick={handleUpdateUser}>
                Update Data
             </button>
         </div>
    </main>
  )
}
