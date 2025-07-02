import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html>
      <body>
        <div>Global Layout</div>
        {children}
      </body>
    </html>
  );
}
