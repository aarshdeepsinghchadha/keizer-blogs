import "styles/globals.css";

import type { Metadata } from "next";
import { Toaster } from "components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "trpc/react";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div vaul-drawer-wrapper="">{children}</div>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
