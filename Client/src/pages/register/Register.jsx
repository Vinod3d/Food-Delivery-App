import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './register.module.css';
import { logo1 } from '../../assets/Index.js';
import AuthSideImage from '../../components/sideImg/AuthSideImage.jsx';
import Footer from '../../components/footer/Footer.jsx';
import { clearErrors, clearMessage, registerUser } from '../../store/slices/userSlice.js';
import { toast } from 'react-toastify';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      password: '',
  });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (error) {
        toast.error(error); 
        dispatch(clearErrors());
    }
    if (message) {
        toast.success(message);
        dispatch(clearMessage());
        setFormData({ name: '', phone: '', email: '', password: '' });
        navigate("/login")
    }
}, [ error, message, navigate, dispatch]);
  return (
    <>
      <div className={styles.loginContainer}>
        <main className={styles.loginMain}>
            <div className={styles.formContainer}>
            <div>
                <div className={styles.logo}>
                    <img
                        src={logo1}
                        alt="Order Logo"
                    />
                </div>
                <h1 className={styles.headerText}>Welcome 👋</h1>
                <p className={styles.subText}>
                Today is a new day. It&apos;s your day. You shape it. Sign in to start ordering.
                </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <label htmlFor="name" className={styles.inputLabel}>Name</label>
                  <input
                      id="name"
                      type="text"
                      placeholder="eg. John A"
                      className={styles.inputField}
                      value={formData.name}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="phone" className={styles.inputLabel}>Phone Number</label>
                  <input
                      id="phone"
                      type="text"
                      placeholder="Enter Your 10 digit mobile number"
                      className={styles.inputField}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="email" className={styles.inputLabel}>Email</label>
                  <input
                      id="email"
                      type="email"
                      placeholder="Example@email.com"
                      className={styles.inputField}
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="password" className={styles.inputLabel}>Password</label>
                  <input
                      id="password"
                      type="password"
                      placeholder="At least 8 characters"
                      className={styles.inputField}
                      value={formData.password}
                      onChange={handleChange}
                      required
                  />
                </div>
                <button
                  type="submit"
                  className={styles.signInButton}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <div className={styles.signUpText}>
                Already have an account?{" "}
                <button className={styles.link} onClick={()=>navigate('/login')}> Sign In</button>
            </div>
            </div>

            <div className={styles.sideImage}>
            <AuthSideImage/>
            </div>
        </main>
        </div>
        <Footer/>
    </>
  );
}
