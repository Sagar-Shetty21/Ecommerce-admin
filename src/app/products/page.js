'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data)
    })
  },[])

  return (
    <div className="product-page-container">
      <Link href={'products/new'} className="create-new-product-btn">Add a product</Link>
      <table>
        <thead>
          <tr>
            <th className="full-width-column">All Products</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="full-width-column">{product.title}</td>
              <td>
                <Link href={'products/edit/'+product._id} className="product-edit-btn">
                  Edit
                </Link>
                <Link href={'products/delete/'+product._id} className="product-delete-btn">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Product