

import mongoose from 'mongoose';
import User from '../models/user.js';
import Task from '../models/task.js'

const task_get_all = (req, res, next) => {
    Task.find()
    .where('userID').equals('user')
     // .select("name price _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              _id: doc._id,
              createdBy: doc.user,
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
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
    console.log(task)
    task
      .save()
      .then(result => {
        res.status(201).json({
          message: "Created product successfully",
          createdSession: {
            name: result.name,
            createdBy: result.user,
            _id: result._id,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + result._id
            }
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
              url: "http://localhost:3000/products"
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
  
const tasks_update_task = (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    //for (const ops of req.body) {
      //updateOps[ops.propName] = ops.value;
    //}
    console.log(req.body)
    Task.updateOne({ _id: id }, { $set: req.body })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Product updated",
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + id
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
  
const task_delete = (req, res, next) => {
    const id = req.params.taskId;
    Task.deleteOne({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Product deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/products",
            body: { name: "String", price: "Number" }
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