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



taskSchema.post('updateOne', async function(result) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  //console.log(docToUpdate.status);
  //console.log(this);
  const doc = this._update.$set;

  if(docToUpdate.status != doc.status){

  if(doc.status ==false){

    doc.pauseTime = Date.now();
    doc.count.countedTime += doc.count.pauseTime - doc.count.resumeTime;
    doc.pauseTime = 0;
    doc.resumeTime = 0;
  }else {
    doc.resumeTime = Date.now();


  }}
  this._update.$set = doc;
});
   
taskSchema.post('save', function() {
    this.count.resumeTime = this.startedAt;
});
const Task= mongoose.model('Task', taskSchema);
//const doc = new Task();
//console.log(doc.count); 
export default Task;