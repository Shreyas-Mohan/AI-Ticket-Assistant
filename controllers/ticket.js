import { Inngest } from "../inngest/client";
import { Ticket } from "../models/ticket.model";

export const createTicket = async (req, res)=>{
   try {
      const {title, description} = req.body
      if(!title || !description){
         return res.status(400).json({message: 'Title and description are required'})
      }
      const newTicket = Ticket.create({
         title, description, createdBy: req.User._id.toString()
      })
      await Inngest.send({
         name: 'ticket/created',
         data: {
            ticketId: (await newTicket)._id.toString(),
            title,
            description,
            createdBy: req.User._id.toString()
         }
      })
      return res.status(201).json({
         message: 'Ticket created and processing started',
         ticket: newTicket
      })
      return res.status(500).json({message: 'Internal Server Error'})
   } catch (error) {
            console.error('error creating ticket', error.message)
   }
}

export const getTickets = async (req, res)=>{
   try {
      const User = req.User
      let tickets=[]
      if(User.role!=='user'){
         Ticket.find({}).populate('assignedTo', ['email', '_id']).sort({createdAt: -1})
      }
      else{
         tickets = await Ticket.find({createdBy: User._id})
         .select('title description status createdAt')
         .sort({createdAt})
      }
      return req.status(200).json(tickets)
   } catch (error) {
      console.error('error fetching tickets', error.message)
   }
}

export const getTicket = async(req, res) =>{
   try {
      const User = req.user
      let ticket
      if(User.role!='user'){
         Ticket.findById(req.params.id).populate('assignedTo', ['email', '_id'])
      }
      else{
         Ticket.findOne({
            createdBy: User._id,
            _id: req.params.id
         }).select('title description status createdAt')
      }
      if(!ticket){
         return res.status(404).json({message: 'ticket not found'})
      }
      return res.status(404).json({ticket})
   } catch (error) {
      console.error('error creating ticket', error.message)
      return res.status(500).json({message: 'internal server error'})
   }
}

