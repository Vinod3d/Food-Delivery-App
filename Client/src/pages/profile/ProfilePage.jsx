import { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import styles from "./profile.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, updateUser } from "../../store/slices/userSlice";
// import { PaymentCardComponent } from "./PaymentCardComponent";
import PaymentCardsPage from "./PaymentCardPage";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
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

  const handleLogout = async()=>{
    const confirmed = window.confirm("Are you sure you want to logout");
    if (!confirmed) return;

    dispatch(logout());
    navigate('/');
  }
  

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Navbar/>
      <div className="container">
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.btnGroup}>

            <button className={styles.headerIcon}>
              <FaArrowLeft />
            </button>
            <p className={styles.pageTitle}>My Profile</p>
          </div>
          <div className={styles.btnGroup}>

            {isEditing ? (
              <button onClick={handleSave} className={styles.buttonGroup}>
                Save
              </button>
            ) : (
              <button className={styles.buttonGroup} onClick={toggleEdit}>
                Edit
              </button>
            )}
            <button className={styles.logOutBtn} onClick={handleLogout}>
                Logout
              </button>
          </div>
        </div>

        <ProfileSection
          isEditing={isEditing}
          profile={profile}
          setProfile={setProfile}
        />

        {/* Payment Cards Section */}
        <PaymentCardsPage/>
      </div>
      <Footer/>
    </>
  );
}
