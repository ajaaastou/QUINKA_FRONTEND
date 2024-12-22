"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Truck,
} from "lucide-react"
import { use } from "react"

const routes = [
  {
    label: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Produits",
    icon: Package,
    href: "/dashboard/products",
    color: "text-violet-500",
  },
  {
    label: "Catégories",
    icon: Tags,
    href: "/dashboard/categories",
    color: "text-pink-500",
  },
  {
    label: "Ventes",
    icon: ShoppingCart,
    href: "/dashboard/sales",
    color: "text-orange-500",
  },
  {
    label: "Fournisseurs",
    icon: Truck,
    href: "/dashboard/suppliers",
    color: "text-emerald-500",
  },
  {
    label: "Utilisateurs",
    icon: Users,
    href: "/dashboard/users",
    color: "text-green-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            QUINKA
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}