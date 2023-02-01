import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // To support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

routes(app);

app.listen(3030, () => {
  console.log("Server listening on port 3030");
});
