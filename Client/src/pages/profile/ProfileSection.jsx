/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { profilePic } from "../../assets/Index.js";

export default function ProfileSection({ isEditing, profile, setProfile }) {
  const [imagePreview, setImagePreview] = useState(profilePic);

  useEffect(() => {
    let objectUrl;

    if (profile?.profile_image instanceof File) {
      // For new uploads
      objectUrl = URL.createObjectURL(profile.profile_image);
      setImagePreview(objectUrl);
    } else if (typeof profile?.profile_image === "string" && profile.profile_image) {
      // For previously uploaded images (URL or path)
      setImagePreview(profile.profile_image);
    } else {
      // Fallback to default profile picture
      setImagePreview(profilePic);
    }

    // Cleanup
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [profile.profile_image]);

  const handleImageUpload = (e, name) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        [name]: file, // Store the File object
      }));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          <label htmlFor="profile_image">
            <img
              src={imagePreview}
              alt="Profile Avatar"
              style={{ cursor: isEditing ? "pointer" : "default" }}
            />
            <input
              id="profile_image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(e, "profile_image")}
              disabled={!isEditing}
            />
          </label>
        </div>
      </div>
      <div className={styles.profileFields}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            value={profile.name}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            value={profile.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={profile.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={styles.inputField}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            value={profile.country}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={styles.inputField}
          />
        </div>
      </div>
    </div>
  );
}
