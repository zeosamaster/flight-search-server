import mongoose, { Schema } from 'mongoose'

const quotesSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  Country: {
    type: String
  },
  Currency: {
    type: String
  },
  Locale: {
    type: String
  },
  Origin: {
    type: String
  },
  Destination: {
    type: String
  },
  OutDate: {
    type: String
  },
  InDate: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

quotesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      Country: this.Country,
      Currency: this.Currency,
      Locale: this.Locale,
      Origin: this.Origin,
      Destination: this.Destination,
      OutDate: this.OutDate,
      InDate: this.InDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Quotes', quotesSchema)

export const schema = model.schema
export default model
