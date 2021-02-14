import querystring from "querystring";
import config from "config";
import cors from "cors";
import express from "express";
import users from "./routes/users";
import bloodtypes from "./routes/bloodtypes";
import donors from "./routes/donors";
import requests from "./routes/requests";
import auth from "./routes/auth";

const app = express();

if (!config.get("jwtPrivateKey")) {
	console.error("FATAL ERROR: jwtPrivateKey not defined");
	process.exit(1);
}
// middleware
app.use(express.json());
app.use(cors());
app.use("/users", users);
app.use("/bloodtypes", bloodtypes);
app.use("/donors", donors);
app.use("/requests", requests);
app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
