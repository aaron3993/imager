import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import photoRoutes from './routes/photos.js'

const app = express()
dotenv.config()

app.use('/photos', photoRoutes)

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)