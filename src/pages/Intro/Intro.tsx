import React, { useState } from 'react';
import './Intro.css';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router';
import Footer from "../../components/Footer/Footer";
import { motion, Variants } from "framer-motion";

const picsVariant: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  },
  hidden: {}
};

const picVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

const Intro: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <div className="bigpic">
        <motion.h1
          className="bigpic-h"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          PetLink遠端認養平台
        </motion.h1>

        <motion.h4
          className="bigpic-c"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          你出資助，我來照顧，一起給毛孩一個溫暖的家！
        </motion.h4>
        <motion.img
          className="bigpic-img"
          src="/img/bigpic.png"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      <motion.div className="intro1" layout>
        <motion.h1 className="intro1-h" layout>我們在做什麼？</motion.h1>
        <motion.div className="intro1-c" layout>
          <motion.div className="intro1-l" layout>
            <motion.img
              className="intro1-l-img"
              src="/img/intro1.png"
              alt="intro1"
              layout
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
          <motion.div className="intro1-r" layout>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="intro1-r-t">
                我們是一個遠端領養平台，讓有心卻沒時間養寵物的人，<br />
                透過每月資助，幫助毛孩找到愛與照顧。
              </h3>
              <h3 className="intro1-r-p">☆你提供資助，支持毛孩的食物、醫療、日常開銷。</h3>
              <h3 className="intro1-r-p">☆我們幫你找到照顧者，確保毛孩得到良好照顧。</h3>
              <h3 className="intro1-r-p">☆定期收到照片、影片，讓你遠端也能參與毛孩生活！</h3>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="intro2" layout>
        <motion.h1 className="intro2-h" layout>如何運作？</motion.h1>
        <motion.div className="intro2-c" layout>
          <motion.div className="intro2-l" layout>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="intro2-l-p">1. 挑選毛孩：瀏覽平台上的可愛毛孩，選擇你想支持的對象。</h3>
              <h3 className="intro2-l-p">2. 設定資助方案：決定每月的資助金額，支持牠的生活。</h3>
              <h3 className="intro2-l-p">3. 媒合照顧者：我們會為你媒合合適的照顧者，確保毛孩得到妥善照料。</h3>
              <h3 className="intro2-l-p">4. 定期更新：透過照片、影片、健康報告，讓你不錯過毛孩的成長點滴！</h3>
            </motion.div>
          </motion.div>
          <motion.div className="intro2-r" layout>
            <motion.img
              className="intro2-r-img"
              src="/img/intro2.png"
              alt="intro2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="intro3" layout>
        <motion.h1 className="intro3-h" layout>為什麼選擇我們？</motion.h1>
        <motion.div className="intro3-c" layout>
          <motion.div className="intro3-l" layout>
            <motion.img
              className="intro3-l-img"
              src="/img/intro3.png"
              alt="intro3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
          <motion.div className="intro3-r" layout>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="intro3-r-p">☆遠端參與，讓愛無距離：<br />即使生活忙碌，也能成為毛孩的守護者。</h3>
              <h3 className="intro3-r-p">☆透明資助，專款專用：<br />每筆資助金都用在毛孩的生活與健康。</h3>
              <h3 className="intro3-r-p">☆定期更新，真實互動：<br />透過影片、照片，讓你感受毛孩的陪伴。</h3>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="intro4" layout>
        <motion.h1 className="intro4-h">
          立即加入，成為毛孩的遠端家人！
        </motion.h1>
        <motion.div
          className="pics"
          variants={picsVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {["intro4.png", "intro5.png", "intro9.png", "intro6.png", "intro7.png", "intro8.png"].map((src, i) => (
            <motion.img
              key={i}
              className={`item item${i + 1}`}
              src={`/img/${src}`}
              alt={`intro${i + 4}`}
              variants={picVariant}
            />
          ))}
        </motion.div>

        <Link to="/">
          <motion.button
            className="home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            回首頁
          </motion.button>
        </Link>
      </motion.div>

      <Footer />
    </>
  );
};

export default Intro;
