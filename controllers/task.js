

import mongoose from 'mongoose';
import User from '../models/user.js';
import Task from '../models/task.js'

const task_get_all = (req, res, next) => {
  const user = User.findById(req.userData.userId);
  console.log(req.userData)
    Task.find()
    .where('user').equals(req.userData.userId)
     // .select("name price _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          tasks: docs.map(doc => {
            return {
              task: doc,
              request: {
                type: "GET",
                url: "http://localhost:3000/tasks/" + doc._id
              }
            };
          })
        };
        res.status(200).json(response);
    
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
const tasks_create_task = (req, res, next) => {
  
    //const task = new Task({
      //name: req.body.name,
      //user: req.userData.userId,
    //});
    const task = new Task(req.body);
    task.user = req.userData.userId;
    task
      .save()
      .then(result => {
        res.status(201).json({
          message: "Created task successfully",
          createdSession: result, //{
       //     name: result.name,
         //   createdBy: result.user,
           // _id: result._id,
        //    createdAt: result.createdAt,
          //  updatedAt: result.updatedAt,
            request: {
              type: "GET",
              url: "http://localhost:3000/tasks/" + result._id
            }
          
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
  
const tasks_get_task = (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id)
   //   .select("name price _id productImage")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            task: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/task"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  
const tasks_update_task = async (req, res, next) => {
    const id = req.params.taskId;
    try {
    const result = await Task.updateOne({ _id: id }, { $set: req.body }).where('user').equals(req.userData.userId);
    const task = await Task.findById(id);
    res.status(200).json({
          message: "task updated",
          updated: task,
          request: {
            type: "GET",
            url: "http://localhost:3000/tasks/" + id
          }
        });
      }
      catch(err)  {
        console.log(err);
        res.status(500).json({
          error: err
        });
      }; 
  };
  
const task_delete = (req, res, next) => {
    const id = req.params.taskId;
    Task.deleteOne({ _id: id }).where('user').equals(req.userData.userId)
      .exec()
      .then(result => {
        res.status(200).json({
          message: "task deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/tasks",
            //body: { name: "String", price: "Number" }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

export default {task_get_all,tasks_create_task,
  tasks_get_task,task_delete,tasks_update_task}