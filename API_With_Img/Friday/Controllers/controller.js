const profileModel= require("../Model/model.js")
const path = require("path")
const myCloudinary = require("../Config/cloudinary")






// function to create a food menu
// async function createProfile(req,res){try {
//     if(!req.file){
//         res.status(500).json({
//             message: "your file failed to upload"
//         })
//     } else{
//         const data = {
//             name : req.body.name,
//             class: req.body.class,
//             age: req.body.age,
//             ProfilePicture: req.file.path
//          }
//         const profile = await profileModel.create(data)
//         res.status(200).json({message:"Created Successfully",
//         show:profile})
//     }
// } catch (error) {
//     res.status(400).json({message:error.message})
// }

// }


const newContact = async (req,res) => {

    try{
      

            // Use the uploaded file's name as the asset's public ID and 
            // allow overwriting the asset with new versions
            const options = {
              use_filename: true,
              unique_filename: false,
              overwrite: true,
            }


         const result = await myCloudinary.uploader.upload(req.imageUrl, (error, resi) => {
            if (error) {
              console.log('Error:', error);
            } else {
              // Retrieve the secure URL of the uploaded file
              const secureUrl = resi.secure_url;
              console.log('Uploaded file URL:',result);
        
              // Perform further processing with the file URL if needed
              // ...
            }
          });
        
    } catch (error) {
        res.status(200).json({message:error.message})
    }

}
module.exports=newContact