import { Link, useNavigate } from 'react-router';
import './SignUp.css';
import { useState } from 'react';
import { motion } from "framer-motion";
import { auth } from '../../api/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignUp() {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('密碼與確認密碼不一致！');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: username,
            });

            await user.reload();

            console.log('註冊成功：', user);
            alert('註冊成功！');
            navigate('/');
        } catch (error: any) {
            console.error('註冊失敗：', error);
            alert('註冊失敗：' + error.message);
        }
    };

    return (
        <motion.div
            className="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <img className="bg" src="/img/nature.png" alt="背景圖片" />

            <div className="back" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
                <img className="arrow"
                    src={isHover ? '/img/arrow-hover.png' : '/img/arrow.png'}
                    alt="返回箭頭" />
                <h2 className="SignUp-h" style={{ color: isHover ? '#9a9590' : 'black' }}>註冊</h2>
            </div>

            <motion.form
                className="area"
                onSubmit={handleSignUp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            >
                <div className="name">
                    <label htmlFor="name">使用者名稱</label>
                    <input
                        type="text"
                        id="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="email">
                    <label htmlFor="email">電子信箱</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="code">
                    <label htmlFor="password">密碼</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <img
                        src="/img/eye.png"
                        className="eye"
                        alt={showPassword ? "隱藏密碼" : "顯示密碼"}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className="sure">
                    <label htmlFor="password2">確認密碼</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="password2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <img
                        src="/img/eye.png"
                        className="eye"
                        alt={showConfirmPassword ? "隱藏密碼" : "顯示密碼"}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className="function">
                    <Link to="/LogIn">
                        <h6 className="sign">登入</h6>
                    </Link>
                </div>

                <div className="btn2">
                    <motion.button
                        className="SignUp"
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        註冊
                    </motion.button>
                </div>
            </motion.form>
        </motion.div>
    );
}
