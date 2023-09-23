import React, { useState } from 'react'

const Dimensions = ({setInactive, setVarients, varients}) => {

  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [price, setPrice] = useState("");

  const handleAddVarient = (e) => {
    e.preventDefault();
    setVarients(prev => {
        return [...prev,{height: height, width: width, price: price}]
    })
    setWidth("");
    setHeight("");
    setPrice("");
  }

  const deleteDimensionVarient = (indexToRemove) => {
    const updatedVarients = varients.filter((_, index) => index !== indexToRemove);
    setVarients(updatedVarients);
  }

  return (
    <div className="size-details-input-container">
        <div className="top-bar-title-and-cancel">
            <label>Add Dimension varients</label>
            <svg onClick={() => {setInactive(false), setVarients([])}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <form className="new-varient-input-container" onSubmit={(e) => handleAddVarient(e)}>
            <input type="number" placeholder="Width" required value={width} onChange={(e) => setWidth(e.target.value)} />
            <input type="number" placeholder="Height" required value={height} onChange={(e) => setHeight(e.target.value)} />
            <input type="number" placeholder="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
            <button type="submit" className="add-varient-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                </svg>
            </button>
        </form>
        <div className="added-varients-preview-container">
            {varients.map((item, index) => {
                return (
                    <div className="size-varient-card" key={index}>
                        <span className="size">{item.width} x {item.height}</span>
                        <span className="price">₹{item.price}</span>
                        <div className="remove-varient-btn" onClick={() => deleteDimensionVarient(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Dimensions