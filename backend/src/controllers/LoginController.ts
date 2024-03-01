import {RequestHandler} from 'express'
import UserSchema from '../models/UserSchema'

export const getAllUsers:  RequestHandler= async (req, res, next) =>{
    try{
        const users = await UserSchema.find().exec()
        res.status(200).json(users)
    }
    catch(error){
        next(error)
    }
}

export const createUser:  RequestHandler = async (req, res, next) => {
    const {username, password, email, age, gender} = req.body
    try {
        const response = await UserSchema.create({username, password, email, age, gender})
        res.status(200).json(response)
    }
    catch(error){
        next(error)
    }
}

export const getOneuser: RequestHandler = async(req, res, next) => {
    const {id} = req.params
    try{
        const response = await UserSchema.find({_id: id})
        res.status(200).json(response)
    }
    catch(error){
        next(error)
    }
}

export const updateUserDetails: RequestHandler = async ( req, res, next ) => {
    const {id} = req.params
    try{
        res.json({ID: `${id} has been updated`})
    }
    catch(error){
        next(error)
    }
}