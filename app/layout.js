import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_style/globals.css";
import { Josefin_Sana } from "next/font/google"

const josefin = Josefin_Sana({
  subsets: ["latin"],
  display: "swap",
})
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome / The Wild Oasis"
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return <html>
    <body className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}>
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>© 2025 The Wild Oasis</p>
      </footer>
    </body>
  </html>
}
