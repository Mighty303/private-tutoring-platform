import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "CS Tutor — Martin Wong",
  description: "Private tutoring resources for Computer Science — Python, Algorithms, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${GeistSans.className} ${GeistMono.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
