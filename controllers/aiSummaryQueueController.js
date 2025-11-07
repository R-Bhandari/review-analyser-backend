import AISummaryQueue from "../models/aiSummaryQueueModel.js";
import AutoSummary from "../models/autoSummaryModel.js";
import TrendInsight from "../models/trendInsightModel.js";
import AIConfig from "../models/aiConfigModel.js";

// ➤ Enqueue a new AI task
export const enqueueAITask = async (req, res) => {
  try {
    const queueItem = await AISummaryQueue.create(req.body);
    res.status(201).json({ success: true, message: "AI task added to queue", data: queueItem });
  } catch (error) {
    console.error("Error enqueuing AI task:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all queued tasks (with filters)
export const getAllQueuedTasks = async (req, res) => {
  try {
    const { businessId, status, taskType } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (status) filter.status = status;
    if (taskType) filter.taskType = taskType;

    const tasks = await AISummaryQueue.find(filter)
      .populate("business", "name")
      .populate("aiConfigRef", "provider modelName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error fetching AI queue tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update task status (used by worker)
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, errorMessage, outputRef, outputModel } = req.body;

    const task = await AISummaryQueue.findByIdAndUpdate(
      id,
      {
        status,
        errorMessage,
        outputRef,
        outputModel,
        lastTriedAt: new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    res.status(200).json({ success: true, message: "Task updated", data: task });
  } catch (error) {
    console.error("Error updating AI queue task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete task from queue
export const deleteTask = async (req, res) => {
  try {
    const deleted = await AISummaryQueue.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Task not found" });

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting AI queue task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ (Future) Worker simulation endpoint
export const processNextAITask = async (req, res) => {
  try {
    // Pick one pending task
    const task = await AISummaryQueue.findOneAndUpdate(
      { status: "pending" },
      { status: "processing", lastTriedAt: new Date() },
      { new: true }
    );

    if (!task)
      return res.status(200).json({ success: true, message: "No pending tasks found" });

    // Simulate AI summary generation
    const simulatedOutput = {
      summaryText: `AI processed ${task.taskType} for ${task.sourceModel}.`,
    };

    // Save fake output (simulate linking to AutoSummary)
    const output = await AutoSummary.create({
      business: task.business,
      summaryType: task.taskType,
      sourceModel: task.sourceModel,
      summaryText: simulatedOutput.summaryText,
    });

    // Mark as completed
    task.status = "completed";
    task.outputRef = output._id;
    task.outputModel = "AutoSummary";
    await task.save();

    res.status(200).json({ success: true, message: "AI task processed (simulated)", data: task });
  } catch (error) {
    console.error("Error processing AI queue task:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
