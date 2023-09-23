import React, { useState } from 'react'
import axios from 'axios';

const FrameDesign = ({setInactive, setVarients, varients}) => {

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async(e) => {
    setIsUploading(true)
    const files = e.target?.files;
    if(files?.length > 0){
      const data = new FormData();
      Array.from(files).forEach((file) => data.append('file', file));
      const res = await axios.post('/api/upload', data);
      const imgLink = res.data.link;
      setImage(imgLink);
    }
    setIsUploading(false)
  }

  const handleAddVarient = (e) => {
      e.preventDefault();
      setVarients(prev => {
        return [...prev,{name: name, image: image}]
      })
      e.target.querySelector('#fileInput').value = "";
      setName("");
      setImage("");
  }

  const deleteFrameVarient = (indexToRemove) => {
    const updatedVarients = varients.filter((_, index) => index !== indexToRemove);
    setVarients(updatedVarients);
  }

  return (
    <div className="framedesign-details-input-container">
        <div className="top-bar-title-and-cancel">
            <label>Add frame design varients</label>
            <svg onClick={() => {setInactive(false), setVarients([])}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <form className="new-varient-input-container" onSubmit={(e) => handleAddVarient(e)}>
            <input type="text" placeholder="Frame name" required value={name} onChange={(e) => setName(e.target.value)} />
            <div className="varient-reference-img-upload-btn">
                {isUploading && 
                    <div className="img-uploading-loader">
                        <img src="/assets/spinner.svg"/>
                    </div>
                }
                {image == "" ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                :   
                    <>
                        <img src={image} alt="uploaded img" className="thumbnail"/>
                    </>
                }
                <input id="fileInput" type="file" required onChange={uploadImage} />
            </div>
            <button className="add-varient-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                </svg>
            </button>
        </form>
        <div className="added-varients-preview-container">
            {varients.map((item, index) => {
                return (
                    <div className="frame-varient-card" key={index}>
                        <div className="image"><img src={item.image}/></div>
                        <div className="name">{item.name}</div>
                        <div className="remove-varient-btn" onClick={() => deleteFrameVarient(index)}>Remove</div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default FrameDesign