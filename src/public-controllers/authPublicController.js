const register = async (req, res) => {
  res.status(201).json({
    message: "User registered, please login"
  });
};

const login = async (req, res) => {
  res.status(200).json({
    message: "Login success",
    token: "mocked.jwt.token"
  });
};

module.exports = { register, login };
