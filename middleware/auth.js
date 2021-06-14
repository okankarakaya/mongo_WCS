import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "WCS123");
      req.user = decoded.user;
      next();
    } catch (error) {
      res.send("token is not valid");
    }
  } else {
    res.send("there is no token");
  }
};
export default auth;
