'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditProduct = ({ params }) => {
  const {productId} = params;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios.get('/api/products?id='+productId).then(response => {
        setName(response.data.title);
        setDesc(response.data.description);
        setPrice(response.data.price);
    })
  },[productId])
  
  const router = useRouter();

  const EditProduct = async() => {
    const data = {name, desc, price}
    const res = await axios.put('/api/products', {...data, productId});
    if (res.status === 200) {
        await router.push('/products');
        alert("product Updated successfully!")
    }else{
        alert("Something went wrong! Please try again.")
    }
  }

  return (
    <div className="new-product-form-container">
        <h1 className="page-title">Edit Product</h1>

        <label>Name</label>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description</label>
        <textarea type="text" placeholder="Product Description" value={desc} onChange={(e) => setDesc(e.target.value)} />

        <label>Price</label>
        <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={EditProduct}>Save Changes</button>
    </div>
  )
}

export default EditProduct