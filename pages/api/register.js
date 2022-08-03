import userModel from "../../models/userModel";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  const userExists = await userModel.findOne({ email: data.email });
  if (userExists) {
    return res.status(400).json({ error: "User Already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);

  const user = new userModel({
    name: data.name,
    email: data.email,
    password: password,
  });
  await user.save();
  return res.status(200).json({ message: "success" });
}
