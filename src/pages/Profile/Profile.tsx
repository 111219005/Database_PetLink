import { useNavigate } from 'react-router'; 
import '../Profile/Profile.css';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { auth } from '../../api/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

export default function Profile() {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [avatarSeed] = useState<number>(() => Math.floor(Math.random() * 10000));
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/login');
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
            <div className="back" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img className="arrow"
                    src={isHover ? '/img/arrow-hover.png' : '/img/arrow.png'}
                    alt="返回箭頭"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)} />
            </div>
            <motion.div
                className="area"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            >
                <div className="card-header">
                    個人資訊
                </div>
                <div className="card-body">
                    <div className="avatar-bg">
                        <img
                            className="avatar-img"
                            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${avatarSeed}`}
                            alt="使用者大頭貼"
                        />
                    </div>
                    <div className="user-info">
                        <p className="user-name">{user?.displayName || "使用者"}</p>
                        <p className="user-email">{user?.email}</p>
                        <motion.button
                            className="btn signout-btn"
                            type="button"
                            onClick={handleSignOut}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            登出
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
