import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
const PORT=3000
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
   console.log('mongo db connected');
   app.listen(PORT, () => {
      console.log('server at http://localhost:' + PORT);
   })
})
.catch((err)=>console.error('mongo db error: ',err))
