const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const http = require("http").Server(app);

/* Before making this public, I should change the origin to
    the phone app's ID or something along those lines.
    Maybe implement an api key or something? */
const corsOptions = {
  origin: ["*"],
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", routes);

http.listen(3000, () => {
  console.log(
    "Listening on port 3000. Don't forget to make the port dynamic bruh"
  );
});
