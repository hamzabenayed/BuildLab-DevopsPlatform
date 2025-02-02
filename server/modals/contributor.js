import mongoose from "mongoose";
import userSchema from "./user.js";
const { Schema, model } = mongoose;
const contributorSchema = new Schema(
  {
    role: {
      type: String,
      required: false,
      enum: ['Developer', 'Tester', 'Maintainer'],
      default: 'Maintainer'

    },

    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project'
    }],

    user: {
      type: [userSchema.schema],
      default: []
    }

  });

export default model("contributor", contributorSchema);