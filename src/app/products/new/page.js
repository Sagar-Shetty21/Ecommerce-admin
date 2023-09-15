'use client'

import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { ReactSortable } from 'react-sortablejs';


const NewProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imagesLink, setImagesLink] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const CreateProduct = async() => {
    const data = {name, desc, price, images: imagesLink}
    const res = await axios.post('/api/products', data);
    if (res.status === 200) {
        await router.push('/products');
        alert("product added successfully!")
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

  const updateImagesOrder = (images) => {
    setImagesLink(images);
  }
  
  return (
    <div className="new-product-form-container">
        <h1 className="page-title">New Product</h1>

        <label>Name</label>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Images</label>
        <div className="image-upload-container">
            <ReactSortable list={imagesLink} setList={updateImagesOrder} className="selectedImagesSorter">
              <>
                {imagesLink.map((img) => {
                  return(
                    <div key={img} className="uploaded-img-box">
                      <img src={img} alt="uploaded image"/>
                    </div>
                  )
                })}
                {isUploading && 
                    <div className="uploaded-img-box-loader">
                        <img src="/assets/spinner.svg"/>
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

        <label>Price</label>
        <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={CreateProduct} className="create-product-btn">Save</button>
    </div>
  )
}

export default NewProduct