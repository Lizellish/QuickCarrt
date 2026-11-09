import BestSeller from "../../components/Home/BestSeller";
import CategoryGrid from "../../components/Home/CategoryGrid";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import FlashSales from "../../components/Home/FlashSales";
import HeroSection from "../../components/Home/HeroSection";
import NewArrival from "../../components/Home/NewArrival";
import NewsletterBanner from "../../components/Home/NewsletterBanner";
import RecommendedForYou from "../../components/Home/RecommendedForYou";
import Testimonials from "../../components/Home/Testimonials";
import TodaysDeal from "../../components/Home/TodaysDeal";
import TrustBar from "../../components/Home/TrustBar";

const HomePage = () => {
  return (
    <div className="mx-auto flex max-w-360 flex-col gap-10 px-4 pt-10 pb-20 md:px-12">
      <HeroSection />

      <TrustBar />
      <CategoryGrid />
      <FlashSales />
      <FeaturedProducts />
      <TodaysDeal />
      <BestSeller />
      <NewArrival />
      <RecommendedForYou />
      <Testimonials />
      <NewsletterBanner />
    </div>
  );
};

export default HomePage;
