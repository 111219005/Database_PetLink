import './PetDetail.css';
import Navbar from '../../components/Navbar';
import AddToBasket from '../AddToBasket';
import Footer from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addCartItems } from "../../redux/cartSlice"; // 根據你的實際路徑調整

// 定義 Product 型別
interface Product {
  id: string;
  species: string;
  name: string;
  cover: string;
  area: string;
  personality: string;
  breed: string;
  gender: string;
  age: string;
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
}

// 定義 props
interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdoptNow = () => {
    // 加入購物車
    dispatch(addCartItems({ ...product, cartKey: `${product.species}-${product.cartKey}` }));

    // 設定 selectedItems
    const selected = localStorage.getItem("selectedItems");
    let selectedItems = selected ? JSON.parse(selected) : {};
    const cartKey = `${product.species}-${product.cartKey}`;
    selectedItems[cartKey] = true;
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

    // localStorage donation
    localStorage.setItem(
      `donation-${cartKey}`,
      JSON.stringify({
        food: parseInt(product.food.replace('$', '')) || 0,
        daily: parseInt(product.daily.replace('$', '')) || 0,
        medical: parseInt(product.medical.replace('$', '')) || 0,
        train: parseInt(product.train.replace('$', '')) || 0,
      })
    );

    // 3. 導向 cart 頁面
    navigate("/cart");
  };

  return (
    <>
      <Navbar />

      <div className="content">
        <div className="detail-top">
          <div className="detail-img">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              src={product.cover}
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
                <div className="label">年齡</div><div className="value">{product.age}</div>
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
                <div className="label">食物</div><div className="value">{product.food}</div>
                <div className="label">生活用品</div><div className="value">{product.daily}</div>
                <div className="label">醫療</div><div className="value">{product.medical}</div>
                <div className="label">娛樂訓練</div><div className="value">{product.train}</div>
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
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
