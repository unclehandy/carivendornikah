import Link from "next/link"

import {Home, UserRound, ShoppingBag, BookMarked, Grid, ShoppingCart, SquareGanttChart } from "lucide-react";

const menuList = [
  {label: "Home", href: "/", icon: <Home />},
  {label: "Profile", href: "profile", icon: <UserRound />},
  {label: "Katalog Produk", href: "/dashboard-user/produk", icon: <Grid />},
  {label: "Order History", href: "orderHistory", icon: <ShoppingBag />},
  {label: "Wedding Dream", href: "weddingDream", icon: <BookMarked />},
  {label: "Keranjang", href: "/dashboard-user/keranjang", icon: <ShoppingCart />},
  {label: "Order", href: "/dashboard-user/orderdetail", icon: <SquareGanttChart/>},
]


export const TemplateUser = ({children}) => {
  return (
    <div className="h-screen flex gap-4">
        <aside className="w-[230px] bg-pink-200 p-8 space-y-2">
          {menuList.map ((item) => {
            return (
              <Link href={item.href} key={item.label} className="flex gap-2">
                {item.icon}
                <div> {item.label}</div>
              </Link>
            )
          })}

        </aside>

        <main className="w-[calc(100vw-230px)]">{children}</main>
    </div>
  )
}

