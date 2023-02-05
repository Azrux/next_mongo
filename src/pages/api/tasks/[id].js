import { dbConnect } from "@/utils/mongoose";
import Task from "@/models/Task";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ msg: "La tarea no fue encontrada" });
        return res.status(200).json(task);
      } catch (e) {
        return res.status(200).json({ error: e.message });
      }
    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, body, { new: true });
        if (!task) return res.status(400).json({ msg: "Task not found" });
        return res.status(200).json(task);
      } catch (e) {
        return res.status(200).json({ error: e.message });
      }
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(400).json({ msg: "Task not be found" });
        return res.status(200).json();
      } catch (e) {
        return res.status(200).json({ error: e.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
