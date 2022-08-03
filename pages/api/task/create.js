import connectDB from "../lib/connectDB";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import taskModal from "../../../models/taskModal";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(async (req, res) => {
    try {
      await connectDB();

      const tasks = await taskModal.find({ user: req.query.id });

      return res.status(200).json({ status: true, tasks });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      await connectDB();
      const session = await getSession({ req });
      let savedTask;

      if (!session) {
        return res.status(401).json({ status: false, error: "Unathorized" });
      } else {
        const id = session.user.id;

        const task = new taskModal({
          taskname: req.body.taskname,
          description: req.body.description,
          dateofcompletion: req.body.date,
          user: id,
        });
        savedTask = await task.save();
      }

      return res.status(200).json({ status: true, savedTask });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await connectDB();

      const tasks = await taskModal.findOneAndDelete({ _id: req.query.id });

      return res.status(200).json({ status: true, tasks });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, error: error.message });
    }
  });

export default handler;
