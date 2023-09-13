'use client'

import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const NewProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  //const [goToProducts, setGoToProducts] = useState(false)
  const router = useRouter();

  const CreateProduct = async() => {
    const data = {name, desc, price}
    const res = await axios.post('/api/products', data);
    if (res.status === 201) {
        await router.push('/products');
    }
  }

  return (
    <div className="new-product-form-container">
        <h1 className="page-title">New Product</h1>

        <label>Name</label>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description</label>
        <textarea type="text" placeholder="Product Description" value={desc} onChange={(e) => setDesc(e.target.value)} />

        <label>Price</label>
        <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={CreateProduct}>Save</button>
    </div>
  )
}

export default NewProduct