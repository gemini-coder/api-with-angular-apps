require("dotenv/config");
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { demoRoute } from "./src/routes/demo.route";
const app = express();
app.use(cors());

// Router entry point with middleware
app.use('', addHeaders, demoRoute);

// Add headers to the api response
function addHeaders(req: Request, res: Response, next: NextFunction) {
	res.set("Server-Time", currentTime());
	res.set("Access-Control-Expose-Headers", "Server-Time");
	next();
}

// Get the current time on the server including time zone offsets (e.g. +1 hour)
const currentTime = () => {
	const date = new Date(Date.now());
	var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
	var offset = date.getTimezoneOffset() / 60;
	var hours = date.getHours();
	newDate.setHours(hours - offset);
	return newDate.toISOString();
};

// Start the api service on the port defied in the env file
app.listen(process.env.PORT);

console.log(`Listening on port ${process.env.PORT}`);
