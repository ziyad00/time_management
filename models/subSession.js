import mongoose from 'mongoose';

const subSessionSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    name: {type: String}
    
}, {
    timestamps: true
  });

const SubSession= mongoose.model('SubSession', subSessionSchema);

export default SubSession;