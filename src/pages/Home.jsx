import { Link } from "react-router";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import Category from "../components/Category.jsx";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import ProductList from "../components/ProductList.jsx";
import Footer from "../components/Footer/Footer.jsx"
import TopBar from "../components/TopBar.jsx";
import Spinner from "../components/Spinner.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const title = "PetLink";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/pets")
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("無法取得資料");
                setLoading(false);
            });
    }, []);

    const dogProducts = products.filter(item => item.species === "dog");
    const catProducts = products.filter(item => item.species === "cat");

    // 如果資料還在加載，顯示 Spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }
    if (error) return <div>{error}</div>;

    return (
        <div className="home-bg">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Navbar />
            <Category />
            <TopBar />
            <Header />
            <div className="h-20"></div>
            <div id="dog_section" className="w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="ms-3 dog-cat-title xs:ms-10 sm:w-[400px] md:w-[660px] lg:w-[950px] xl:w-[940px] 2xl:w-[1250px] text-left">DOGS 狗</h1>
                    <ProductList products={dogProducts} start={0} end={12} />
                </motion.div>
                <div className="flex justify-center items-center mb-10">
                    <motion.div
                        style={{ flex: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link to={`/dog`}>
                            <button className="home-btn py-2 px-4 mt-7 rounded-lg cursor-pointer">查看更多</button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div id="cat_section" className="w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="ms-3 dog-cat-title xs:ms-10 sm:w-[400px] md:w-[660px] lg:w-[950px] xl:w-[940px] 2xl:w-[1250px] text-left">CATS 貓</h1>
                    <ProductList products={catProducts} start={0} end={12} />
                </motion.div>
                <div className="flex justify-center items-center">
                    <motion.div
                        style={{ flex: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link to={`/cat`} >
                            <button className="home-btn py-2 px-4 mt-7 mb-10 rounded-lg cursor-pointer">查看更多</button>
                        </Link>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    )
}