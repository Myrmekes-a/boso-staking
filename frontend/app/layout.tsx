import Header from "@/components/navigation/Header";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/components/navigation/Footer";
import ReactLenisComponent from "@/components/ReactLenisComponent";
import ClickImage from "@/components/ClickImage";

const bozoFont = localFont({
  src: "../public/font/bozo.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bozo Collective",
  description:
    "Bozo Collective is a collection with art inspired by Diary of a Wimpy Kid. Created to remind the community that we are all Bozos and we are all in this together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bozoFont.className}>
      <body className="bg-beige text-black" style={{ overflow: "hidden" }}>
        <ReactLenisComponent>
          <ClickImage>{children}</ClickImage>
        </ReactLenisComponent>
      </body>
    </html>
  );
}
