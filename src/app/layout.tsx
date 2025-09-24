'use client'

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <QueryClientProvider client={queryClient}>
          <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:underline">
                  Поиск
                </Link>
              </li>
            </ul>
          </nav>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}