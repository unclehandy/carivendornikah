import Link from "next/link";

export default function Nav() {
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1 ">
        <a className="btn btn-ghost text-xl text-slate-100">CariVendorNikah</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          <li className="text-slate-100">
            <Link href={"auth/login"}>Login</Link>
          </li>

          <li className="text-slate-100">
            <Link href={"auth/register"}>Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
