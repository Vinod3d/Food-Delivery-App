import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { logo1 } from '../../assets/Index.js';
import AuthSideImage from '../../components/sideImg/AuthSideImage.jsx';
import Footer from '../../components/footer/Footer.jsx';
import { clearErrors, clearMessage, loginUser } from '../../store/slices/userSlice.js';
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, message, } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);
            navigate('/');
            dispatch(clearMessage());
        }
    }, [error, message, navigate, dispatch]);
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
                <h1 className={styles.headerText}>Welcome Back 👋</h1>
                <p className={styles.subText}>
                Today is a new day. It&apos;s your day. You shape it. Sign in to start ordering.
                </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                    {loading ? 'Signing In...' : 'Sign in'}
                </button>
            </form>
            <div className={styles.signUpText}>
                Don&apos;t you have an account?{" "}
                <button 
                    className={styles.link} 
                    onClick={()=>navigate('/register')}
                >Sign up</button>
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
