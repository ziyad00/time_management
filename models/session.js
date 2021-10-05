import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String}
    
}, {
    timestamps: true
  });

const Session= mongoose.model('Session', sessionSchema);

export default Session;