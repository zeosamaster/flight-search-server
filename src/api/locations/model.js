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
    view(full = this) {
        let continent = {
            id: full.ContinentId,
            name: full.ContinentName
        };
        let country = {
            id: full.CountryId,
            name: full.CountryName,
            continent
        };
        let city = {
            id: full.CityId,
            name: full.CityName,
            country
        };
        let coords = {
            y: full.CoordsY,
            x: full.CoordsX
        };
        let airport = {
            id: full.Id,
            code: full.Code,
            name: full.Name,
            coords,
            city
        }
        return airport;
    }
};

const model = mongoose.model("Locations", locationsSchema);

export const schema = model.schema;
export default model;
