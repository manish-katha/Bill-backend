import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

// Create a new task with multiple items
export const newTask = async (req, res, next) => {
  try {
    console.log("rec",req.body);
    console.log("jjejejejejj")
     
      const { name, phoneno, adharno, address, state, date,  paymentmode,items } = req.body;
    console.log("mmmmmjejj",name, phoneno, adharno, address, state, date, items)

    console.log("jjejejejejj")

    // Creating the new task
    await Task.create({
      name,
      phoneno,
      adharno,
      address,
      state,
      date,
      items,
      paymentmode,
       // Pass the array of items from the request body
      user: req.user._id, // Assuming req.user contains the logged-in user's data
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};
// Fetch tasks for the logged-in user
export const getmyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;  // Get the user ID from the authenticated user
    const { phone } = req.query;  // Get phone number from query params

    let tasks;

    if (phone) {
      // Fetch tasks based on the phone number and user ID
      tasks = await Task.find({ phoneno: phone, user: userid });

      // Return 200 OK with an empty array if no tasks are found for the phone number
      if (!tasks || tasks.length === 0) {
        return res.status(200).json({ success: true, tasks: [] });
      }
    } else {
      // Fetch all tasks for the authenticated user if no phone number is provided
      tasks = await Task.find({ user: userid });

      // Return 200 OK with an empty array if no tasks are found for the user
      if (!tasks || tasks.length === 0) {
        return res.status(200).json({ success: true, tasks: [] });
      }
    }

    // Return tasks if found
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};



export const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id; // Extract the ID from the request params

    // Find task by ID in the database using Mongoose
    const task = await Task.findById(taskId);

    // If task is not found, throw an error
    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }

    // Return the task if found
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
};


// Update task's completion status
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    // Toggle the completion status of the task
  
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};

// Delete a task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
