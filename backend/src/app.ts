import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import LoginUser from './routes/LoginUser'

const app = express()

app.use(express.json())
app.use( (req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.get("/", (req, res) => {
    res.json({Message: "Triggered Index endpoint"})
})

app.use("/login", LoginUser)

app.use( (req, res, next) => {
    next(Error("Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use( (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    let errorMessage = "An error has occured"
    if (error instanceof Error) errorMessage = error.message
    res.status(500).json({Error: errorMessage})
})



export default app