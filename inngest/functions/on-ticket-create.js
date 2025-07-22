import { NonRetriableError } from "inngest";
import { user } from "../../models/user.model.js";
import { Inngest } from "../client.js";
import { sendmail } from "../../utils/mailer.js";
import Ticket from '../../models/ticket.model.js'
import analyzeTicket from "../../routes/agent.js";

export const onTicketCreate = Inngest.createFunction(
   { id: 'on-ticket-created', retries:2 },
   {event: 'ticket/created'}, 
   async({event, step}) =>{
      try {
        const {ticketId} = event.data
        const ticket = await step.run('fetch-ticket', async () => {
        const ticketObj = await Ticket.findById(ticketId)
        if(!ticket){
         throw new NonRetriableError('ticket not found')
        }
        return ticketObj
        })

        await step.run('update-ticket-status', async ()=>{
         await Ticket.findByIdAndUpdate(ticket._id, {status:'TODO'})
        })

        const aiResponse = await analyzeTicket(ticket)
        const relatedSkills = await step.run('ai-processing', async ()=>{
         let skills = []
         if(aiResponse){
            await Ticket.findByIdAndUpdate(ticket._id, {
               priority: !['low','medium','high'].includes(aiResponse.priority) ? 'medium': aiResponse.priority,
               helpfulNotes: aiResponse.helpfulNotes,
               status: 'IN_PROGRESS',
               relatedSkills: aiResponse.relatedSkills
            })
            skills=aiResponse.relatedSkills
         }
         return skills
        })

        const moderator = await step.run('assign-moderator', async ()=>{
         let User = await user.findOne({
            role: 'moderator', 
            skills: {$elemMatch: {
               $regex: relatedSkills.join('|'), 
               $options: 'i'
            }
         }})
         if(!User){
            User = await user.findOne({role: 'admin'})
         }
         await Ticket.findByIdAndUpdate(ticket._id, {
            assignedTo: User?._id || null
         })
         return User
        })

        await step.run('send-email-notification', async()=>{
         if(moderator){
            const final_ticket = await Ticket.findById(ticket._id)
            await sendmail(
               moderator.email, 
               'Ticket Assigned', 
               `A new ticket is assigned to you. ${final_ticket.title}`
            )
         }
        })

        return {success: true}
      } catch (error) {
         console.error('error running the step', error.message)
      }
   }
)