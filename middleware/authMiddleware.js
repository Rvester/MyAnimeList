const jwt = require("jsonwebtoken");

function authorize(req, res, next) {
  try {
    // 1. Check if the user has a token (...if it's in the headers)

    let token = req.header("Authorization");
    //console.log(req);
    //console.log(token);

    if (!token) {
      throw new Error("No token provided");
    }

    //    token -> "Bearer 090jlsdk89398jflgjdfg9839579352"
    token = token.replace("Bearer ", "");

    // 2. Check that the token provided is valid and not expired

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //   payload ->  { id, username }
    console.log(payload);
    if (payload.error) {
      throw new Error(payload.error.message);
    }

    // 3. Attach the payload from the token to the request object

    req.userId = payload.id;
    console.log(req.userId);

    // 4. Move on to the requested route (next)
    next();
  } catch (error) {
    res.status(403).json({ error });
  }
}

module.exports = {
  authorize,
};

// /info/billy
// authorize()
// info()
