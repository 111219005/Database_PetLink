import { Link } from "react-router";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import Category from "../components/Category.jsx";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import dog from "../json/dog.json";
import cat from "../json/cat.json";
import ProductList from "../components/ProductList.jsx";
import Footer from "../components/Footer/Footer.jsx"
import TopBar from "../components/TopBar.jsx";
import Spinner from "../components/Spinner.jsx";
import { useProducts } from '../react-query/index.js';

export default function Home() {
    const title = "PetLink";
    const { data, isLoading } = useProducts();
    const products = data || [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }];

    // 如果資料還在加載，顯示 Spinner
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

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
                    <ProductList
                        products={
                            products
                                .filter(item => item.species === 'dog')
                                .sort((a, b) => Number(a.id) - Number(b.id))
                                .slice(0, 10)
                        }
                        isLoading={isLoading}
                        className="layout-content"
                    />
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
                    <ProductList products={cat} start={0} end={10} className="layout-content" />
                    {/* <ProductList
                        products={products.filter(item => item.species === 'cat').slice(0, 10)}
                        className="layout-content"
                    /> */}
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