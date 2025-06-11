import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const AddPetForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    size: "",
    furColor: "",
    age: "",
    area: "",
    personality: "",
    health: "",
    food: "",
    daily: "",
    medical: "",
    train: "",
    comment: "",
    cover: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, cover: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    if (!formData.name || !formData.gender || !formData.size || !formData.age || !formData.area) {
      alert("請填寫所有必填欄位！");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/pets", {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      alert(result.success ? "新增成功！" : "新增失敗！");
    } catch (error) {
      alert("發生錯誤，請稍後再試！");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
      .then((res) => console.log("取得資料：", res.data))
      .catch((err) => console.error("無法取得資料:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen add-bg flex items-center justify-center p-4">
        <form
          className="w-full max-w-lg shadow-md rounded-lg p-6 bg-white form-bg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">新增寵物資料</h2>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              寵物名稱
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              type="text"
              id="name"
              name="name"
              placeholder="輸入寵物名稱"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="species">
              種類
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              id="species"
              name="species"
              onChange={handleChange}
            >
              <option value="">請選擇</option>
              <option value="dog">狗</option>
              <option value="cat">貓</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="breed">
              品種
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              type="text"
              id="breed"
              name="breed"
              placeholder="例如：柴犬、波斯貓"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="gender">
              性別
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              id="gender"
              name="gender"
              onChange={handleChange}
            >
              <option value="">請選擇</option>
              <option value="1">公</option>
              <option value="2">母</option>
              <option value="3">不確定</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="size">
              體型
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              id="size"
              name="size"
              onChange={handleChange}
            >
              <option value="">請選擇</option>
              <option value="1">幼型</option>
              <option value="2">小型</option>
              <option value="3">中型</option>
              <option value="4">大型</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="furColor">
              毛色
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              type="text"
              id="furColor"
              name="furColor"
              placeholder="例如：黑、白、棕"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="age">
              年齡
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              id="age"
              name="age"
              onChange={handleChange}
            >
              <option value="">請選擇</option>
              <option value="1">未離乳</option>
              <option value="2">一至三月</option>
              <option value="3">三至六月</option>
              <option value="4">六月至一歲</option>
              <option value="5">一歲至三歲</option>
              <option value="6">三歲至七歲</option>
              <option value="7">七歲以上</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="area">
              地區
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              id="area"
              name="area"
              onChange={handleChange}
            >
              <option value="">請選擇</option>
              <option value="">請選擇</option>
              <option value="1">基隆市</option>
              <option value="2">臺北市</option>
              <option value="3">新北市</option>
              <option value="4">桃園市</option>
              <option value="5">新竹市</option>
              <option value="6">新竹縣</option>
              <option value="7">宜蘭縣</option>
              <option value="8">苗栗縣</option>
              <option value="9">臺中市</option>
              <option value="10">彰化縣</option>
              <option value="11">南投縣</option>
              <option value="12">雲林縣</option>
              <option value="13">嘉義市</option>
              <option value="14">嘉義縣</option>
              <option value="15">臺南市</option>
              <option value="16">高雄市</option>
              <option value="17">屏東縣</option>
              <option value="18">花蓮縣</option>
              <option value="19">臺東縣</option>
              <option value="20">金門縣</option>
              <option value="21">連江縣</option>
              <option value="22">澎湖縣</option>
            </select>
          </div>

          {[
            { name: "personality", label: "性格", placeholder: "例如：活潑、安靜" },
            { name: "health", label: "健康狀況", placeholder: "例如：健康、需照護" },
          ].map(({ name, label, placeholder }) => (
            <div className="mb-4" key={name}>
              <label className="block mb-2" htmlFor={name}>{label}</label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                type="text" id={name} name={name}
                placeholder={placeholder} onChange={handleChange}
              />
            </div>
          ))}

          {[
            { name: "food", label: "食物開銷", placeholder: "例如：$2000" },
            { name: "daily", label: "日常開銷", placeholder: "例如：$2000" },
            { name: "medical", label: "醫療開銷", placeholder: "例如：$2000" },
            { name: "train", label: "訓練開銷", placeholder: "例如：$2000" },
          ].map(({ name, label, placeholder }) => (
            <div className="mb-4" key={name}>
              <label className="block mb-2" htmlFor={name}>{label}</label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                type="text" id={name} name={name}
                placeholder={placeholder} onChange={handleChange}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block mb-2" htmlFor="comment">
              備註
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              id="comment"
              name="comment"
              placeholder="填寫備註或其他訊息"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="cover">
              上傳圖片
            </label>
            <input
              className="w-full px-3 py-2 cursor-pointer"
              type="file"
              id="cover"
              name="cover"
              onChange={handleFileChange}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="w-full add-btn text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring cursor-pointer"
          >
            新增寵物
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default AddPetForm;
