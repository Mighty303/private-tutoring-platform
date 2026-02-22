import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body className="antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
