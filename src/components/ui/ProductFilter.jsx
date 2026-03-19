import { useState } from "react"
import { Button } from "./button"
import { useSearchParams } from "react-router"

export default function ProductFilter({ categories, onFilter }) {
  const [active, setActive] = useState("All")
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClick = (category) => {
    setActive(category)
    onFilter(category)
    if (category === "All") {
      searchParams.delete("q")
    } else {
      searchParams.set("q", category)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {["All", ...categories].map((cat) => (
        <Button
          key={cat}
          variant={active === cat ? "default" : "outline"}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  )
}