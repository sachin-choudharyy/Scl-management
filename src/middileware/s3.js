require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');


const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3({
    accessKeyId ,
    secretAccessKey 

});
module.exports={
    
    uploadfilestoaws:async(req,res,next)=>{
        // console.log("1",req.file);
        const filename = req.file.filename;
        try{
            var params = {
                Bucket: 'testingfornode',
                Body : fs.createReadStream(req.file.path),
                Key : `School_Docs/${filename}`
              };

            const result = await s3.upload(params).promise()
             url = s3.getSignedUrl('getObject', {
                Bucket: "testingfornode",
                Key: `user_Images/${filename}`,
                // Expires: "signedUrlExpireSeconds"

            })
          
            console.log(url)
            req.url=url
            next();
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                success:false,
                message:"server not found",
            error:err
            })
        }
       
    }
}