module.exports = function isLoggedIn(req, res, next) {
  if (req.user) {
  	console.log(user)
    next();
  } else {
    // return unauthorized
    res.redirect('/home/signin');
  }
};