
import AboutUs from '../../components/about/AboutUs';
import BannerSection from '../../components/banner/BannerSection';
import CardsSection from '../../components/cardSection/CardSection';
import Footer from '../../components/footer/Footer';
import HeroImg from '../../components/heroImg/HeroImg';
import Navbar from '../../components/nav/Navbar';
import NumberSection from '../../components/numSecion/NumberSection';
// import styles from './home.module.css';

function App() {
  return (
    <div >
      <Navbar/>
      <HeroImg/>
      <BannerSection/>
      <CardsSection/>
      <AboutUs/>
      <NumberSection/>
      <Footer/>
    </div>
  );
}

export default App;
