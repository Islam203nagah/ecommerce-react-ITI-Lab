import Breadcrumb from "../components/ui/Breadcrumb";
import CustomerReview from "../components/ui/CustomerReview";
import DetailsPro from "../components/ui/DetailsPro";
import SummaryReview from "../components/ui/summaryReview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function ProductDetails() {
  
  const { id } = useParams();
  console.log("Product ID from URL:", id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="p-6">Loading product...</p>;
  }
    const items = [
      { label: "Home", to: "/" },
      { label: "Products", to: "/" },
      { label: product?.title || "Product Details" }
    ];


  return (
    <>
    <Breadcrumb items={items} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <DetailsPro product={product} />

      {/* Reviews */}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-6">
      <SummaryReview product={product} />
      <CustomerReview product={product} />
    </div>
    </>
  );
}

export default ProductDetails;