import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import PetDetail from "../components/PetDetail/PetDetail";
import Spinner from "../components/Spinner";

export default function Product() {
  const { productSpecies, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = "ProductDetail";

  useEffect(() => {
    // 從後端抓取單一寵物資料
    axios
      .get(`http://localhost:5000/api/pets/${productId}`)
      .then((response) => {
        // 檢查 species 是否符合
        if (response.data && response.data.species === productSpecies) {
          setProduct(response.data);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pet data:", err);
        setError("無法取得資料");
        setLoading(false);
      });
  }, [productSpecies, productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  if (error) return <div>{error}</div>;
  if (!product) return <div>找不到對應的商品資料</div>;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PetDetail product={product} />
    </>
  );
}