const referencedModel = require('../models/referencedModel')
const resturantModel = require('../models/model')




const newReference = async (req, res)=>{
    try {
        const branch = await resturantModel.findById(req.params.id)
        const branchReference = await referencedModel.create(req.body)
        branchReference.link = branch
        branchReference.save()
        
        if(req.body.refuelMax) {
            branch.refuelMax.push(branchReference)
        } else if (req.body.citizenMeal) {
            branch.citizenMeal.push(branchReference)
        } else if (req.body.chickWizz) {
            branch.chickWizz.push(branchReference)
        }

        branch.save()
        res.status(200).json({
            message: 'reference created',
            data: branchReference
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// create new menu
// const newReference = async (req, res) => {
//     try {
//       const branch = await resturantModel.findOne({
//         branchName: req.body.branch.branchName,
//       });

//       if (!branch) {
//         res.status(500).json({ message: "branch does not exist" });
//       }
//       const menu = await referencedModel.create({
//         mealName: req.body.mealName,
//         branch: {
//           branchName: req.body.branch.branchName,
//           link: branch._id,
//         },
//         main: req.body.main,
//         side: req.body.side,
//         drink: req.body.drink,
//       });
  


//       if (req.body.mealName === "citizenMeal") {
//         branch.citizenMeal = menu._id;
//         await branch.save();
//       } else if (req.body.mealName === "refuelMax") {
//         branch.refuelMax = menu._id;
//         await branch.save();
//       } else if (req.body.mealName === "chickWizz") {
//         branch.chickWizz = menu._id;
//         await branch.save();
//       } 
//       res.status(200).json(menu);
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };
  




const getReference = async (req, res)=>{
    try {
        const reference = await referencedModel.findById(req.params.id);
        res.status(200).json({
            data: reference
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateReference = async (req, res)=>{
    try {
        const update = await referencedModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!update) {
            res.status(404).json({
                message: 'reference not found'
            })
        } else {
            res.status(200).json({
                message: 'reference updated',
                data: update
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const deleteReference = async (req, res)=>{
    try {
        const resturantId = req.params.resturantId; 
        const referenceId = req.params.referenceId
        const branch = await resturantModel.findById(resturantId);


        const deleteRef = await referencedModel.findByIdAndDelete(referenceId);
        await branch.save();
        if (!deleteRef) {
            res.status(404).json({
                message: 'cannot delete'
            });
        } else {
            res.status(200).json({
                message: 'success',
                data: deleteRef
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    newReference,
    getReference,
    updateReference,
    deleteReference
}