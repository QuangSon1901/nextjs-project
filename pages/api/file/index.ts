// import { NextApiRequest, NextApiResponse } from 'next';
// import multiparty from 'multiparty';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const upload = multer().any();
export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: any, res: any) {
    await new Promise<void>((resolve, reject) => {
        upload(req, null as any, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    const pathDirectory = req.body.path;
    const files = req.files;

    for (const file of files) {
        const filePath = path.join(process.cwd(), `public${pathDirectory}`, file.originalname);
        const fileStream = fs.createWriteStream(filePath);
        fileStream.write(file.buffer);
        fileStream.end();
        const extension: any = file.originalname.split('.').pop();
        return res.status(200).json({
            file: {
                id: v4(),
                name: file.originalname,
                type: 'file',
                extension: extension,
                url: process.env.API_URL + pathDirectory + '/' + file.originalname,
            },
        });
    }
}
