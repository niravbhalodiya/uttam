const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    // if (!req.session.isLoggedIn) {
        // return res.redirect("/login");
    // }
    const {authorization} = req.headers;

    if (!authorization) return res.status(401).json({
        error: "Authorization token required."
    })
    // console.log(authorization);
    const token = authorization.split(" ")[1]

    console.log(jwt.verify(token, process.env.TOKEN_KEY));
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)

    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
    next();
};

module.exports = verifyToken;