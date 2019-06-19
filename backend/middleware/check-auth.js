const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
  const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'L^L^gdw?xc@WMZ&}8,A6c~sU4-');
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
} catch (error) {
    res.status(401).json({message: 'Auth failed!'});
  }
};
