import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectLightMode, setColorMode } from "../redux/colorSlice";
import { useEffect, useState } from "react";
import HamMenu from "./HamMenu";
import CartSummary from "./CartSummary";
import SetColorMode from "./SetColorMode";
import UserInfo from "./UserInfo";

const NavBarContent = ({ isMobile = false, onToggleTheme }) => (
    <div
        className={`navbar-bg ${
            isMobile ? "flex flex-col gap-4 p-4 ms-15 max-w-[50%]" : "grid md:grid-cols-2 px-30 py-2"
        } w-full ${
            isMobile ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
    >
        <Link to="/" className="nav-h text-[20px] w-[40px]">首頁</Link>
        <div
            className={`${
                isMobile ? "flex flex-col items-start gap-4 w-full" : "flex justify-end items-center gap-4"
            }`}
        >
            {!isMobile && <SetColorMode onToggleTheme={onToggleTheme} />}
            <Link to="/cart" className="box"><CartSummary /><div className="box-word">收藏</div></Link>
            <div className="box"><UserInfo /><div className="box-word">用戶資訊</div></div>
            {isMobile && <SetColorMode onToggleTheme={onToggleTheme} />}
        </div>
    </div>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const lightMode = useSelector(selectLightMode);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const isLightMode = savedTheme === "light";
        dispatch(setColorMode(isLightMode));
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, [dispatch]);

    const toggleTheme = () => {
        const newTheme = lightMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        dispatch(setColorMode(!lightMode));
    };

    return (
        <>
            {/* 桌面導覽列 */}
            <div className="hidden md:flex justify-around bg-blue">
                <NavBarContent onToggleTheme={toggleTheme} />
            </div>

            {/* 手機導覽列 */}
            <div className="md:hidden !navbar-bg">
                <HamMenu
                    className="absolute top-1 left-2 z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    isOpen={isOpen}
                />
                <div
                    className={`fixed top-0 left-0 z-40 h-full w-64 bg-white p-4 transform transition-transform duration-300 ${
                        isOpen ? "translate-x-0 navbar-bg" : "-translate-x-full navbar-bg"
                    }`}
                >
                    <h2 className="text-xl font-bold mt-15 ms-10">Menu</h2>
                    <NavBarContent isMobile onToggleTheme={toggleTheme} />
                </div>
                {isOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}
            </div>
        </>
    );
}
