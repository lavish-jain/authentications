const jwt = require("jsonwebtoken");
const SECRET_KEY = "TOP_SECRET";
const login = async (username, password, data) => {
  try {
    for (let key in data) {
      if (data[key].username === username) {
        if (data[key].password === password) {
          const token = jwt.sign(
            {
              first_name: data[key].first_name,
              last_name: data[key].last_name,
              age: data[key].age,
            },
            SECRET_KEY,
            { expiresIn: "10m" }
          );
          return {
            first_name: data[key].first_name,
            last_name: data[key].last_name,
            age: data[key].age,
            token,
          };
        }
        throw "Incorrect username/password";
      }
    }
    throw "User does not exist";
  } catch (err) {
    throw err;
  }
};

const verifyToken = async (token) => {
  try {
    const user_data = jwt.verify(token, SECRET_KEY);
    return user_data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  login,
  verifyToken,
};
