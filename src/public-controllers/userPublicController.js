const getUsers = (req, res) => {
    res.json({
      message: "Request success (mock)",
      users: [
        {
          userName: "Alice",
          userEmail: "alice@example.com",
          userRole: "USER",
          createdAt: "2025-01-10"
        },
        {
          userName: "Bob",
          userEmail: "bob@example.com",
          userRole: "ADMIN",
          createdAt: "2025-02-15"
        }
      ]
    });
  };
  
  module.exports = { getUsers };
  