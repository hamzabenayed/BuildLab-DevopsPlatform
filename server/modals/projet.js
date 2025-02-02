import mongoose from "mongoose";
import contributorSchema from "./contributor.js";

const { Schema, model } = mongoose;
const projectSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        contributors: {
            type: [contributorSchema.schema],
            default: []
          },

        name: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: false

        },

        releaseType: {
            type: String,
            enum: ['Alpha', 'Beta', 'Entreprise', 'Production', 'Share'],
            default: 'Alpha'

        },
        opSystem: {
            type: String,

            enum: ['IOS', 'Android', 'Windows', 'MacOs', 'TvOs'],
            default: 'Android'
        },

        platform: {
            type: String,
            enum: ['Swift', 'React Native', 'Xamarin', 'Flutter'],
            default: 'Flutter'
        }


    });
export default model("project", projectSchema);