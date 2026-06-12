import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Hero/Hero";
import MapSection from "../Components/Map/MapSection";
import Navbar from "../Components/Navbar/Navbar";
import Faq from "../Components/Party/Faq";
import Party from "../Components/Party/Party";
import Stats from "../Components/Stats/Stats";

export default function Home() {
  return (
    <div className="bg-[#0E0E10] min-h-screen text-white">
      <Navbar />
     <Hero/>
     <Stats/>
     <MapSection/>
     <Party/>
     <Faq/>
     <Footer/>
    </div>
  );
}