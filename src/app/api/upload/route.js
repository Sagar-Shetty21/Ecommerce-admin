import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request){
    const formData = await request.formData();
    const file = formData.get("file");

    const buffer = Buffer.from(await file.arrayBuffer());
    //const relativeUploadDir = `/uploads`;
    //const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

        //await writeFile(`${uploadDir}/${filename}`, buffer);

        const client = new S3Client({
            region: 'ap-south-1',
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
            }
        })
        await client.send(new PutObjectCommand({
            Bucket: 'svr-color-lab',
            Key: filename,
            Body: buffer,
            ACL: 'public-read',
            ContentType: mime.getExtension(file.type)
        }))
        const link = `https://svr-color-lab.s3.amazonaws.com/${filename}`
        return NextResponse.json({ link });
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
}

export const config = {
    api: {bodyParser: false},

}

