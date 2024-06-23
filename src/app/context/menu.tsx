"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageStore } from "@/store/page-store";
import { useEffect } from "react";

const menuItems = [
  {
    name: "Inicio",
    href: "/app",
    icon: "mdi-home",
  },
  {
    name: "Cursos",
    href: "/app/courses",
    icon: "mdi-school",
  },
  {
    name: "Estudiantes",
    href: "/app/students",
    icon: "mdi-account-multiple",
  },
];

export default function Menu() {
  const { changePage } = usePageStore();
  const pathname = usePathname();

  useEffect(() => {
    const menu = menuItems.find((item) => item.href === pathname);
    if (menu) changePage(menu.name, menu.icon);
  }, [changePage, pathname]);
  return (
    <div className="p-2 w-52 h-full box-border bg-white/5 backdrop-blur-lg">
      <div className="flex items-cente justify-center mt-3 mb-4">
        <span className="mdi mdi-account-circle text-5xl"></span>
      </div>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                className={`link ${pathname === item.href ? "active" : ""}`}
                href={item.href}
                onClick={() => changePage(item.name, item.icon)}
              >
                <span className={`mdi ${item.icon} text-1xl`}></span>
                <span className="ml-2">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
