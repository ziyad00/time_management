import jwt from 'jsonwebtoken';

function signjwt(user, bodyReq) {
  let token;
    if (bodyReq.email){
     token = jwt.sign(
        {
          email: bodyReq.email,
          userId: user._id
        },
        'secret',
        {
          expiresIn: "24d"
        }
      );}
      else {
         token = jwt.sign(
            {
              username: bodyReq.email,
              userId: user._id
            },
            'secret',
            {
              expiresIn: "999d"
            }
          );
      }
      return token;
}
export default signjwt;
