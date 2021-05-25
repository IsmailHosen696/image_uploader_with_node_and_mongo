const UploadModel = require('../model/schema');
const fs = require('fs');

exports.home = async (req, res) => {
    const all_images = await UploadModel.find();
    res.render('main', { images: all_images });
}
exports.uploads = (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('please chose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    // convert images into base 64 encoding
    let imgArray = files.map(file => {
        let img = fs.readFileSync(file.path);
        return encode_image = img.toString('base64');
    })

    let result = imgArray.map((src, index) => {
        // create obj to store in db
        let finalImg = {
            filename: files[ index ].originalname,
            contentType: files[ index ].mimetype,
            imageBase64: src
        }
        let newUpload = new UploadModel(finalImg);
        return newUpload.save()
            .then(() => {
                msg: `${files[ index ].originalname} uploaded successfully`
            }).catch(err => {
                if (err) {
                    if (err.name = 'MongoError' && err.code === 11000) {
                        return Promise.reject({ err: `duplicate ${files[ index ].originalname} . File Already exist` })
                    }
                    return Promise.reject({ err: message || `Cannot upload ${files[ index ].originalname} something wrong` })
                }
            })
    })

    Promise.all(result)
        .then(msg => {
            // res.send(msg)
            res.redirect('/')
        }).catch(err => {
            res.json(err)
        })
}