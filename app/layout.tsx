import type { Metadata } from "next";
import { Anton, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const label = Barlow_Condensed({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Benjamin Heredia · Full-stack e IA en producción",
  description:
    "Ingeniero de sistemas en Santa Cruz de la Sierra. Agentes de voz, IA conversacional, automatizaciones y sistemas web en producción.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${label.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
