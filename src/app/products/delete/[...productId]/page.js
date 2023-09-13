'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeleteProduct = ({ params }) => {
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

  const handleDelete = async() => {
    const res = await axios.delete('/api/products?id='+productId);
    if (res.status === 200) {
        await router.push('/products');
        alert("product deleted successfully!")
    }else{
        alert("Something went wrong! Please try again.")
    }
  }

  const NavigateBack = () => {
    router.push('/products');
  }

  return (
    <div className="new-product-form-container">
        <h1 className="page-title">Edit Product</h1>

        <label>Name</label>
        <input type="text" placeholder="Product Name" value={name} disabled/>

        <label>Description</label>
        <textarea type="text" placeholder="Product Description" value={desc} disabled/>

        <label>Price</label>
        <input type="number" placeholder="Product Price" value={price} disabled/>

        <div className="delete-confirmation-prompt-container">
            <div className="delete-confirmation-prompt">Do you want to delete this product?</div>
            <button onClick={handleDelete} className="delete-product-btn">Delete</button>
            <button onClick={NavigateBack} className="cancel-delete-product-btn">Cancel</button>
        </div>
    </div>
  )
}

export default DeleteProduct