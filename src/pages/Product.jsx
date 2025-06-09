import { useParams } from "react-router";
import { Helmet } from 'react-helmet-async';
import dogData from "../json/dog.json";
import catData from "../json/cat.json";
import PetDetail from "../components/PetDetail/PetDetail"
import Footer from "../components/Footer/Footer.jsx";

export default function Product() {
  const { productSpecies, productId } = useParams();
  const productData = productSpecies === "dog" ? dogData : catData;
  const product = productData.find((item) => item.id === parseInt(productId, 10));
  const title ="ProductDetail"

  if (!product) {
    return <div>找不到對應的商品資料</div>;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PetDetail product={product} />
    </>
  );
}
