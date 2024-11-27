import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage } from "../../store/slices/imageSlice.js";
import Styles from './sideImage.module.css'

const AuthSideImage = () => {
    const dispatch = useDispatch()
    const {image, loading} = useSelector((state)=>state.image);

    useEffect(()=>{
        dispatch(getImage("authImg"));
    }, [dispatch]);
  return (
    <>
        {
            loading ? (
                <div id={Styles.skeleton}>
                    <div className={Styles.wrapper}>
                    <div className={`${Styles.element} ${Styles.box}`} data-id="0"></div>

                </div>
                </div>
            ) : (
                image.filter((img) => img.name === 'authImg').map((img) => (
                    <div key={img._id}>
                        <img 
                            src={img.imageUrl.url} 
                            alt={img.name} 
                            style={{ width: "100%" }} 
                        />
                    </div>
                ))
            )
        }
         
    </>
  )
}

export default AuthSideImage