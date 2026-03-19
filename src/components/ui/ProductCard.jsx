import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router"
import { useThemeStore } from "@/store/useThemeStore";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "@/store/cartSlice";

export default function ProductCard({ product }) {
  const theme=useThemeStore((state)=>(state.theme));
  const proDetails=useNavigate()
  const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
  return (
    <Card className="w-full lg:w-70  transition-transform hover:scale-105 hover:shadow-lg px-3" style={theme === "light" ? { backgroundColor: "#fff", color: "#000" } : { backgroundColor: "#333", color: "#fff" }} >
      {/* Header */}
      <CardHeader>
        <div className="overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover transition-transform hover:scale-110"
          />
        </div>
        
      </CardHeader>
        <CardTitle onClick={() => proDetails(`/product/${product.id}`)} className={"truncate cursor-pointer hover:text-cyan-400"} >{product.title}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      {/* Image & Price */}
      <CardContent>
        
        <p className="mt-2 font-semibold text-2xl text-cyan-400">${product.price.toFixed(2)}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Button
          variant="default"
          className="flex items-center gap-2 text-white bg-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:pointer-events-none "
          onClick={() => {dispatch(addToCart(product)); alert(`${product.title} added to cart!`)}}
          
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}