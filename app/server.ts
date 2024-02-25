import express = require("express");
import * as http from "http";
import dotenv from "dotenv";
import moment from "moment";
import { MongooseService } from './common/services/mongoose';

const app: express.Application = express();
const server: http.Server = http.createServer(app);

dotenv.config({ path: __dirname + "/common/env/.env" });

const port = process.env.PORT;
const routes: any = [];

app.set("port", port);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server running at port ${port} for FSM-AHAM!`);
});

server.listen(port, async () => {
  console.log(`Server running at port ${port}`);
  console.log(`Server time << ${moment().format("DD-MM-YYYY hh:mm A")} >>`);
  // routes.forEach((route: CommonRoutesConfig) => {
  //   console.log(`Routes configured for ${route.getName()}`);
  // });

  // temp config for mongoDb connection
  await MongooseService.getInstance().connectWithRetry();
});

export default app;
