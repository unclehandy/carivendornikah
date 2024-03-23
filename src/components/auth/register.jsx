"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Register = () => {

  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    nama: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  function handleChangeInput(event) {
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
    console.log(registerData);
  }

  async function handleRegister() {
    const { nama, email, phone, role, password } = registerData;

    if (!nama || !email || !phone || !password || !role) {
      console.log("All fields must be filled");
      return;
    }

    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(registerData),
    });

    const {data, message} = await res.json();
    toast.success(message);
    router.push("/auth/login");
    // console.log(data);
  }

  return (

    <main className="space-y-6">
      <div className="font-medium tracking-tight text-2xl">CariVendorNikah.</div>
      <div className="">
      <h1>Daftar</h1>
      <p>Buat Akun Pengguna Cari Vendor Nikah</p>
      </div>
      <div className="space-y-3">
      <input name="nama" placeholder="nama lengkap" onChange={handleChangeInput} className="input input-bordered w-full max-w-xs"/>
      <input name="email" placeholder="alamat email" onChange={handleChangeInput} className="input input-bordered w-full max-w-xs"/>
      <select name="role" onChange={handleChangeInput} className="select select-bordered w-full max-w-xs">
        <option value="">Pilih Role/Peran</option>
        <option value="user">User</option>
        <option value="vendor">Vendor</option>
      </select>
      <input name="phone" placeholder="no telepon" onChange={handleChangeInput} className="input input-bordered w-full max-w-xs"/>
      <input name="password" type="password" placeholder="kata sandi" onChange={handleChangeInput} className="input input-bordered w-full max-w-xs"/>
      <button className="btn-md btn btn-neutral" onClick={handleRegister}>
        Daftar
      </button>
      </div>
      <div>
      <div>
        Sudah Punya Akun ?{" "}
        <Link href="/auth/login" className="link">
          <span>Login</span>
        </Link>
      </div>
      </div>
    </main>



  )
}
