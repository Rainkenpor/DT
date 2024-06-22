import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Menu from "../context/menu";
import Container from "../context/container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Distelsa",
  description: "Proyecto prueba técnica",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="flex h-screen flex-row items-start">
       <Menu></Menu>
       <Container>
          {children}
       </Container>
    </div>
  );
}
