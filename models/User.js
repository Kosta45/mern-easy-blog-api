import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
