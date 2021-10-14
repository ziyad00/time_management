import mongoose from 'mongoose';

const countSchema = new mongoose.Schema({
  resumeTime: {
    type: Date,
    default: Date.now()

    },
  pauseTime:{
  
    type: Date, 
    default:Date.now()
  },
  countedTime: {
    type: Number,
    default:0
    }// minutes
});
const taskSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String},
    status: {type: Boolean, default: true},
    count: {
        type:countSchema,
        default: () => ({})
    },
   
    
}, {
    timestamps: true
  });



taskSchema.pre('updateOne', async function(next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  
  
  if(docToUpdate.status != this._update.$set.status){

  if(this._update.$set.status ==false){
    
    docToUpdate.count.pauseTime = Date.now(); 
    docToUpdate.count.countedTime += (docToUpdate.count.pauseTime - docToUpdate.count.resumeTime)/1000;
    docToUpdate.count.pauseTime = null;
    docToUpdate.count.resumeTime = null;
    docToUpdate.save();

  }else {
    docToUpdate.count.resumeTime = Date.now();
    docToUpdate.save();
   




  }
}
  next();
});
   
taskSchema.post('save', function(next) {
  //  this.count.resumeTime = this.startedAt; there is no this
  //  next();
});
const Task= mongoose.model('Task', taskSchema);
//const doc = new Task();
//console.log(doc.count); 
export default Task;