import { useState } from "react";
import React, { useEffect } from 'react';
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItems, selectCartItems } from "../redux/cartSlice";
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import CartHeader from "../components/CartHeader";
import DonateBox from "../components/DonateBox";
import CancelIcon from "../components/CancelIcon";

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const getTotalPrice = () => {
        return Object.entries(donationValues)
            .filter(([cartKey]) => selectedItems[cartKey])
            .reduce((sum, [cartKey, values]) => {
                return sum + values.food + values.daily + values.medical + values.train;
            }, 0);
    };

    const [selectedItems, setSelectedItems] = useState(() => {
        const saved = localStorage.getItem('selectedItems');
        if (saved) return JSON.parse(saved);
        // 若無資料則預設全部未選
        return cartItems.reduce((acc, item) => {
            acc[item.cartKey] = false;
            return acc;
        }, {});
    });

    useEffect(() => {
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }, [selectedItems]);

    useEffect(() => {
        // 只保留還存在於 cartItems 的 key
        setSelectedItems(prev => {
            const validIds = new Set(cartItems.map(item => item.cartKey));
            const updated = {};
            for (const cartKey in prev) {
                if (validIds.has(cartKey)) {
                    updated[cartKey] = prev[cartKey];
                }
            }
            return updated;
        });
    }, [cartItems]);

    const handleCheckboxChange = (cartKey) => {
        setSelectedItems({
            ...selectedItems,
            [cartKey]: !selectedItems[cartKey], // 切換選中狀態
        });
    };

    // Removed duplicate donationValues state initialization

    const getInitialDonationValues = () => {
        const values = {};
        cartItems.forEach(item => {
            const saved = localStorage.getItem(`${item.cartKey}`);
            if (saved) {
                values[item.cartKey] = JSON.parse(saved);
            } else {
                values[item.cartKey] = {
                    food: parseInt((item.food ?? '').replace('$', '')) || 0,
                    daily: parseInt((item.daily ?? '').replace('$', '')) || 0,
                    medical: parseInt((item.medical ?? '').replace('$', '')) || 0,
                    train: parseInt((item.train ?? '').replace('$', '')) || 0,
                };
            }
        });
        return values;
    };

    const [donationValues, setDonationValues] = useState(getInitialDonationValues());

    const allSelected = cartItems.length > 0 && cartItems.every(item => selectedItems[item.cartKey]);
    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        const newSelected = {};
        cartItems.forEach(item => {
            newSelected[item.cartKey] = checked;
        });
        setSelectedItems(newSelected);
    };

    console.log(cartItems);

    return (
        <div className="cart-bg">
            <Navbar />
            <TopBar />
            <div className="md:flex justify-center items-center hidden">
                <div className="cart-bg cart-title mt-5 md:w-[644px]">
                    <h1 className="text-black">收藏清單</h1>
                </div>
            </div>
            <div className="h-6 md:h-3"></div>
            <CartHeader allSelected={allSelected} onSelectAllChange={handleSelectAllChange} />

            <div className="flex flex-col items-center md:w-full mx-3 md:mx-0">
                <div className="flex flex-col items-center w-fit">
                    {/* Cart Items */}
                    {cartItems.length === 0 ? (
                        <div className="flex justify-center items-center md:h-90 h-80"><h2>Cart is empty</h2></div>
                    ) : (
                        cartItems.map(item => (
                            <>
                                <li key={item.cartKey} className={`relative cart-item-grid grid justify-between items-center py-5 px-5 lg:py-[25px] lg:px-12 mb-4 cart-item md:w-[644px] rounded-md ${selectedItems[item.cartKey] ? "cart-item-yes" : "cart-item-no"}`}>
                                    <div className=" flex items-center flex-row justify-between lg:justify-start md:justify-center">
                                        <input type="checkbox" className="checkbox checkbox-item checkbox-sm" checked={selectedItems[item.cartKey]} onChange={() => handleCheckboxChange(item.cartKey)} />
                                        <Link to={item.species === "cat" ? `/cat/${item.id}` : `/dog/${item.id}`}>
                                            <img className="z-99 w-[204px] h-[119px] lg:w-[139px] xl:w-[170px] lg:h-[100px] rounded-sm flex-1 object-cover" src={item.image || item.cover} alt={item.name} />
                                        </Link>
                                    </div>

                                    <div className="ml-8 md:ml-6 lg:ml-4 flex-8 w-fit text-left col-span-1">
                                        <div className="text-[18px] md:text-[20px] mb-1 w-fit">{item.name}</div>
                                        <div className="text-[10px] md:text-[15px] mb-1 w-fit">{item.area}</div>
                                        <div className="text-[10px] md:text-[15px] w-fit">{item.personality}</div>
                                    </div>

                                    <div className="col-span-3">
                                        <DonateBox
                                            item={item}
                                            values={donationValues[item.cartKey]}
                                            setValues={(newValues) =>
                                                setDonationValues((prev) => ({
                                                    ...prev,
                                                    [item.cartKey]: newValues,
                                                }))
                                            }
                                            selected={selectedItems[item.cartKey]}
                                        />
                                    </div>
                                    {/* <div className="xl:col-span-3 flex justify-center items-center">test</div> */}
                                    <div className="absolute right-5 top-5 md:right-8 text-xl cursor-pointer lg:hidden" onClick={() => dispatch(removeCartItems(item.cartKey))}>
                                        <CancelIcon size={25} />
                                    </div>
                                </li>
                            </>
                        ))
                    )}

                    <div className="cart-Checkout fixed bottom-0 w-full flex md:flex-row flex-col md:p-4 px-10 md:justify-end justify-center md:items-center items-end md:relative h-[154px] md:h-18 md:w-[644px] rounded-md">

                        <div className="flex flex-row justify-between w-full md:w-auto md:justify-end">
                        <div className="md:hidden">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-header checkbox-sm"
                                checked={allSelected}
                                onChange={handleSelectAllChange}
                            />
                            <a className="pl-1 md:pl-5">全選</a>
                        </div>
                        {/* Total */}
                        <div className="flex justify-between items-center me-3">
                            <div className="text-[10px] md:text-[20px]">總金額 (已選{Object.values(selectedItems).filter(Boolean).length})：</div>
                            <div className="text-[15px] md:text-[30px]">${getTotalPrice()}</div>
                        </div>
                        </div>

                        {/* Checkout Button */}
                        <motion.button
                            className="checkout-btn shadow-none !w-50 h-10 text-base flex justify-center items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {/* <CartIcon strokeWidth={1} className="w-5 h-5 md:w-6 md:h-6 text-current group-hover:scale-105 transition-transform" /> */}
                            <span className="text-[20px] cursor-pointer">去轉帳</span>
                        </motion.button>
                    </div>
                    <div className="h-[114px] md:hidden"></div>
                </div>
            </div>

            <div className="h-10"></div>
            <Footer />
        </div>
    )
}