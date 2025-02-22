import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

export const metadata = {
  title: "The Wild Oasis"
};

export default function RootLayout({ children }) {
  return <html>
    <body>
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
