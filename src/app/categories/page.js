'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';
import Size from '../components/categoryProperties/Size'
import FrameDesign from '../components/categoryProperties/FrameDesign'
import Dimensions from '../components/categoryProperties/Dimensions'
import Colors from '../components/categoryProperties/Colors'
import { useSession } from 'next-auth/react'

const Categories = ({swal}) => {
  useSession({required: true});

  const [isEditing, setIsEditing] = useState(null)
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [dimensionActive, setDimensionActive] = useState(false);
  const [dimensionVarients, setDimensionVarients] = useState([]);
  const [frameActive, setFrameActive] = useState(false);
  const [frameVarients, setFrameVarients] = useState([]);
  const [colorActive, setColorActive] = useState(false);
  const [colorVarients, setColorVarients] = useState([]); 
  const [sizeActive, setSizeActive] = useState(false);
  const [sizeVarients, setSizeVarients] = useState([]);

  useEffect(() => {
    getAllCategories()
  },[])

  const getAllCategories = () => {
    axios.get('/api/categories').then(response => {
        setAllCategories(response.data)
    })
  }

  const saveCategory = async() => {
    const properties = {dimensions: dimensionVarients, frame: frameVarients, size: sizeVarients, color: colorVarients}
    if(isEditing){
        await axios.put('/api/categories', {name: categoryName, parent: parentCategory === '' ? null : parentCategory, properties, id: isEditing._id})
        alert("Category Updated successfully!")
        setIsEditing(null)
    }else{
        await axios.post('/api/categories', {name: categoryName, parent: parentCategory === '' ? null : parentCategory, properties})
        alert("Category created successfully!")
    }
    setCategoryName("")
    setParentCategory("")
    setDimensionActive(false)
    setFrameActive(false)
    setSizeActive(false)
    setColorActive(false)
    setDimensionVarients([])
    setFrameVarients([])
    setSizeVarients([])
    setColorVarients([])
    getAllCategories()
  }

  const handleEdit = (category) => {
    setIsEditing(category);
    setCategoryName(category.name)
    category?.parent?._id?setParentCategory(category.parent._id):setParentCategory("")
    category.properties?.dimensions?.length > 0 && setDimensionActive(true)
    category.properties?.frame?.length > 0 && setFrameActive(true)
    category.properties?.size?.length > 0 && setSizeActive(true)
    category.properties?.color?.length > 0 && setColorActive(true)
    setDimensionVarients(category.properties?.dimensions || [])
    setFrameVarients(category.properties?.frame || [])
    setSizeVarients(category.properties?.size || [])
    setColorVarients(category.properties?.color || [])
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

  const cancelEditing = () => {
    setCategoryName("")
    setParentCategory("")
    setIsEditing(false)
    setDimensionActive(false)
    setFrameActive(false)
    setColorActive(false)
    setSizeActive(false)
    setDimensionVarients([])
    setFrameVarients([])
    setSizeVarients([])
    setColorVarients([])
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
        </div>

        <label>Properties</label>
        <div className="category-properties-container">
            <button className="add-property-btn" onClick={() => setDimensionActive(true)}>Add dimensions</button>
            <button className="add-property-btn" onClick={() => setFrameActive(true)}>Add frame designs</button>
            <button className="add-property-btn" onClick={() => setSizeActive(true)}>Add Sizes</button>
            <button className="add-property-btn" onClick={() => setColorActive(true)}>Add Colors</button>
        </div>
        {dimensionActive && <Dimensions setInactive={setDimensionActive} setVarients={setDimensionVarients} varients={dimensionVarients}/>}
        {frameActive && <FrameDesign setInactive={setFrameActive} setVarients={setFrameVarients} varients={frameVarients}/>}
        {sizeActive && <Size setInactive={setSizeActive} setVarients={setSizeVarients} varients={sizeVarients}/>}
        {colorActive && <Colors setInactive={setColorActive} setVarients={setColorVarients} varients={colorVarients}/>}


        <button className="categorycreate-save-btn" onClick={saveCategory}>{isEditing ? "Save changes" : "Create"}</button>
        {isEditing && <button className="categoryedit-cancel-btn" onClick={cancelEditing}>Cancel</button>}

        {!isEditing &&
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
        }
    </div>
  )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal}/>
))
