
import { NextResponse } from 'next/server'
import {mongooseConnect} from '../../../../../lib/mongoose'
import { isAdminRequest } from '../../auth/[...nextauth]/route';
import { FeaturedProduct } from '../../../../../models/FeaturedProduct';

export async function POST(request) {
    await mongooseConnect();
    await isAdminRequest();
    const {productId} = await request.json()
    await FeaturedProduct.deleteMany({});
    const FeaturedProductDoc = await FeaturedProduct.create({
        product: productId
    })
    return NextResponse.json(FeaturedProductDoc)
}

export async function GET(request) {
    await mongooseConnect();
    await isAdminRequest();
    return NextResponse.json(await FeaturedProduct.find().populate('product'));
}

