export default function HamMenu({ onClick, isOpen, className }) {
    return (
        <span
            onClick={onClick}
            className={`absolute inline-flex z-10 w-10 h-10 opacity-70 rounded-full hover:opacity-100 md:hidden flex items-center justify-center ${className}`}
        >
            <span className="w-8 h-6 flex flex-col justify-between hover:cursor-pointer">
                <span className={`bg-[#777c76] h-[3px] transition-all duration-400 w-full origin-center ${isOpen ? "opacity-0" : "translate-y-[6px] rotate-[-4deg]"}`}></span>
                <span className={`bg-[#777c76] h-[3px] transition-all duration-400 w-full origin-center ${isOpen ? "rotate-45 w-8 translate-y-[5px]" : "translate-y-[3px] rotate-[2deg]"}`}></span>
                <span className={`bg-[#777c76] h-[3px] transition-all duration-400 w-full origin-center ${isOpen ? "rotate-[-45deg] w-8 -translate-y-[6px]" : "rotate-[-2deg]"}`}></span>
            </span>
        </span>
    )
}