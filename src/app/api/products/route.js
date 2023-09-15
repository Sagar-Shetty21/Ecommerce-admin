
import { NextResponse } from 'next/server'
import {Product} from '../../../../models/Product'
import {mongooseConnect} from '../../../../lib/mongoose'

export async function POST(request) {
    await mongooseConnect();
    const {name, desc, price, images, category} = await request.json()
    const productDoc = await Product.create({
        title: name, description: desc, price: price, images: images, category
    })
    return NextResponse.json(productDoc)
}

export async function GET(request) {
    await mongooseConnect();
    const id = request.nextUrl.searchParams.get('id');
    if(id){
        return NextResponse.json(await Product.findOne({_id: id}));
    }
    return NextResponse.json(await Product.find());
}

export async function PUT(request) {
    await mongooseConnect();
    const {name, desc, price, productId, images, category} = await request.json()
    const productDoc = await Product.updateOne({_id: productId},{
        title: name, description: desc, price: price, images: images, category
    })
    return NextResponse.json(productDoc)
}

export async function DELETE(request) {
    await mongooseConnect();
    const id = request.nextUrl.searchParams.get('id');
    if(id){
        return NextResponse.json(await Product.deleteOne({_id: id}));
    }
    return NextResponse.json(await Product.find());
}
