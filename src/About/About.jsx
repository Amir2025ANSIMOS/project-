import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../ProductCard/ProductCard"

export default function About() {
    const [productList, setProduct] = useState([])
    const [isLoading, setLoading] = useState(false)
 
    async function getProducts() {
        try {
            setLoading(true)

            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/products'
            )

            console.log(data)
            setProduct(data.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    if (isLoading) {
        return <h2 className="text-center mt-5">Loading...</h2>
    }

    return (
        <div className="container my-5">
            <h2 className="fw-bold">
                Popular <span className="text-success">Products</span>
            </h2>

            <div className="row g-4">
                {productList.map((product) => {
                    return (
                        <ProductCard
                            // key={product._id}
                            product={product}
                        />
                    )
                })}
            </div>
        </div>
    )
}
