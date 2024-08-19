import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pensadoria Soluções - Teste",
  description: "Teste frontend Pensadoria Soluções",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <body className={inter.className}>
          <main style={{
            marginLeft: "20rem",
            marginRight: "20rem",
            marginTop: "1rem",
          }}>
            {children}
          </main>
        </body>
      </AntdRegistry>
    </html>
  );
}
