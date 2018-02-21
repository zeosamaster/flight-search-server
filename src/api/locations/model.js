import mongoose, { Schema } from "mongoose";

const locationsSchema = new Schema(
  {
    Code: {
      type: String
    },
    Name: {
      type: String
    },
    CoordsX: {
      type: Number
    },
    CoordsY: {
      type: Number
    },
    CityId: {
      type: String
    },
    CityName: {
      type: String
    },
    CountryId: {
      type: String
    },
    CountryName: {
      type: String
    },
    ContinentId: {
      type: String
    },
    ContinentName: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

locationsSchema.methods = {
  view(full) {
    return full
      ? {
          ...this
          // add properties for a full view
        }
      : this;
  }
};

const model = mongoose.model("Locations", locationsSchema);

export const schema = model.schema;
export default model;
