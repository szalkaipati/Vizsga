import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false,
    },
};

interface FormidablePromiseResult {
    fields: formidable.Fields;
    files: formidable.Files;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { fields, files } = await new Promise<FormidablePromiseResult>((resolve, reject) => {
                const form = new formidable.IncomingForm();
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ fields, files });
                });
            });

            const file = files.file as formidable.File[];

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const fileData = await fs.readFile(file[0].filepath);

            // const result = await prisma.files.create({
            //     data: {
            //       file_name: file[0].originalFilename ?? '',
            //       mimetype: file[0].mimetype ?? '',
            //       created_at: new Date(),
            //     },
            //   });

            // res.status(200).json(result);
        } catch (error) {
            console.error('Error processing file upload:', error);
            res.status(500).json({ error: 'Failed to process file upload' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;