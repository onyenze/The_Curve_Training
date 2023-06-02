const express = require("express")
const mongoose = require("mongoose")
 const PORT = 5677

 const app = express()
 app.use(express.json())

const electionSchema = mongoose.Schema({
    state: String,
    parties: Array,
    result: Object,
    colationOfficer: String,
    isRigged: {
        type: Boolean,
        default: function () {
          let totalVoters = 0;
          for (const [key, value] of Object.entries(this.result)) {
            totalVoters += value;
          }
          if (totalVoters > this.totalRegisteredVoters) {
            return true;
          } else {
            return false;
          }
        },
      },
    totalLg: Number,
    winner: {
        type: String,
        default: function () {
          let maxKey = null;
          let maxValue = -Infinity;
          for (const [key, value] of Object.entries(this.result)) {
            if (value > maxValue) {
              maxValue = value;
              maxKey = key;
            }
          }
          return maxKey;
        },
        required: false,
      },
      totalVoters: {
        type: Number,
        default: function () {
          let totalVoters = 0;
          for (const [key, value] of Object.entries(this.result)) {
            totalVoters += value;
          }
          return totalVoters;
        },
      },
      totalRegisteredVoters: {
        type: Number,
        required: [
          true,
          "Enter the total number of registerd voters in this state",
        ],
      },

})

const electionModel = mongoose.model("Presidential Election", electionSchema)

app.get("/",(req,res)=>{
    res.send("Welcome to my Election API")
})


// create an entry
app.post("/create",async (req,res)=>{try {
    const newEntry = await electionModel.create(req.body)
    res.status(200).json({data:newEntry})
} catch (error) {
    console.log(error.message)
}
})

// get all the entries
app.get("/election", async (req, res) => {
    try {
      const entry = await electionModel.find();
      if (!entry) {
        res.status(404).json({
          message: "database not found",
        });
      } else if (entry.length == 0) {
        res.status(200).json({
          message: "no entry on the database",
        });
      } else {
        res.status(200).json({
          message: "successful",
          data: entry,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

//getting entry based on ID
app.get("/election/:id", async (req, res) => {
    try {
      const entryId = req.params.id;
      const entry = await electionModel.findById(entryId);
      if (!entry) {
        res.status(404).json({
          message: "entry not found",
        });
      } else {
        res.status(200).json({
          message: "successful",
          data: entry,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });


//updating entry based on ID
app.put("/election/:id", async (req, res) => {
    try {
      const entryId = req.params.id;
      const updatedEntry = await electionModel.findByIdAndUpdate(entryId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedEntry) {
        res.status(404).json({
          message: "entry not found",
        });
      } else {
        res.status(200).json({
          message: "entry updated",
          data: updatedEntry,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });


//deleting entry
app.delete("/election/:id", async (req, res) => {
    try {
      const entryId = req.params.id;
      const deletedEntry = await electionModel.findByIdAndDelete(entryId);
      if (!deletedEntry) {
        res.status(404).json({
          message: "entry not found",
        });
      } else {
        res.status(200).json({
          message: "entry deleted",
          data: deletedEntry,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Getting where the election is rigged
app.get("/electionRigged", async (req, res) => {
    try {
      const riggedEntry = await electionModel.find({isRigged:true});
      if (!riggedEntry) {
        res.status(404).json({
          message: "database not found",
        });
      } else if (riggedEntry.length == 0) {
        res.status(200).json({
          message: "no entry on the database",
        });
      } else {
        res.status(200).json({
          message: "successful",
          data: riggedEntry,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });


// find where we have double collation officer
app.get("/collation/:collation", async (req, res) => {
    try {
      const entry = await electionModel.find({colationOfficer :req.params.collation,});
      if (entry.length<1) {
        res.status(404).json({
          message: "not an officer",
        });
      } else if (entry.length>1) {
        res.status(200).json({
          message: "Worked on two states",
          data: entry,
        });
      }
      else {res.status(200).json({
        message: "Worked on one state",
        data: entry
      })}
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
// to delete the rigged elections
app.delete("/riggedElection", async (req,res)=>{
    try {
        const riggedElection = await electionModel.find({isRigged:true})
        const deletedEntry = await electionModel.deleteMany({isRigged:true})
        res.status(200).json({
            message:"These are the rigged Elections",
            data:riggedElection,
            status:deletedEntry
        })
    } catch (error) {
        console.log(error.message)
    }
})








 app.listen(PORT,()=>{console.log("working on some port")})
 mongoose.connect("mongodb+srv://chibuezeonyenze123:jzwWbLsC87KcZwjd@cluster0.3w8at1x.mongodb.net/").then(()=>{console.log("working as well")})