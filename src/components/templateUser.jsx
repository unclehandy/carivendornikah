import Link from "next/link"

export const TemplateUser = ({children}) => {
  return (
    <div className="h-screen flex gap-4">
        <aside className="w-[230px] bg-gray-200 p-8 space-y-2">
          <Link href="/dashboard/user/profile">
            <div> Profiles</div>
          </Link>
          <Link href="/dashboard/user/orderHistory">
            <div> Order History</div>
          </Link>
          <Link href="/dashboard/user/weddingDream">
            <div> Wedding Dreams</div>
          </Link>
        </aside>

        <main className="w-[calc(100vw-230px)]">{children}</main>
    </div>
  )
}

