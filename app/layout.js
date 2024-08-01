
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider"
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IdeaPallet",
  description: "A next generation AI content generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <header className="flex items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Idea Pallet Logo" width={40} height={40} />
            <span className="text-xl font-bold">Idea Pallet</span>
          </div>
        </header>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >{children}</ThemeProvider>

        </body>
      </html>
      </ClerkProvider>
  );
}
