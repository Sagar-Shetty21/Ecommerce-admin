'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs';
import { useSession } from 'next-auth/react'
import Image from 'next/image';

const EditProduct = ({ params }) => {
  useSession({required: true});
  
  const {productId} = params;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [imagesLink, setImagesLink] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

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

  const EditProduct = async() => {
    const data = {name, desc, price, images: imagesLink, category: category === '' ? null : category, properties}
    const res = await axios.put('/api/products', {...data, productId});
    if (res.status === 200) {
        await router.push('/products');
        alert("product Updated successfully!")
    }else{
        alert("Something went wrong! Please try again.")
    }
  }

  const uploadImage = async(e) => {
    setIsUploading(true)
    const files = e.target?.files;
    if(files?.length > 0){
      const data = new FormData();
      Array.from(files).forEach((file) => data.append('file', file));
      const res = await axios.post('/api/upload', data);
      const imgLink = res.data.link;
      setImagesLink((prev) => [...prev, imgLink]);
    }
    setIsUploading(false)
  }

  const removeImage = async(img) => {
    const newImagesLink = imagesLink.filter(link => link !== img)
    setImagesLink(newImagesLink);
    await axios.delete(`/api/upload?link=${img}`);
  }

  const updateImagesOrder = (images) => {
    setImagesLink(images);
  }

  const properties = {size:[], frame:[]}
  if (categories.length > 0 && category) {
    let selectedCategoryInfo = categories.find(({_id}) => _id === category );
    properties.size.push(...selectedCategoryInfo.properties?.size || [])
    properties.frame.push(...selectedCategoryInfo.properties?.frame || [])
    while(selectedCategoryInfo?.parent?._id){
      const parentCategoryInfo = categories.find(({_id}) => _id === selectedCategoryInfo?.parent?._id );
      properties.size.push(...parentCategoryInfo.properties?.size || [])
      properties.frame.push(...parentCategoryInfo.properties?.frame || [])
      selectedCategoryInfo = parentCategoryInfo;
    }
  }

  return (
    <div className="new-product-form-container">
        <h1 className="page-title">Edit Product</h1>

        <label>Name</label>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Uncategorized</option>
          {categories.length > 0 && categories.map(c => {
            return <option key={c._id} value={c._id}>{c.name}</option>
          })}
        </select>

        {category ? (
          properties.size.length > 0 && properties.frame.length > 0 ? (
            <div className="selected-category-properties-container">
              <div className="selected-category-property-box">
                <div className="property-title">Size properties</div>
                  <div className="property-varients-container">
                    {properties.size.map((item) => {
                      return (
                        <div className="size-property-varient-card">
                          <div>{item.width} x {item.height}</div>
                          <div className="property-price">₹{item.price}</div>
                        </div>
                      ) 
                    })}
                  </div>
              </div>
              <div className="selected-category-property-box">
                <div className="property-title">Frame Design properties</div>
                <div className="property-varients-container">
                  {properties.frame.map((item) => {
                    return (
                      <div className="frame-property-varient-card">
                        <div className="frame-design-img-container"><Image src={item.image} alt="frame design" /></div>
                        <div>{item.name}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
            </div>
          ) : (
            <div className="empty-properties-container-msg">No properties in the selected category</div>
          )
        ) : null}

        <label>Images</label>
        <div className="image-upload-container">
            <ReactSortable list={imagesLink} setList={updateImagesOrder} className="selectedImagesSorter">
                <>
                    {imagesLink.map((img) => {
                    return(
                        <div key={img} className="uploaded-img-box">
                            <Image src={img} alt="uploaded image"/>
                            <svg onClick={() => removeImage(img)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    )
                    })}
                    {isUploading && 
                        <div className="uploaded-img-box-loader">
                            <Image src="/assets/spinner.svg"/>
                        </div>
                    }
                </>
            </ReactSortable>
            <button className="upload-img-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <input type="file" onChange={uploadImage}/>
            </button>
        </div>

        {!imagesLink?.length && (
          <div className="no-img-prompt">No Images Added</div>
        )}

        <label>Description</label>
        <textarea type="text" placeholder="Product Description" value={desc} onChange={(e) => setDesc(e.target.value)} />

        <label>Base price</label>
        <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={EditProduct}>Save Changes</button>
    </div>
  )
}

export default EditProduct