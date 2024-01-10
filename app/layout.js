import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/header";
import Menu from "./(components)/menu";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={` ${inter.className}`}>
          <Header />

          <main>
            <div className="flex">
              <div className="w-1/5 pt-2">
                <Menu />
              </div>
              <div className="w-4/5 pt-10">{children}</div>
            </div>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
