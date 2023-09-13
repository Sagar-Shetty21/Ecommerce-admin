import Link from 'next/link'
import React from 'react'

const Product = () => {
  return (
    <Link href={'products/new'} className="create-new-product-btn">Add a product</Link>
  )
}

export default Product