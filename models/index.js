import mongoose from 'mongoose';
 
import User from './user.js';
import Task from './task.js';
 
const connectDb = () => {
  return mongoose.connect("mongodb+srv://ziyad:iwaKveS2UrtSI4SN@cluster0.fzuaf.mongodb.net/Cluster0?retryWrites=true&w=majority");
};
 
const models = { User, Task };
 
export { connectDb };
 
export default models;