import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import ProductList from "../components/ProductList.jsx";
import Filter from "../components/Filter.jsx";
import Footer from "../components/Footer/Footer.jsx";
import TopBar from "../components/TopBar.jsx";
import Spinner from "../components/Spinner";

export default function Species() {
  const { productSpecies } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = productSpecies === "dog" ? "Dogs" : "Cats";

  // 篩選器狀態
  const [gender, setGender] = useState([]);
  const [size, setSize] = useState([]);
  const [ageRange, setAgeRange] = useState([]);

  const ageRanges = {
    "一歲以下": { min: 0, max: 1 },
    "一歲至三歲": { min: 1, max: 3 },
    "三歲至七歲": { min: 3, max: 7 },
    "七歲以上": { min: 7, max: Infinity },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pets?species=${productSpecies}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pet data:", err);
        setError("無法取得資料");
        setLoading(false);
      });
  }, [productSpecies]);

  function parseAge(ageText) {
    // 根據你的資料格式調整
    if (!ageText) return 0;
    if (typeof ageText === "number") return ageText;
    if (ageText.includes("歲")) {
      return parseInt(ageText, 10);
    }
    return 0;
  }

  const filteredData = data.filter((item) => {
    const itemAge = parseAge(item.age);
    const ageMatch =
      ageRange.length === 0 ||
      ageRange.some((range) => {
        const { min, max } = ageRanges[range];
        return itemAge >= min && itemAge < max;
      });

    return (
      (gender.length === 0 || gender.includes(item.gender)) &&
      (size.length === 0 || size.includes(item.size)) &&
      ageMatch
    );
  });

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
      <TopBar />
      <div className="flex justify-center items-center">
        <div className="filter mt-5">
          <h1>{productSpecies === "dog" ? "DOGS 狗" : "CATS 貓"}</h1>
        </div>
      </div>

      <Filter
        gender={gender}
        size={size}
        ageRange={ageRange}
        setGender={setGender}
        setSize={setSize}
        setAgeRange={setAgeRange}
      />

      {filteredData.length > 0 ? (
        <ProductList products={filteredData} start={0} end={24} className="layout-content" />
      ) : (
        <div className="h-90 mt-10 md:ms-17 lg:ms-26 xl:ms-30 flex justify-center home-bg">
          <h2>無符合的資料！</h2>
        </div>
      )}
      <div className="h-10"></div>
      <Footer />
    </div>
  );
}