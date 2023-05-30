const express = require("express");
const axios = require("axios");
const User = require("./models/User"); // Assuming you have a User model defined for your NoSQL database

const app = express();
app.use(express.json());

// Fetch users from GoRest API and store them in the database
app.get("/fetch-users", async (req, res) => {
  try {
    const response = await axios.get("https://gorest.co.in/public-api/users", {
      headers: {
        Authorization:
          "9cbd7b8dcd0a1c8d4d6a24fc233985c11df9faa01c534260b94d621ba3f6076f", // Replace with your actual API token
      },
    });

    const users = response.data.result;

    for (const user of users) {
      const newUser = new User({
        id: user.Id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
        createdAt: user.Created_at,
        updatedAt: user.Updated_at,
      });

      await newUser.save();
    }

    res.json({ message: "User data fetched and stored in the database." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the microservice
app.listen(3000, () => {
  console.log("Microservice is running on port 3000");
});
