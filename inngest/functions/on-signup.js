import { NonRetriableError } from "inngest";
import { user } from "../../models/user.model.js";
import { Inngest } from "../client.js";
import { sendmail } from "../../utils/mailer.js";

export const onUserSignup = Inngest.createFunction(
   {id: 'on-user-signup', retries: 2},
   {event: 'use/signup'},
   async({event, step}) => {
      try {
         const {email} = event.data
         await step.run('get-user-email', async ()=>{
           const userObj = await user.findOne({email})
           if(!userObj){
            throw new NonRetriableError('user no longer exists in our database')
           } return userObj
         })

         await step.run('send-welcome-email', async ()=>{
            const subject = `welcome to the app`
            const message = `hi
            \n\n
            Thanks for signing up. We're glad to have you onboard!`
            await sendmail(user.email, subject, message)
         })
         return {success: true}

      } catch (error) {
         console.error('error running step', error.message)
         return {success: false}
      }
   }
)