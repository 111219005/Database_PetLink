import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";
import CartIcon from "./CartIcon";

function CartSummary() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useSelector(selectCartItems);

    // 計算購物車中的商品總數
    const count = cartItems.length;

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <nav onClick={toggleOpen} className="relative cursor-pointer">
            <div className="relative">
                {count > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 count-bg text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
                        {count}
                    </span>
                )}
                <CartIcon size={25} className="text-gray-800" />
            </div>
        </nav>
    );
}

export default CartSummary;
