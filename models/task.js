import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String},
    status: {type: Boolean, default: true},
    count: {
      resumeTime:{type: Date, defaut: Date.now()},
      pauseTime:Date,
      countedTime:Number // minutes
    },
   
    
}, {
    timestamps: true
  });


  const childSchema = new mongoose.Schema({
    name: String,
    age: {
      type: Number,
      default: 0
    }
  });
taskSchema.pre('updateOne', async function(next) {
  const docToUpdate = await this.model.findOne(this.getQuery());

  if(docToUpdate.status != this.status){
  if(this.status ==false){
    this.pauseTime = Date.now();
    this.count.countedTime += this.count.pauseTime - this.count.resumeTime;
    this.pauseTime = 0;
    this.resumeTime = 0;
  }else {
    this.resumeTime = Date.now();

  }}
});
   
taskSchema.post('save', function(next) {
    this.count.resumeTime = this.startedAt;
});
const Task= mongoose.model('Task', taskSchema);

export default Task;