import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Background3D from "./components/helper/background-3d";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://jayakumarportfolio.netlify.app"),
  title: {
    default: "Jayakumar L | Business Analyst, Product Analyst & FinTech Portfolio",
    template: "%s | Jayakumar L",
  },
  description:
    "Portfolio of Jayakumar L, MBA graduate in IT & FinTech, showcasing business analysis, product analytics, FinTech, AI and data analytics projects.",
  keywords: [
    "Jayakumar L",
    "Business Analyst",
    "Product Analyst",
    "FinTech",
    "AI Product Management",
    "SQL",
    "Power BI",
    "Business Analysis Portfolio",
  ],
  openGraph: {
    title: "Jayakumar L | Business Analyst, Product Analyst & FinTech Portfolio",
    description:
      "Explore Jayakumar L's business analysis, product analytics, FinTech and AI projects.",
    url: "https://jayakumarportfolio.netlify.app",
    siteName: "Jayakumar L Portfolio",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen bg-[#0d1224] text-white overflow-x-hidden`}>
        <Background3D />
        <ToastContainer />
        <Navbar />
        <main className="relative z-10 mx-auto min-h-screen w-full overflow-x-hidden pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-8 md:px-10 lg:max-w-[70rem] lg:px-12 xl:max-w-[76rem] 2xl:max-w-[92rem]">
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
