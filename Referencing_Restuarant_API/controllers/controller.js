const resturantModel = require('../models/model')

const newResturant = async (req, res)=>{
    try {
        const newRes = await resturantModel.create(req.body)
        res.status(200).json({
            message: 'Contact created successfully',
            data: newRes
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const getResturant = async (req, res)=>{
    try {
        const user = await resturantModel.findById(req.params.id)
        .populate("citizenMeal",["main","sides","drink"])
        .populate("refuelMax",["main","sides","drink"])
        .populate("chickWizz",["main","sides","drink"])
        res.status(200).json({
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//update
const updateResturant = async (req, res) => {
    try {
      const resturantId = req.params.id;
      const updated = await resturantModel.findByIdAndUpdate(resturantId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        res.status(400).json({
          messaage: "error",
        });
      } else {
        res.status(200).json({
          messaage: "updated patient",
          data: updated,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };



//delete
const deleteResturant = async (req, res) => {
    try {
      const branchId = req.params.id;
      const branch = await resturantModel.findByIdAndDelete(branchId);
      if (!branch) {
        res.status(400).json({
          messaage: "error",
        });
      } else {
        res.status(200).json({
          messaage: "deleted branch",
          data: branch,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
    newResturant,
    getResturant,
    updateResturant,
    deleteResturant
}