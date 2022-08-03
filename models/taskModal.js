import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskname: {
      type: String,
      default: "task",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateofcompletion: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersdatas",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.tasks || mongoose.model("tasks", taskSchema);
