/* eslint-disable require-atomic-updates */
const admin = require('./admin');

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.body.uid = decoded ? decoded.uid : undefined;
  } catch (error) {
    req.body.uid = undefined;
  }
    return next();
}

module.exports = verifyToken;