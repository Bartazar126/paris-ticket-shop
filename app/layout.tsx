import type { Metadata } from "next";
import { League_Spartan, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import "./booking-picker.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Paris Ticket Shop",
  description:
    "Book Paris attraction tickets, museum entry, Seine river cruises, Eiffel Tower experiences and landmark combo tickets with Paris Ticket Shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${leagueSpartan.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-[#333]">
        {children}
      </body>
    </html>
  );
}
