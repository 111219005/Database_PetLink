import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartItems, removeCartItems } from "../redux/cartSlice";
import CancelIcon from "./CancelIcon";

export default function DonateBox({ item, values, setValues, selected }) {
  const dispatch = useDispatch();

  // 每次 input 金額變動就同步到 redux
  useEffect(() => {
    dispatch(addCartItems({
      ...item,
      food: `$${values.food}`,
      daily: `$${values.daily}`,
      medical: `$${values.medical}`,
      train: `$${values.train}`,
    }));
    // eslint-disable-next-line
  }, [values]);

  const handleIncrement = (type) => {
    setValues({
      ...values,
      [type]: values[type] + 100,
    });
  };

  const handleDecrement = (type) => {
    setValues({
      ...values,
      [type]: values[type] > 0 ? values[type] - 100 : 0,
    });
  };

  const handleInputChange = (type, e) => {
    let value = parseInt(e.target.value) || 0;
    if (value < 0) value = 0;
    setValues({
      ...values,
      [type]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem(`donation-${item.cartKey}`, JSON.stringify(values));
  }, [values, item.cartKey]);

  const typeLabels = {
    food: "食物",
    daily: "生活用品",
    medical: "醫療",
    train: "娛樂訓練",
  };

  return (
    <div className="grid lg:grid-cols-5 lg:items-center lg:justify-center w-auto">
      <div className="grid lg:grid-cols-4 lg:col-span-4 lg:items-center lg:justify-center wrapper">
        {['food', 'daily', 'medical', 'train'].map((type) => (
          <div key={type} className="flex flex-col items-center justify-center">
            <div className="h-3"></div>
            <div className={`flex items-center justify-start w-fix lg:hidden mt-3 mb-1.5 ${selected ? "cart-label-select" : "cart-label"}`}>{typeLabels[type] || type}</div>
            <div className="flex lg:items-center lg:justify-between mb-2">
              <button onClick={() => handleDecrement(type)} className="text-black py-1 rounded w-4 donate h-[44px] cursor-pointer">-</button>
              <input
                type="number"
                min="0"
                value={values[type]}
                onChange={(e) => handleInputChange(type, e)}
                className="w-19 lg:w-12 text-center donate rounded mx-1 text-black py-1 h-[44px] text-[13px] no-spinner"
              />
              <button onClick={() => handleIncrement(type)} className="donate text-black py-1 rounded w-4 h-[44px] cursor-pointer">+</button>
            </div>
            <div className="need text-[10px] flex lg:items-center lg:justify-center">
              需求：{item[type]}
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl cursor-pointer lg:flex lg:justify-center lg:items-center hidden" onClick={() => dispatch(removeCartItems(item.cartKey))}>
        <CancelIcon size={25} />
      </div>
    </div>

  );
}
