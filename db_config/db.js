const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const multer  = require('multer');
const crypto = require('crypto');
let storage;
let upload;

async function connectToDb() {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone');
        if(connection) {
            console.log('Successfully connected to the database');
            storage = new GridFsStorage({
                db: connection,
                file: (req, file) => {
                    return new Promise((resolve, reject) => {
                        crypto.randomBytes(16, (err, buf) => {
                            if (err) {
                                return reject(err);
                            }
                            const filename = buf.toString('hex') + path.extname(file.originalname);
                            const fileInfo = {
                                filename: filename,
                                bucketName: 'Photos',
                                metadata: {
                                    destination: './uploads/photos'
                                }
                            };
                            resolve(fileInfo);
                        });
                    });
                }
            });
            upload = multer({storage});
        }
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {connectToDb, upload};