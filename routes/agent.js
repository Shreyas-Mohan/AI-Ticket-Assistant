import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
   const supportAgent = createAgent({
      model: gemini({
         model: 'gemni-2.5-flash',
         apiKey: process.env.GEMINI_API_KEY
      }),
      name: 'AI Ticket Triage Assistant',
      system: `   u r an expert ai assistant that processes technical support tickets. 
      ur job is to 
      1. summarize 
      2. estimate its priority 
      3. provide helpful notes and resource links for human moderators 
      4. list relvanttechnical skills required
      important: respond with *only* valid raw json. don't include md, code fences, comments or any extra formatting. format must be a raw json object.`
   })
   const resposne = await supportAgent.run(`
      u r a ticket triage agent only return a strict json with no extra text, headers, md.
      analyze the following support ticket and provide a json object with:
      summary - a short 1-2 sentence summary of the issue.
      priority - one of 'low ' medium 'high
      helpfulNotes - a detaied explanation thata moderator can use to resolve this issue . include helpful external links or resources if possible
      reletedSkills- an array of releveant skills required to solve the issue (ex-['React', 'MongoDB'])
      respond only in json and don't include any other text or md in the answer:
      {
         "summary": 'short summary of the ticket',
         "priority": "high",
         "helpfulNotes": "here are useful tips...",
         "relatedSkills": ['React', 'Node.js']
      }
         Ticket information : 
         Title: ${ticket.title}
         Description: ${ticket.description}
      ` 
   )
   const raw = resposne.output[0].content
   try {
      const match = raw.match(/```json\s*([\s\S]*?)\s*```/i)
      const jsonString = match?match[1]:raw.trim()
      return JSON.parse(jsonString)
   } catch (err) {
      console.error('filed to parse json from ai response'+e.message)
      return null
   }
}

export default analyzeTicket
