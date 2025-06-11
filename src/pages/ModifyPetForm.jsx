import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useParams } from "react-router";

const ModifyPetForm = () => {
    const { id } = useParams();
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

    const genderMap = { "公": "1", "母": "2", "不確定": "3" };
    const sizeMap = { "幼型": "1", "小型": "2", "中型": "3", "大型": "4" };
    const ageMap = {
        "未離乳": "1", "一至三月": "2", "三至六月": "3", "六月至一歲": "4",
        "一歲至三歲": "5", "三歲至七歲": "6", "七歲以上": "7"
    };
    const areaMap = {
        "基隆市": "1", "臺北市": "2", "新北市": "3", "桃園市": "4", "新竹市": "5",
        "新竹縣": "6", "宜蘭縣": "7", "苗栗縣": "8", "臺中市": "9", "彰化縣": "10",
        "南投縣": "11", "雲林縣": "12", "嘉義市": "13", "嘉義縣": "14", "臺南市": "15",
        "高雄市": "16", "屏東縣": "17", "花蓮縣": "18", "臺東縣": "19", "金門縣": "20",
        "連江縣": "21", "澎湖縣": "22"
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/pets/${id}`)
            .then(res => {
                const data = res.data;
                console.log("API 回傳資料", data);
                // expences 轉換
                if (Array.isArray(data.expences)) {
                    data.food = data.expences.find(e => e.name === "食物開銷")?.amount || "";
                    data.daily = data.expences.find(e => e.name === "日常開銷")?.amount || "";
                    data.medical = data.expences.find(e => e.name === "醫療開銷")?.amount || "";
                    data.train = data.expences.find(e => e.name === "訓練開銷")?.amount || "";
                }
                setFormData({
                    ...data,
                    species: data.species ?? "",
                    gender: genderMap[data.gender] || "",
                    size: sizeMap[data.size] || "",
                    age: ageMap[data.age_range] || "",
                    area: areaMap[data.area] || "",
                    food: data.food ?? "",
                    daily: data.daily ?? "",
                    medical: data.medical ?? "",
                    train: data.train ?? "",
                    cover: data.cover || null
                });
            })
            .catch(err => alert("載入資料失敗"));
    }, [id]);

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
            const response = await fetch(`http://localhost:5000/api/pets/${id}`, {
                method: "PUT",
                body: uploadData,
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            alert(result.success ? "修改成功！" : "修改失敗！");
        } catch (error) {
            alert("發生錯誤，請稍後再試！");
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen add-bg flex items-center justify-center p-4">
                <form
                    className="w-full max-w-lg shadow-md rounded-lg p-6 bg-white form-bg"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">編輯寵物資料</h2>

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
                            value={formData.name}
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
                            value={formData.species}
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
                            value={formData.breed}
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
                            value={formData.gender}
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
                            value={formData.size}
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
                            value={formData.furColor}
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
                            value={formData.age}
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
                            value={formData.area}
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
                                type="text"
                                id={name}
                                name={name}
                                placeholder={placeholder}
                                value={formData[name]}
                                onChange={handleChange}
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
                                type="text"
                                id={name}
                                name={name}
                                placeholder={placeholder}
                                value={formData[name]}
                                onChange={handleChange}
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
                            value={formData.comment}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="cover">
                            目前圖片
                        </label>
                        {formData.cover && typeof formData.cover === "string" && (
                            <img
                                src={formData.cover.startsWith("http") ? formData.cover : `http://localhost:5000/${formData.cover}`}
                                alt="目前圖片"
                                className="mb-2 max-h-48 rounded"
                            />
                        )}
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
                        編輯寵物
                    </motion.button>
                </form>
            </div>
        </>
    );
};

export default ModifyPetForm;
