const express = require("express")
const {newCollection, viewAll, updateInfo,deleteData} = require("../Controllers/Bag")

const Router = express.Router()
Router.route("/new").post(newCollection)
Router.route("/view").get(viewAll)
Router.route("/update/:id").patch(updateInfo)
Router.route("/delete/:id").delete(deleteData)
module.exports = Router