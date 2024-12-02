import { useEffect, useState } from "react";
import {  FaPlus } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import styles from "./address.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAddresses, removeAddress, updateAddress } from "../../store/slices/addressSlice";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";



export default function AddressesPage() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const {addresses} = useSelector((state)=>state.address);
  const userId = user?.user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getAddresses(userId));
    }
  }, [user, dispatch, userId]);


  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = async (data) => {
    console.log(data)
    const newAddress = {
      ...data,
      isDefault: addresses.length === 0,
      userId: user._id,
    };
    const success = await dispatch(addAddress(newAddress));
    if (success) {
      dispatch(getAddresses(userId));
    }
  };

  const handleEditAddress = (data) => {
    if (!editingAddress) return;
    dispatch(updateAddress({ id: editingAddress._id, data }));
  };

const handleRemoveAddress = async (id) => {
  const success = await dispatch(removeAddress(id));
    if (success) {
      dispatch(getAddresses(userId));
    }
};

const handleSetDefault = async (id) => {
  const success = await dispatch(updateAddress({
    id: id,
    data: { is_default: true }
  }));
  if (success) {
    dispatch(getAddresses(userId)); 
  }
};

  const handleOpenForm = (address = null) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingAddress(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (editingAddress) {
      handleEditAddress(data);
    } else {
      handleAddAddress(data);
    }
    handleCloseForm();
  };

  return (
    <>
      <Navbar/>
      <div className="container" style={{minHeight: '70vh'}}>
        <div className={styles.header}>
          <button className={styles.iconButton}>
            <FaArrowLeft />
          </button>
          <h1 className={styles.title}>Your Addresses</h1>
        </div>

        <div className={styles.grid}>
          <button className={styles.addAddress} onClick={() => handleOpenForm()}>
            <FaPlus className={styles.icon}/>
            <span>Add Address</span>
          </button>

          {
            addresses?.map((address) => (
            
            <div
              key={address._id}
              className={`${styles.card} ${
                address.is_default ? styles.defaultCard : ""
              }`}
            >
              {address.is_default && <span className={styles.defaultBadge}>Default</span>}
              <h2 className={styles.cardTitle}>{user?.user?.name}</h2>
              <p>
                {address.full_address },{" "} 
                {address.city}, {address.state}, {address.pincode}, india
              </p>
              <p>Phone Number: {address.phone_number}</p>
              <div className={styles.btnGroup}>
                <button
                  className={styles.editButton}
                  onClick={() => handleOpenForm(address)}
                >
                  Edit
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveAddress(address._id)}
                >
                  Remove
                </button>
                {!address.is_default && (
                  <button
                    className={styles.defaultButton}
                    onClick={() => handleSetDefault(address._id)}
                  >
                    Set as Default
                  </button>
              )}
              </div>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <p className={styles.formTitle}>
              <GrLocation />{editingAddress ? "Edit Address" : "Add Address"}
              </p>
              <form className={styles.form} onSubmit={handleFormSubmit}>
              <input
                  name="state"
                  defaultValue={editingAddress?.state || ""}
                  placeholder="State"
                  required
                  className={styles.input}
                />
                <input
                  name="city"
                  defaultValue={editingAddress?.city || ""}
                  placeholder="City"
                  required
                  className={styles.input}
                />

                <input
                  name="pincode"
                  defaultValue={editingAddress?.pincode || ""}
                  placeholder="Pin Code"
                  required
                  className={styles.input}
                />
                <input
                  name="phone_number"
                  defaultValue={editingAddress?.phone_number || ""}
                  placeholder="Phone Number"
                  required
                  className={styles.input}
                />
                <textarea
                  name="full_address"
                  defaultValue={editingAddress?.full_address || ""}
                  placeholder="Street Address"
                  required
                  rows={4}
                  cols={10}
                  className={`${styles.input} ${styles.textarea}`}
                />

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {editingAddress ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}
