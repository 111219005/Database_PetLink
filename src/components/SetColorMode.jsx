import ModeIcon from "./ModeIcon";
import { useSelector, useDispatch } from "react-redux";
import { selectLightMode, setColorMode } from "../redux/colorSlice.js";

export default function SetColorMode() {
    const lightMode = useSelector(selectLightMode); // 從 Redux 取得當前模式
    const dispatch = useDispatch();

    const toggleColor = () => {
        dispatch(setColorMode(!lightMode)); // 更新 Redux 狀態
        document.documentElement.setAttribute(
            "data-theme",
            lightMode ? "dark" : "light"
        ); // 更新 HTML 標籤的 data-theme
    };

    console.log("Current mode:", lightMode ? "Light" : "Dark");

    return (
        <div className="flex justify-center items-center box">
            <button
                onClick={toggleColor}
                className="text-black hover:text-[#7392B9] transition-colors duration-300 cursor-pointer"
            >
                {lightMode ? (
                    <ModeIcon size={25} /> // Dark Mode 圖示
                ) : (
                    <img
                        src="/img/sun.svg"
                        alt="light mode"
                        className="transition duration-300"
                        onMouseEnter={(e) => e.currentTarget.src = "/img/sun-dark.svg"}
                        onMouseLeave={(e) => e.currentTarget.src = "/img/sun.svg"}
                    />

                )}
            </button>
            <div className="box-word">{lightMode ? "深色模式" : "淺色模式"}</div>
        </div>
    );
}
