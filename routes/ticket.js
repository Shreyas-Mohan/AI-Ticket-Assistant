import express from 'express'
import { authenticate } from '../middleware/auth'
import { createTicket, getTicket, getTickets } from '../controllers/ticket'

const route = express.Router()
route.get('/', authenticate, getTickets)
route.get('/:id', authenticate, getTicket)
route.post('/', authenticate, createTicket)

export default route