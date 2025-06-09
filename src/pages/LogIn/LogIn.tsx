import { Link, useNavigate } from 'react-router';
import './LogIn.css';
import { useEffect, useState, FormEvent } from 'react';
import { motion } from "framer-motion";

export default function LogIn() {
    const [isHover, setIsHover] = useState(false);
    const [eyeHover, setEyeHover] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        // @ts-ignore 忽略 window.firebase 的型別檢查
        window.firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential: any) => {
                console.log("登入成功：", userCredential.user);
                alert("登入成功！");
                navigate("/");
            })
            .catch((error: any) => {
                alert("登入失敗：" + error.message);
            });
    };

    const signInWithGoogle = () => {
        // @ts-ignore 忽略 window.firebase 的型別檢查
        const provider = new window.firebase.auth.GoogleAuthProvider();
        // @ts-ignore
        window.firebase.auth()
            .signInWithPopup(provider)
            .then((result: any) => {
                console.log('Google 登入成功', result.user);
                alert('Google 登入成功！');
                navigate('/');
            })
            .catch((error: any) => {
                console.error('Google 登入錯誤', error);
                alert('Google 登入失敗：' + error.message);
            });
    };

    return (
        <motion.div
            className="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <img className="bg" src="/img/nature.png" alt="背景圖片" />
            <div
                className="back"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img
                    className="arrow"
                    src={isHover ? '/img/arrow-hover.png' : '/img/arrow.png'}
                    alt="返回箭頭"
                />
                <h2 className="LogIn-h" style={{ color: isHover ? '#9a9590' : 'black' }}>
                    登入
                </h2>
            </div>

            <motion.form
                className="area"
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            >
                <div className="name">
                    <label htmlFor="name">電子郵件</label>
                    <input
                        type="email"
                        id="name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="code">
                    <label htmlFor="password">密碼：</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <img
                        src={eyeHover ? '/img/eye-hover.png' : '/img/eye.png'}
                        className="eye"
                        alt={showPassword ? "隱藏密碼" : "顯示密碼"}
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseEnter={() => setEyeHover(true)}
                        onMouseLeave={() => setEyeHover(false)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <div className="function">
                    <h6 className="forget">忘記密碼？</h6>
                    <Link to="/SignUp">
                        <h6 className="regist">註冊</h6>
                    </Link>
                </div>
                <div className="btn1">
                    <motion.button
                        className="LogIn"
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        登入
                    </motion.button>
                </div>
                <div className="sociallogin">
                    <div className="divider">
                        <div className="line"></div>
                        <span>or</span>
                        <div className="line"></div>
                    </div>
                    <div className="socialbuttons">
                        <a href="#" className="social-button">
                            <img src="/img/facebook-icon.png" alt="Facebook" />
                        </a>
                        <a href="#" className="social-button">
                            <img src="/img/google-icon.png" alt="Google" onClick={signInWithGoogle} />
                        </a>
                        <a href="#" className="social-button">
                            <img src="/img/apple-icon.png" alt="Apple" />
                        </a>
                    </div>
                </div>
            </motion.form>
        </motion.div>
    );
}
