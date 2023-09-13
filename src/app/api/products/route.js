
import { NextResponse } from 'next/server'
import {Product} from '../../../../models/Product'
import {mongooseConnect} from '../../../../lib/mongoose'

export async function POST(request) {
    await mongooseConnect();
    const {name, desc, price} = await request.json()
    const productDoc = await Product.create({
        title: name, description: desc, price: price,
    })
    return NextResponse.json(productDoc)
}
