
import styles from './restaurant.module.css'
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';
import RestaurantsCards from '../../components/restaurantCards/RestaurantsCards';
import CustomerReviews from '../../components/reivew/CustomerReviews';
import LocationMap from '../../components/map/LocationMap';
import TimingSection from '../../components/restaurantCards/timing/TimingSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRestaurantById } from '../../store/slices/restaurantSlice';

const RestaurantPage = () => {
  const dispatch = useDispatch();
  const {restaurant} = useSelector((state)=>state.restaurant);
  const MDonalId = "67494b84ebaef9e2d17b7e3c"

  console.log(restaurant)
  
  useEffect(()=>{
    dispatch(getRestaurantById(MDonalId))
  },[dispatch])


  return (
    <>
       <Navbar/>
        <TimingSection/>
        <LocationMap/>
        <CustomerReviews/>
        <RestaurantsCards/>
       <Footer/>

         
    </>
  )
}

export default RestaurantPage