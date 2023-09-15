'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';

const Categories = ({swal}) => {
  const [isEditing, setIsEditing] = useState(null)
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
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
    if(isEditing){
        await axios.put('/api/categories', {name: categoryName, parent: parentCategory, id: isEditing._id})
        alert("Category Updated successfully!")
        setIsEditing(null)
    }else{
        await axios.post('/api/categories', {name: categoryName, parent: parentCategory})
        alert("Category created successfully!")
    }
    setCategoryName("")
    setParentCategory("")
    getAllCategories()
  }

  const handleEdit = (category) => {
    setIsEditing(category);
    setCategoryName(category.name)
    category?.parent?._id?setParentCategory(category.parent._id):setParentCategory("")
  }

  const handleDelete = (category) => {
    swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete the category: ${category.name}`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d55',
        reverseButtons: true
    }).then(async result => {
        if(result.isConfirmed) {
            await axios.delete('api/categories?id='+category._id);
            alert("Category deleted successfully!")
            getAllCategories()
        }
    })
  }

  return (
    <div className="categories-page-container">
        <h1 className="page-title">Categories</h1>

        <label>{isEditing ? "Edit category" : "New category name"}</label>
        <div className="categories-input-btn-container">
            <input type="text" placeholder="Name of category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
            <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                <option value="">No parent category</option>
                {
                    allCategories.map((category) => {
                        return <option key={category._id} value={category._id}>{category.name}</option>
                    })
                }
            </select>
            <button onClick={saveCategory}>{isEditing ? "Save changes" : "Create"}</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th >Category</th>
                    <th>Parent Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {allCategories.map(category => (
                    <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <div className="categories-btn-container">
                                <button className="categories-edit-btn" onClick={() => handleEdit(category)}>Edit</button>
                                <button className="categories-delete-btn" onClick={() => handleDelete(category)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal}/>
))
