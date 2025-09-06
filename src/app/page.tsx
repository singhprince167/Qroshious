import HeaderNav from "@/components/HeaderNav";
import BrandShowcase from "@/components/BrandShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
      
      <main className="flex-1">
        <BrandShowcase />
      </main>
      
      <Footer />
    </div>
  );
}