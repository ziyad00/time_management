import mongoose from 'mongoose';
 
import User from './user.js';
import Session from './session.js';
 
const connectDb = () => {
  return mongoose.connect("mongodb+srv://ziyad:iwaKveS2UrtSI4SN@cluster0.fzuaf.mongodb.net/Cluster0?retryWrites=true&w=majority");
};
 
const models = { User, Session };
 
export { connectDb };
 
export default models;