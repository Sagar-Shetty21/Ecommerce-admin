
import { NextResponse } from 'next/server'
import {Category} from '../../../../models/Category'
import {mongooseConnect} from '../../../../lib/mongoose'

export async function POST(request) {
    await mongooseConnect();
    const {name} = await request.json()
    const categoryDoc = await Category.create({
        name
    })
    return NextResponse.json(categoryDoc)
}

export async function GET(request) {
    await mongooseConnect();
    return NextResponse.json(await Category.find());
}