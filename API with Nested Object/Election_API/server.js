const  express = require("express")
const mongoose = require("mongoose")
PORT = 4678

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{res.status(200).json({message:"Welcome to this election API"})})

const electionSchema = mongoose.Schema({
    state: String,
    parties: {type:Array},
    result: {
        apc : {type:Number,required: [true, "Number is required"] },
        pdp : {type:Number,required: [true, "Number is required"] },
        lp : {type:Number,required: [true, "Number is required"] },
        apga : {type:Number,required: [true, "Number is required"] }
    },
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
            }if (this.isRigged === false)
            {return `is ${maxKey} with ${maxValue} votes`;}
            else {return "\n but there is no real winner because it was rigged" }
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

// create an entry
app.post("/create",async (req,res)=>{try {
    const newEntry = await electionModel.create(req.body)
    res.status(200).json({data:newEntry})
} catch (error) {res.send(error.message)
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

// to delete the rigged elections
app.delete("/riggedElection", async (req,res)=>{
    try {
        const riggedElection = await electionModel.find({isRigged:true})
        const deletedEntry = await electionModel.deleteMany({isRigged:true})
        res.status(200).json({
            message:"These are the rigged Elections and will be deleted",
            data:riggedElection,
            status:deletedEntry
        })
    } catch (error) {
        console.log(error.message)
    }
})

// to get winner in a particular state
app.get("/winner/:state", async (req, res) => {
    try {
        const stateName = req.params.state
        const statePosition = await electionModel.find({state:stateName})
        const winningParty =statePosition[0].winner
        res.status(200).json({message:`The Winner of the Election in ${stateName} state ${winningParty} `})
    } catch (error) {
        
    }
})


mongoose.connect("mongodb+srv://chibuezeonyenze123:jzwWbLsC87KcZwjd@cluster0.3w8at1x.mongodb.net/").then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e.message);
  });
app.listen(PORT,()=>{console.log("This port is working")})