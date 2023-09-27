'use client'

import axios from "axios";
import { useEffect, useState } from "react";

const FeaturedProductSelector = () => {
    const [products, setProducts] = useState([]);
    const [featuredProductId, setFeaturedProductId] = useState({});

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
    },[])
    
    return (
        <div className="featured-product-selector-container" >
            <h2>Select the featured product</h2>
            <select className="featured-product-selector" value={featuredProductId} onChange={(e) => setFeaturedProductId(e.target.value)}>
                <option value="">Choose a product</option>
                {products.map(p => (
                    <option className="featured-product-options" value={p._id}>{p.title}</option>
                ))}
            </select>
        </div>
    )
}

export default FeaturedProductSelector