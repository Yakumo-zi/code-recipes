import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-screen bg-gray-100">
          <Sidebar />
          <section className="w-full h-full flex justify-center items-center p-5">
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
