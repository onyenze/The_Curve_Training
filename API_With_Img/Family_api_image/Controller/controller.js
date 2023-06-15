const familyModel = require( '../Model/model' );
const path = require("path")
const fs = require("fs")





// function to create a family
async function createProfile(req,res){try {
    if(!req.files){
        res.status(500).json({
            message: "your file failed to upload"
        })
    } else{
        const data = {
            fatherName : req.body.fatherName,
            motherName: req.body.motherName,
            childrenName: req.body.childrenName,
            childrenImages: req.files.path
         }
        const profile = await familyModel.create(data)
        res.status(200).json({message:"Created Successfully",
        show:profile})
    }
} catch (error) {
    res.status(400).json({message:error.message})
}

}

// get all families
async function getFamily(req,res){try {
     const profiles = await familyModel.find()
     res.status(200).json({message:"found",
    data:profiles})

} catch (error) {
    res.status(500).json({message:error.message})
}

}

async function getProfile( req, res )  {
    try {
        const profileId = req.params.id;
        const profile = await familyModel.findById( profileId );
        if ( !profile ) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// update family info
const updateProfile = async (req, res) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
      const { fathersName, mothersName, childrenName } = req.body;
      const updateFields = {
          fathersName: fathersName || profile.fathersName,
          mothersName: mothersName || profile.mothersName,
          childrenName: childrenName || profile.childrenName,
          childrenImages: profile.childrenImages,
        };
  
      // check if the profileImage is to be updated
      if (req.files && req.files["childrenImages"]) {
        const oldProfileImagePath = `uploads/${profile.childrenImages}`;
        // Delete the old image if it exists
        if (fs.existsSync(oldProfileImagePath)) {
          fs.unlinkSync(oldProfileImagePath);
        }
        updateFields.childrenImages = req.files.childrenImages.map((child)=>child.filename);
      }
  
      const updatedProfile = await familyModel.findByIdAndUpdate(
        profileId,
        updateFields,
        { new: true }
        );
        console.log(updatedProfile)
      if (updatedProfile) {
        res.status(200).json({
          message: 'Updated successfully',
          data: updatedProfile,
        });
      } else {
        res.status(404).json({
          message: 'Profile not found.',
        });
      }
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };

// Delete a particular family
async function deleteProfile  (req, res)  {
    const profileId = req.params.id;
    try {
      const profile = await familyModel.findById(profileId);
      if (!profile) {
        return res.status(404).json({
          message: 'Profile not found.',
        });
      }
      const profileImagePath = `uploads/${profile.profileImage}`;
      if (fs.existsSync(profileImagePath)) {
        fs.unlinkSync(profileImagePath);
      }
      await familyModel.findByIdAndDelete(profileId);
      res.status(200).json({
        message: 'Profile deleted successfully',
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };

module.exports={createProfile,getFamily,getProfile,updateProfile,deleteProfile}