import { HomeIcon,UserCircle,FileBadgeIcon,LucideDatabaseZap } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }) {
    return (
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="sidebar-left w-1/6 bg-slate-100 h-svh">
          <nav className="p-4">
            <ul>
              <li className="mb-4">
                <Link href="#" className="text-gray-600 flex gap-3 items-center hover:text-gray-800">
                    <HomeIcon/>  
                    <div>Dashboard</div></Link>
              </li>


              <li className="mb-4">
                <Link  href="/dashboard/kategori" className="text-gray-600 flex gap-3 items-center hover:text-gray-800">
                    <FileBadgeIcon/>  
                    <div>Kategori</div></Link>
              </li>


              <li className="mb-4">
                <Link  href="/dashboard/product" className="text-gray-600 flex gap-3 items-center hover:text-gray-800">
                    <LucideDatabaseZap/>  
                    <div>Product</div></Link>
              </li>

              <li className="mb-4">
                <Link href="/dashboard/vendor" className="text-gray-600 flex gap-3 items-center hover:text-gray-800">
                    <UserCircle/>  
                    <div>Profile</div></Link>
              </li>


    
     
            </ul>
          </nav>
        </div>
        
        {/* Right Content Area */}
        <div className="w-5/6  bg-white">
          <div className="p-4 content-center items-center justify-center  w-full">
            
            {children}
          </div>
        </div>
      </div>
    );
  }
  