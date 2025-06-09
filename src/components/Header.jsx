import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <>
            <div className="header-bg w-full h-150 md:h-80 flex flex-col md:flex-row md:grid md:grid-cols-2 justify-center items-center gap-4 md:pr-10">
                <img
                    src="img/cat.png"
                    className="relative w-140 h-80 mt-10 md:w-717px md:h-90 md:mt-2 col-span-1 z-10 top-15 sm:top-0"
                    alt="cat"
                />

                <div className="col-span-1 text-center md:h-386px header-lit !sm:header-bg text-black sm:text-white pt-10 sm:pt-0 w-full">
                    <h1 className="flex justify-center items-center mb-3">
                        PetLink遠端認養平台
                    </h1>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className="!text-base">沒時間養寵物？但你依然可以給他一個家！</p>
                        <p className="!text-base">你出資助；我來照顧，讓愛不缺席！</p>
                        <p className="!text-base">遠端領養毛孩，定期關注牠的可愛日常。</p>
                        <motion.div
                            style={{ flex: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link to="/introduction">
                                <button className="header-btn text-white flex justify-center items-center py-2 px-4 my-4 rounded-lg cursor-pointer">
                                    查看更多
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
