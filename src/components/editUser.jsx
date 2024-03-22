"use client"
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
      router.refresh() 
      toast.success("Data User berhasil Di Update")
 
  } catch (error) {
      console.error('Error updating user:', error.message);
  }
  }

  return (

    <main className="space-y-2 rounded-lg p-5 max-w-lg m-auto">
           <h1>Edit Pengguna  </h1>
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
