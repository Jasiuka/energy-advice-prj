import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { DATABASE } from "../mockDb.js";

let router = express.Router();

// Logins through login form
router.post(
  "/api/v1/login",
  tryCatch((request, response) => {
    const { username, password } = request.body;

    // Find user
    const userExist = DATABASE.users.find((user) => user.username === username);
    // Check if password match
    const isPasswordMatch = userExist?.password === password;
    if (!isPasswordMatch || !userExist) {
      return response.status(400).send({
        message: "Neteisingas vartotojo vardas arba slaptažodis",
        status: 400,
      });
    }

    request.session.user = userExist.username;
    return response
      .status(200)
      .send({ user: { username: userExist.username, id: userExist.id } });
  })
);

// auto login endpoint when app starts
router.get(
  "/api/v1/login",
  tryCatch((request, response) => {
    const user = request.session.user;
    if (user) {
      const userData = DATABASE.users.find((userd) => userd.username === user);
      if (!userData) {
        return response.status(400).send({
          message: "Tokio vartotojo nėra",
          status: 400,
        });
      } else {
        return response
          .status(200)
          .send({ user: { username: userData.username, id: userData.id } });
      }
    } else {
      return response.status(200).send();
    }
  })
);

router.get(
  "/api/v1/logout",
  tryCatch((request, response) => {
    request.session.destroy();
    return response.status(200).send({
      message: "Logout successful",
    });
  })
);

export default router;
