import mongoose from 'mongoose'

const photoSchema = mongoose.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Photo = mongoose.model('photos', photoSchema)

export default Photo