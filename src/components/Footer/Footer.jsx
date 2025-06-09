import React from "react";
import "./Footer.css"; // 假設有使用 CSS 樣式檔案
import { useSelector } from "react-redux";
import { selectLightMode } from "../../redux/colorSlice";

export default function Footer() {
  const lightMode = useSelector(selectLightMode);
  return (
    <div className="footer-petlink hidden md:block">
      <div className="footer-top">
        <div className="left">
          <h2>
            PetLink
          </h2>
          <h6
            data-zh="數位二甲 | 111219005 | 吳函蓁"
            data-en="NTUE DTD | 111219005 | Han-Jhen, Wu"
          >
            數位二甲 | 111219005 | 吳函蓁
          </h6>
          <h6
            data-zh="數位二甲 | 111219007 | 趙翊如"
            data-en="NTUE DTD | 111219007 | Yi-Ju, Chao"
          >
            數位二甲 | 111219007 | 趙翊如
          </h6>
          <h6
            data-zh="113學年度上學期（大二）"
            data-en="First semester of the 113th academic year (sophomore year)"
          >
            113學年度下學期（大二）
          </h6>
          <h6
            data-zh="前端工程設計"
            data-en="Frontend web development"
          >
            跨平台前端工程設計
          </h6>
          <h6
            data-zh="期末專題成果"
            data-en="Final Project Results"
          >
            期中專題成果
          </h6>
        </div>
        <div className="middle1">
          <h3 data-zh="人生百味" data-en="Do You a Flavor">
            客服中心
          </h3>
          <a
            href="https://doyouaflavor.tw/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="官方網站" data-en="Official website">
              幫助中心
            </h6>
          </a>
          <a
            href="https://doyouaflavor.tw/activities/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="專案列表" data-en="Project list">
              領養據點
            </h6>
          </a>
          <a
            href="https://doyouaflavor.tw/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="議題文章" data-en="Topic articles">
              付款方式
            </h6>
          </a>
          <a
            href="https://doyouaflavor.tw/donate/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="捐款支持" data-en="Donate to support">
              聯絡克服
            </h6>
          </a>
          <a
            href="https://www.books.com.tw/products/0010741248?"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="街頭生存指南" data-en="Street survival guide">
              平台問題回報
            </h6>
          </a>
          <a
            href="https://doyouaflavor.tw/homeless-helper/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="無家者小幫手" data-en="Homeless helper">
              防詐騙宣傳
            </h6>
          </a>
        </div>
        <div className="middle2">
          <h3 data-zh="其他" data-en="Others">
            關於PetLink
          </h3>
          <a
            href="https://www.instagram.com/tiatde/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="開發者支持" data-en="Developer support">
              關於PetLink
            </h6>
          </a>
          <a
            href="https://www.instagram.com/tiatde/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="平臺問題回報" data-en="Platform issue report">
              加入我們
            </h6>
          </a>
          <a
            href="https://www.youtube.com/@yijuchao5024"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="更多影音作品" data-en="More video content">
              PetLink條款
            </h6>
          </a>
          <a
            href="https://www.youtube.com/@yijuchao5024"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="更多影音作品" data-en="More video content">
              隱私權政策
            </h6>
          </a>
          <a
            href="https://www.youtube.com/@yijuchao5024"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="更多影音作品" data-en="More video content">
              照顧者中心
            </h6>
          </a>
          <a
            href="https://www.youtube.com/@yijuchao5024"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-a"
          >
            <h6 data-zh="更多影音作品" data-en="More video content">
              聯絡媒體
            </h6>
          </a>
        </div>
        <div className="right">
            <h3>FOLLOW</h3>
            <div className="grid grid-cols-3">
                <a
                    href="https://www.instagram.com/tiatde/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-a"
                >
                    <img
                        src={lightMode ? "/img/Instagram.png" : "/img/Instagram-dark.png"}
                        alt="Instagram"
                        className="instagram"
                    />
                </a>
                <a
                    href="https://www.facebook.com/profile.php?id=100004458227420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-a"
                >
                    <img
                        src={lightMode ? "/img/Facebook.png" : "/img/Facebook-dark.png"}
                        alt="Facebook"
                        className="facebook"
                    />
                </a>
                <div className="relative left-1 top-1">
                <a
                    href="https://www.youtube.com/@yijuchao5024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-a"
                >
                    <img
                        src={lightMode ? "/img/Threads.png" : "/img/Threads-dark.png"}
                        alt="Threads"
                        className="Threads"
                    />
                </a>
                </div>
            </div>
        </div>
      </div>
      <div className="footer-bottom">
        <hr className="footer-hr" />
        <p className="footer-p">
          2025 produced by Yi-Ju, Chao & Han-Jhen, Wu
        </p>
      </div>
    </div>
  );
}
