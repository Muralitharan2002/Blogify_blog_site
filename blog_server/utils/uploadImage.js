const cloudinary = require('cloudinary').v2;

const uploadImage = async (image) => {
    try {

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });



        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        try {
            const result = await cloudinary.uploader.upload(image, options);
            // console.log(result);
            return result.secure_url
        } catch (error) {
            // console.error(error);
            res.json({ message: "image uploading process failed", status: "failed", Error: err.message })
        }


    } catch (err) {
        // console.log(err)
        return res.json({ message: "image uploading process Error", status: "error", Error: err.message })
    }
}

module.exports = uploadImage

