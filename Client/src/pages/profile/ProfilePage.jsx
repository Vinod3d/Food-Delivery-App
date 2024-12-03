import { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import styles from "./profile.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../store/slices/userSlice";
// import { PaymentCardComponent } from "./PaymentCardComponent";
// import PaymentCardsPage from "./PaymentCardPage";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userData = user?.user;

  const [profile, setProfile] = useState({
    name: userData?.name,
    email: userData?.email,
    gender: userData?.gender,
    country: userData?.country,
    profile_image: userData?.profile_image,
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (user) {
      try {
        const updateResponse = await dispatch(updateUser(profile, user?.user._id));
        if (updateResponse) {
          dispatch(getUser());
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };
  

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Navbar/>
      <div className="container">
        {/* Header */}
        <div className={styles.pageHeader}>
          <button>
            <FaArrowLeft />
          </button>
          <h1 className={styles.pageTitle}>My Profile</h1>
          {isEditing ? (
            <button onClick={handleSave} className={styles.buttonGroup}>
              Save
            </button>
          ) : (
            <button className={styles.buttonGroup} onClick={toggleEdit}>
              Edit
            </button>
          )}
        </div>

        <ProfileSection
          isEditing={isEditing}
          profile={profile}
          setProfile={setProfile}
        />

        {/* Payment Cards Section */}
        {/* <PaymentCardsPage/> */}
      </div>
      <Footer/>
    </>
  );
}
