import mongoose from "mongoose";

const CompletionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CompletionSchema.index({ date: 1, habit: 1, user: 1 }, { unique: true });

export default mongoose.model("Completion", CompletionSchema);
