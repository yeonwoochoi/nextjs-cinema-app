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
        <div className="p-2">
          <div>Global Layout</div>
          {children}
        </div>
      </body>
    </html>
  );
}
