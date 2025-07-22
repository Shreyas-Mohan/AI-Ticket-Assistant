import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { user } from '../models/user.model.js'
import { Inngest } from '../inngest/client.js'

export const signup = async (req, res) =>{
   const {email, password, skills = []} = req.body
   try {
      const hashed_pass = bcrypt.hash(password)
      const User = await user.create({email, password: hashed_pass, skills})
      await Inngest.send({
         name: 'user/signup',
         data: {email}
      })
      const token = jwt.sign({_id: User._id, role: User.role}, process.env.JWT_SECRET)
      return res.json(User, token)
   } catch (error) {
      res.status(500).json({error: 'signup failed', details: error.message})
   }
}

export const login = async (req, res)=> {
   const {email, password} = req.body
   try {
      const User = user.findOne({email})
      if(!User){
         return res.status(401).json({error: 'user not found'})
      }
      const match = await bcrypt.compare(password, User.password)
      if(!match){
         return res.status(401).json({error: 'invalid credentials'})
      }
      const token = jwt.sign({_id: User._id, role: User.role}, process.env.JWT_SECRET)
      res.json({User, token})
}
   catch (error) {
      res.status(500).json({error: 'login failed', details: error.message})
   }
}

export const logout = async (req, res) =>{
   try {
      const token = req.headers.authorization.split(' ')[1]
      if(!token) return res.status(401).json({error: 'unauthorized'})
         jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
      if(err) return res.status(401).json({error: 'unauthorized'})
      })
      res.json({message: 'logout successfully'})
   } catch (error) {
      res.status(500).json({error: 'logout failed', details: error.message})
   }
}

export const updateuser = async(req, res)=>{
   const {skills=[], role, email} = req.body
   try {
      if(req.User?.role !== 'admin') {
         return res.status(403).json({error: 'forbidden'})
      }
      const User = await user.findOne({email})
      if(!User) return res.status(401).json({error: 'user not found'})
      await user.updateOne(
         {email},
         {skills: skills.length ? skills: User.skills},
         {role}
      )
      return res.json({message: 'user updated successfully'})
   } catch (error) {
      res.status(500).json({error: 'update failed', details: error.message})
   }
}

export const getuser = async(req, res)=>{
   try {
      if(req.user.role !== 'admin'){
         return res.status(403).json({error: 'forbidden'})
      }
      const Users = await user.find().select('-password')
      return res.json(Users)
   } catch (error) {
      res.status(500).json({error: 'could not get current user details', details: error.message})
   }
}
