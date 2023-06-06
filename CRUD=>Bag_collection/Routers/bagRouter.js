const express = require("express")
const {newCollection, viewAll, updateInfo} = require("../Controllers/Bag")

const Router = express.Router()
Router.route("/new").post(newCollection)
Router.route("/view").get(viewAll)
Router.route("/update/:id").patch(updateInfo)
module.exports = Router