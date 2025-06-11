import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ 加入 axios
import Navbar from "../components/Navbar"
import { motion } from "framer-motion";

const AddPetForm = () => {
  const [formData, setFormData] = useState({
    name: "", species: "", breed: "", gender: "", size: "",
    furColor: "", age: "", area: "", personality: "",
    health: "", food: "", daily: "", medical: "", train: "",
    comment: "", cover: null,
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

  // ✅ 正確寫法：用 useEffect 取得後端資料
  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
      .then((res) => console.log("取得資料：", res.data))
      .catch((err) => console.error("無法取得資料:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen add-bg flex items-center justify-center p-4">
        <form className="w-full max-w-lg shadow-md rounded-lg p-6 bg-white form-bg" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">新增寵物資料</h2>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">寵物名稱</label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              type="text" id="name" name="name"
              placeholder="輸入寵物名稱" onChange={handleChange}
            />
          </div>

          {[
            { name: "species", label: "種類", placeholder: "例如：狗、貓" },
            { name: "breed", label: "品種", placeholder: "例如：柴犬、波斯貓" },
            { name: "gender", label: "性別", placeholder: "例如：公、母" },
            { name: "size", label: "體型", placeholder: "例如：小型、中型、大型" },
            { name: "furColor", label: "毛色", placeholder: "例如：黑、白、棕" },
            { name: "age", label: "年齡", placeholder: "例如：2" },
            { name: "area", label: "地區", placeholder: "例如：台北市" },
            { name: "personality", label: "性格", placeholder: "例如：活潑、安靜" },
            { name: "health", label: "健康狀況", placeholder: "例如：健康、需照護" },
            { name: "food", label: "食物", placeholder: "例如：$2000" },
            { name: "daily", label: "生活用品", placeholder: "例如：$2000" },
            { name: "medical", label: "醫療", placeholder: "例如：$2000" },
            { name: "train", label: "娛樂訓練", placeholder: "例如：$2000" },
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
            <label className="block mb-2" htmlFor="comment">備註</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              id="comment" name="comment"
              placeholder="填寫備註或其他訊息"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="cover">上傳圖片</label>
            <input
              className="w-full px-3 py-2 cursor-pointer"
              type="file" id="cover" name="cover"
              onChange={handleFileChange}
            />
          </div>

          <motion.button
            style={{ flex: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="w-full add-btn text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring  cursor-pointer"
          >
            新增寵物
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default AddPetForm;
