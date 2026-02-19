import type { Metadata } from "next";
import { Montserrat, Jost } from "next/font/google";
import "./globals.css";
import { createClient, repositoryName } from "@/prismicio";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PrismicPreview } from "@prismicio/next";
import { ReactLenis } from "@/utils/lenis";
import { Analytics } from "@vercel/analytics/next";
import { ChatLoader } from "@/components/ui/chat_loader.";
const montserrat = Montserrat({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jost",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return {
      title: settings.data.site_title || "Keyvera alternate",
      description:
        settings.data.meta_description || "Experience the peak of real-estates",
      openGraph: {
        images: settings.data.og_image?.url
          ? [{ url: settings.data.og_image.url }]
          : [],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Keyvera alternate",
      description: "Experience the peak of real-estates",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" love-deals="879BC0364EB9EBEE3DBE71B15E175613">
      <ReactLenis root>
        <body
          className={`${jost.variable} ${montserrat.variable} antialiased bg-white text-black`}
        >
          <Header />
          <ChatLoader />
          <main>{children}</main>
          <Footer />
          <PrismicPreview repositoryName={repositoryName} />
          <Analytics />
        </body>
      </ReactLenis>
    </html>
  );
}
