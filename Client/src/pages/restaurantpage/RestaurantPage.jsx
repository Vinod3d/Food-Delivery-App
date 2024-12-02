import { useDispatch, useSelector } from 'react-redux';
import styles from './restaurant.module.css'
import { useEffect } from 'react';
import { getImage } from '../../store/slices/imageSlice';

const RestaurantPage = () => {
  const dispatch = useDispatch()
    const {image, loading} = useSelector((state)=>state.image);

    useEffect(()=>{
        dispatch(getImage("authImg"));
    }, [dispatch]);
  return (
    <>
       {

                image.filter((img) => img.name === 'construction').map((img) => (
                    <div key={img._id}>
                        <img 
                            src={img.imageUrl.url} 
                            alt={img.name} 
                            style={{ width: "60%",  }} 
                        />
                    </div>
                ))
       }

         
    </>
  )
}

export default RestaurantPage