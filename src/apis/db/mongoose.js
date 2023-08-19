

const mongoose =require("mongoose")
require("dotenv").config()

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify:false
// }

mongoose.connect(process.env.DB ).then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log(e);
})
