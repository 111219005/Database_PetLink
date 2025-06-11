import './PetDetail.css';
import Navbar from '../../components/Navbar';
import AddToBasket from '../AddToBasket';
import Footer from '../../components/Footer/Footer';
import ModifyIcon from '../ModifyIcon';
import DeleteIcon from '../DeleteIcon';
import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addCartItems } from "../../redux/cartSlice";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectLightMode } from "../../redux/colorSlice";
import DeleteBox from '../DeleteBox';
import { useEffect, useRef, useState } from "react";

// 定義 Product 型別
interface Expence {
  name: string;
  amount: string | number;
}

interface Product {
  id: string;
  species: string;
  name: string;
  cover: string;
  area: string;
  personality: string;
  breed: string;
  gender: string;
  age_range: string;
  size: string;
  furColor: string;
  health: string;
  food: string;
  daily: string;
  medical: string;
  train: string;
  comment: string;
  price: number;
  cartKey: string;
  expences?: Expence[];
}

// 定義 props
interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lightMode = useSelector(selectLightMode);

  const [atBottom, setAtBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // content底部 <= 視窗底部 + 5px
      setAtBottom(rect.bottom <= windowHeight - 5);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdoptNow = () => {
    // 建議 cartKey 統一用 `${product.species}-${product.id}`
    const cartKey = `${product.species}-${product.id}`;
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    let exists = cartItems.some((item: any) => item.cartKey === cartKey);

    if (!exists) {
      const newItem = { ...product, cartKey };
      cartItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      dispatch(addCartItems(newItem));
    }

    // 預設選取
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems") || "{}");
    selectedItems[cartKey] = true;
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

    // 預設 donation
    localStorage.setItem(
      `donation-${cartKey}`,
      JSON.stringify({
        food: parseInt(product.food?.replace('$', '') || '0') || 0,
        daily: parseInt(product.daily?.replace('$', '') || '0') || 0,
        medical: parseInt(product.medical?.replace('$', '') || '0') || 0,
        train: parseInt(product.train?.replace('$', '') || '0') || 0,
      })
    );
    navigate("/cart");
  };

  const handleDelete = async () => {
    if (window.confirm("確定要刪除這筆資料嗎？")) {
      try {
        const res = await fetch(`http://localhost:5000/api/pets/${product.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("刪除成功！");
          navigate("/"); // 或導回你想要的頁面
        } else {
          alert("刪除失敗！");
        }
      } catch (err) {
        alert("刪除時發生錯誤！");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="content relative" ref={contentRef}>
        <div className="detail-top">
          <div className="detail-img">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              src={
                product.cover?.startsWith("http")
                  ? product.cover
                  : `http://localhost:5000/${product.cover.replace(/^upload[\\/]/, "upload/")}`
              }
              alt={product.name}
              className="detail-img-img"
            />
          </div>

          <div className="detail-c">
            <motion.h1
              className="detail-c-name"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {product.name}
            </motion.h1>

            <motion.h3
              className="detail-c-key"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {product.area} | {product.personality}
            </motion.h3>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                基本資料
              </motion.div>

              <div className="info-grid">
                <div className="label">品種</div><div className="value">{product.breed}</div>
                <div className="label">性別</div><div className="value">{product.gender}</div>
                <div className="label">年齡</div><div className="value">{product.age_range}</div>
                <div className="label">體型</div><div className="value">{product.size}</div>
                <div className="label">毛色</div><div className="value">{product.furColor}</div>
                <div className="label">健康狀況</div><div className="value">{product.health}</div>
              </div>

              <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                領養需求(每月)
              </motion.div>

              <div className="info-grid">
                {product.expences && product.expences.map((exp, idx) => (
                  <React.Fragment key={idx}>
                    <div className="label">{exp.name}</div>
                    <div className="value">${exp.amount}</div>
                  </React.Fragment>
                ))}
              </div>

              <motion.div
                className="btn-group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  style={{ flex: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AddToBasket className="btn btn-secondary w-full" product={product} />
                </motion.div>

                <motion.button
                  className="btn btn-primary"
                  style={{ flex: 1, width: "100%" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={handleAdoptNow}
                >
                  直接認養
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="detail-comment"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="detail-comment-h"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            飼主的話
          </motion.h3>

          <motion.div className="detail-comment-c">
            {product.comment}
          </motion.div>
        </motion.div>

        <div className="flex gap-5"
          style={
            atBottom
              ? {
                position: "absolute",
                right: 20,
                bottom: 20,
                zIndex: 10,
              }
              : {
                position: "fixed",
                right: 20,
                bottom: 20,
                zIndex: 10,
              }
          }>
          {/* 修改按鈕 */}
          <Link to={`/modifyPet/${product.id}`}>
            <div
              className={`cursor-pointer p-3 rounded-full ${lightMode ? "bg-white text-black hover:text-[#C41616]" : "bg-[#98694E] text-white hover:text-[#C41616]"
                }`}
            >
              <ModifyIcon size={25} />
            </div>
          </Link>

          {/* 刪除按鈕 */}
          <div
            className={`cursor-pointer p-3 rounded-full ${lightMode ? "bg-white text-black hover:text-[#C41616]" : "bg-[#98694E] text-white hover:text-[#C41616]"
              }`}
            onClick={handleDelete}
          >
            <DeleteIcon size={25} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
