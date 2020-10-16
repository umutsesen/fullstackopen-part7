/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const commentSchema = new mongoose.Schema({
  comment: String,
})

commentSchema.plugin(uniqueValidator)
commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comments = mongoose.model('Comments', commentSchema)
module.exports = Comments
