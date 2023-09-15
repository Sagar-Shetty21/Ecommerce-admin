'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
  },[])

  const getAllCategories = () => {
    axios.get('/api/categories').then(response => {
        setAllCategories(response.data)
    })
  }

  const saveCategory = async() => {
    await axios.post('/api/categories', {name: categoryName})
    setCategoryName("")
    getAllCategories()
    alert("Category created successfully!")
  }

  return (
    <div className="categories-page-container">
        <h1 className="page-title">Categories</h1>

        <label>New category name</label>
        <div className="categories-input-btn-container">
            <input type="text" placeholder="Name of category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
            <button onClick={saveCategory}>Save</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th className="full-width-column">All Categories</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {allCategories.map(category => (
                    <tr key={category._id}>
                        <td className="full-width-column">{category.name}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
}

export default Categories