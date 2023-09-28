'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

const DeleteProduct = ({ params }) => {
  useSession({required: true});
  
  const {productId} = params;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [imagesLink, setImagesLink] = useState([]);

  useEffect(() => {
    axios.get('/api/products?id='+productId).then(response => {
        setName(response.data.title);
        setDesc(response.data.description);
        setPrice(response.data.price);
        setImagesLink(response.data.images);
        setCategory(response.data.category);
    })
    axios.get('/api/categories').then(response => {
      setCategories(response.data)
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
        <h1 className="page-title">Delete Product</h1>

        <label>Name</label>
        <input type="text" placeholder="Product Name" value={name} disabled/>

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} disabled>
          <option value="">Uncategorized</option>
          {categories.length > 0 && categories.map(c => {
            return <option key={c._id} value={c._id}>{c.name}</option>
          })}
        </select>

        <label>Images</label>
        <div className="image-upload-container">
            {imagesLink.map((img) => {
              return(
                <div key={img} className="uploaded-img-box">
                  <Image src={img} alt="uploaded image"/>
                </div>
              )
            })}
        </div>

        {!imagesLink?.length && (
          <div className="no-img-prompt">No Images Added</div>
        )}

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