import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req: Request, file: Multer.File, cb: (error: Error | null, destination: string) => void) {
        const dir = './uploads/';
        cb(null, dir);
    },
    filename: function (req: Request, file: Multer.File, cb: (error: Error | null, filename: string) => void) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix); 
    },
});

const upload = multer({ storage });
