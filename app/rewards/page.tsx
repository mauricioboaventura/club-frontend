import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-mc-bg pb-20">
      <Header />
      <div className="px-4 py-12 max-w-[480px] mx-auto text-center">
        <h1 className="text-xl font-bold text-white mb-2">Rewards</h1>
        <p className="text-text-secondary text-sm">Em breve</p>
      </div>
      <Footer />
    </main>
  );
}
