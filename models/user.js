import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
      },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
      username: login,
    });
   
    if (!user) {
      user = await this.findOne({ email: login });
    }
  


    return user;
  };

userSchema.pre('remove', function(next) {
    this.model('Session').deleteMany({ user: this._id }, next);
});
   

const User = mongoose.model('User', userSchema);
export default User;
