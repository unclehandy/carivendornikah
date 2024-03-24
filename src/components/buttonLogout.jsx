"use client"

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const ButtonLogout = () => {
  const router = useRouter();

  function handleLogout () {
    localStorage.removeItem("user");
    Cookies.remove("token");
    Cookies.remove("id");
    router.push("/auth/login");

  }
  return (
    <div>
      <button onClick={handleLogout} className="btn-sm btn btn-neutral">Log Out</button>
    </div>
  )
}

