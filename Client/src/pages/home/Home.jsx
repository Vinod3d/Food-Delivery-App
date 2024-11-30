
import { useSelector } from 'react-redux';
import AboutUs from '../../components/about/AboutUs';
import BannerSection from '../../components/banner/BannerSection';
import CardsSection from '../../components/cardSection/CardSection';
import CategoryCards from '../../components/category/CategoryCards';
import Footer from '../../components/footer/Footer';
import HeroImg from '../../components/heroImg/HeroImg';
import Navbar from '../../components/nav/Navbar';
import NumberSection from '../../components/numSecion/NumberSection';
import OfferCard from '../../components/offerCard/OfferCard';
import RestaurantsCards from '../../components/restaurantCards/RestaurantsCards';
// import styles from './home.module.css';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const userName = user?.user;
  
  return (
    <div >
      <Navbar 
        active={'home'}
        isAuthenticated={isAuthenticated}
        user={userName}
      />
      <HeroImg/>
      <OfferCard/>
      <CategoryCards/>
      <RestaurantsCards/>
      <BannerSection/>
      <CardsSection/>
      <AboutUs/>
      <NumberSection/>
      <Footer/>
    </div>
  );
}

export default App;
