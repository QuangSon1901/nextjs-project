import { NextResponse } from 'next/server';
import fs from 'fs';
import { v4 } from 'uuid';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pathParam: string | null = searchParams.get('path');

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const filePath = pathParam;

    const files = fs.readdirSync('./public' + filePath);

    const result: any = [];
    files.forEach((file) => {
        const path = './public' + filePath + '/' + file;
        const stats = fs.statSync(path);

        const isFile = stats.isFile();
        const type = isFile ? 'file' : 'directory';
        const extension: any = isFile ? path.split('.').pop() : null;

        if (type === 'file' && !imageExtensions.includes(extension)) {
            return;
        }

        const url = isFile ? 'http://localhost:3000' + filePath + '/' + file : null;

        result.push({
            id: v4(),
            name: file,
            type: type,
            extension: extension,
            url: url,
        });
    });

    return NextResponse.json({ files: result }, { status: 200 });
}

export async function POST(request: Request) {
    const body = await request.json();

    try {
        fs.mkdirSync(`./public${body.path}/${body.name}`);
        return NextResponse.json(
            {
                folder: {
                    id: v4(),
                    name: body.name,
                    type: 'directory',
                    extension: null,
                    url: null,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json({}, { status: 400 });
    }
}
