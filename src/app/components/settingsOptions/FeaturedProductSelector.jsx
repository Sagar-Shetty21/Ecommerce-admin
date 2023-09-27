'use client'

import axios from "axios";
import { useEffect, useState } from "react";

const FeaturedProductSelector = () => {
    const [products, setProducts] = useState([]);
    const [featuredProductId, setFeaturedProductId] = useState("");

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
        axios.get('/api/products/featured').then(response => {
            setFeaturedProductId(response.data[0].product._id)
        })
    },[])

    const updateFeaturedProduct = async(e) => {
        e.preventDefault();
        const res = await axios.post('/api/products/featured',{productId: featuredProductId}).then(response => {
            alert("updated sucessfully");
        })
    }
    
    return (
        <div className="featured-product-selector-container" >
            <h2>Select the featured product</h2>
            <form onSubmit={updateFeaturedProduct}>
                <select className="featured-product-selector" required value={featuredProductId} onChange={(e) => setFeaturedProductId(e.target.value)}>
                    {featuredProductId == "" && <option value="">Choose a product</option>}
                    {products.map(p => (
                        <option className="featured-product-options" value={p._id}>{p.title}</option>
                    ))}
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default FeaturedProductSelector