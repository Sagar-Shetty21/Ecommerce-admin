
import { NextResponse } from 'next/server'
import {Category} from '../../../../models/Category'
import {mongooseConnect} from '../../../../lib/mongoose'

export async function POST(request) {
    await mongooseConnect();
    const {name, parent} = await request.json()
    const categoryDoc = await Category.create({
        name,
        parent
    })
    return NextResponse.json(categoryDoc)
}

export async function PUT(request) {
    await mongooseConnect();
    const {name, parent, id} = await request.json()
    const categoryDoc = await Category.updateOne({_id: id},{
        name,
        parent
    })
    return NextResponse.json(categoryDoc)
}

export async function GET(request) {
    await mongooseConnect();
    return NextResponse.json(await Category.find().populate('parent'));
}

export async function DELETE(request) {
    await mongooseConnect();
    const id = request.nextUrl.searchParams.get('id');
    return NextResponse.json(await Category.deleteOne({_id: id}));
}