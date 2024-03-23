import {
  HomeIcon,
  UserCircle,
  FileBadgeIcon,
  LucideDatabaseZap,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex bg-slate-100 h-screen">
      {/* Left Sidebar Navigation */}
      <div className="sidebar-left w-1/6 bg-pink-200 h-screen fixed">
        <nav className="p-4">
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
          <ul className="ml-6 mt-8">
            <li className="mb-4">
              <Link
                href="#"
                className="text-gray-600 flex gap-3 items-center hover:text-gray-800"
              >
                <HomeIcon />
                <div>Dashboard</div>
              </Link>
            </li>

            <li className="mb-4">
              <Link
                href="/dashboard/kategori"
                className="text-gray-600 flex gap-3 items-center hover:text-gray-800"
              >
                <FileBadgeIcon />
                <div>Kategori</div>
              </Link>
            </li>

            <li className="mb-4">
              <Link
                href="/dashboard/product"
                className="text-gray-600 flex gap-3 items-center hover:text-gray-800"
              >
                <LucideDatabaseZap />
                <div>Product</div>
              </Link>
            </li>

            <li className="mb-4">
              <Link
                href="/dashboard"
                className="text-gray-600 flex gap-3 items-center hover:text-gray-800"
              >
                <UserCircle />
                <div>Profile</div>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/dashboard/portfolio"
                className="text-gray-600 flex gap-3 items-center hover:text-gray-800"
              >
                <BriefcaseBusiness />
                <div>Portfolio</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="w-5/6  bg-white ml-[16.666667%]">
        <div className="p-4 content-center items-center justify-center  w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
