import { useEffect, useState } from "react"
import ProductCard from "../components/ui/ProductCard"
import ProductFilter from "../components/ui/ProductFilter"
import Breadcrumb from "../components/ui/Breadcrumb"
import { useSearchParams } from "react-router"
import Pagination from "../components/ui/Pagination"
import { useThemeStore } from "../store/useThemeStore"


export default function ProductsList() {
  const theme=useThemeStore((state)=>(state.theme));
  
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

    const indexOfLast = currentPage * productsPerPage
  const indexOfFirst = indexOfLast - productsPerPage
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / productsPerPage)

  const handleFilter = (category) => {
    if (category === "All") setFiltered(products)
    else setFiltered(products.filter((p) => p.category === category))
    setCurrentPage(1)
  }

  const categories = [...new Set(products.map((p) => p.category))]

//   const handleAddToCart = (product) => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const existingProduct = cart.find((item) => item.id === product.id);

//   if (existingProduct) {
//     existingProduct.quantity += 1;
//   } else {
//     cart.push({ ...product, quantity: 1 });
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));

//   alert(`${product.title} added to cart!`);
// };
  const items = [
    { label: "Home", to: "/" },
    { label: `${searchParams.get("q") || "All"}`, to: "/" }
    
  ];

  return (
    <div className="p-6" style={theme === "light" ? { backgroundColor: "#fff", color: "#000" } : { backgroundColor: "#333", color: "#fff" }}>
        <Breadcrumb items={items} />
      <ProductFilter categories={categories} onFilter={handleFilter} />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}