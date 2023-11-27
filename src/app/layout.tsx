import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Button } from "./_components/ui/button";
import Header from "./_components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-gradient-to-b from-[#2e026d] to-[#15162c]`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="w-full max-w-[1200px] mx-auto p-4">
            <Header />
          {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
