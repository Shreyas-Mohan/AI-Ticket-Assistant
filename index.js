import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/user.js'
import ticketRoutes from './routes/ticket.js'
import { serve } from 'inngest/express'
import { Inngest } from './inngest/client.js'
import { onUserSignup } from './inngest/functions/on-signup.js'
import { onTicketCreate } from './inngest/functions/on-ticket-create.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT=3000
app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/ticket', ticketRoutes)
app.use('/api/inngest', serve({
   client: Inngest, 
   functions: [onTicketCreate, onUserSignup]
}))

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
   console.log('mongo db connected');
   app.listen(PORT, () => {
      console.log('server at http://localhost:' + PORT);
   })
})
.catch((err)=>console.error('mongo db error: ',err))
