import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.2.1519170613.1656519743",
    },
  },
  { timestamps: true }
);

export default mongoose.models.usersdatas ||
  mongoose.model("usersdatas", userSchema);
