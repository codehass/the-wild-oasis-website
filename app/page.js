import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div>
      <h1> The Wild Oasis Website</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
