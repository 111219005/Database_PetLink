import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux'; // 別忘了引入 useSelector
import { selectLightMode } from "../redux/colorSlice.js";

export default function UserInfo(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const lightMode = useSelector(selectLightMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const goToProfile = () => {
    if (user) {
      navigate('/Profile');
    } else {
      navigate('/LogIn');
    }
  };

  const displayName = user ? user.displayName || user.email : null;

  return (
    <nav
      onClick={goToProfile}
      style={{ ...props.style }}
      className="cursor-pointer flex flex-col items-center group"
    >
      <svg
        viewBox="0 0 25 25"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-[25px] h-[25px] md:w-[15px] md:h-[15px] ${lightMode
            ? 'text-black hover:text-[#7392B9]'
            : 'text-white hover:text-[#FAAA5D]'
          }`}
      >
        <path d="M12.5 12.5C15.9531 12.5 18.75 9.70313 18.75 6.25C18.75 2.79687 15.9531 0 12.5 0C9.04687 0 6.25 2.79687 6.25 6.25C6.25 9.70313 9.04687 12.5 12.5 12.5ZM12.5 15.625C8.32812 15.625 0 17.7187 0 21.875V25H25V21.875C25 17.7187 16.6719 15.625 12.5 15.625Z" />
      </svg>

      <p className="hidden md:block text-[0.5rem] md:text-[0.7rem] opacity-60 mt-[-0.2rem] md:mt-[0.3rem] text-current">
        {displayName ? `Hi, ${displayName}` : '請登入'}
      </p>
    </nav>
  );
}
