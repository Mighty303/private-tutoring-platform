import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CS Tutor — Martin Wong",
  description: "Private tutoring resources for Computer Science — Python, Algorithms, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
