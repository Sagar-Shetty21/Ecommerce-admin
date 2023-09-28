import { NextResponse } from 'next/server'
import {mongooseConnect} from '../../../../lib/mongoose'
import { isAdminRequest } from '../auth/[...nextauth]/route';
import { Admins } from '../../../../models/Admins';

export async function POST(request) {
    await mongooseConnect();
    await isAdminRequest();
    const {gmail} = await request.json()
    const AdminDoc = await Admins.create({
        gmail
    })
    return NextResponse.json(AdminDoc)
}

export async function GET(request) {
    await mongooseConnect();
    await isAdminRequest();
    return NextResponse.json(await Admins.find());
}

export async function DELETE(request) {
    await mongooseConnect();
    await isAdminRequest();
    const id = request.nextUrl.searchParams.get('id');
    return NextResponse.json(await Admins.deleteOne({_id: id}));
}