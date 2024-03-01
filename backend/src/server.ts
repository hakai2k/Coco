import app from './app'
import mongoose from 'mongoose'
import env from './util/ValidateEnv'

const port = env.PORT

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then( () => {
        app.listen(port, () =>{
            console.log("Listening on port", port)
        })
    })
    .catch(console.error)