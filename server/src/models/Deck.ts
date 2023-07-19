import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const deckSchema = new Schema({
  title: String
})

deckSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const deckModel = mongoose.model('Deck', deckSchema)

export default deckModel;