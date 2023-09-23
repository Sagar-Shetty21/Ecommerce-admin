
import { NextResponse } from 'next/server'
import {Category} from '../../../../models/Category'
import {mongooseConnect} from '../../../../lib/mongoose'
import { isAdminRequest } from '../auth/[...nextauth]/route';

export async function POST(request) {
    await mongooseConnect();
    await isAdminRequest();
    const {name, parent, properties} = await request.json()
    const categoryDoc = await Category.create({
        name,
        parent,
        properties
    })
    return NextResponse.json(categoryDoc)
}

export async function PUT(request) {
    await mongooseConnect();
    await isAdminRequest();
    const {name, parent, properties, id} = await request.json()
    const categoryDoc = await Category.updateOne({_id: id},{
        name,
        parent,
        properties
    })
    return NextResponse.json(categoryDoc)
}

export async function GET(request) {
    await mongooseConnect();
    await isAdminRequest();
    return NextResponse.json(await Category.find().populate('parent'));
}

export async function DELETE(request) {
    await mongooseConnect();
    await isAdminRequest();
    const id = request.nextUrl.searchParams.get('id');
    return NextResponse.json(await Category.deleteOne({_id: id}));
}