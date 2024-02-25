import mongoose from "mongoose";

export class MongooseService {
  private static instance: MongooseService;
  options: mongoose.ConnectOptions = {
    autoIndex: false,
  };
  count: number;

  constructor() {
    this.count = 0;
    // this.connectWithRetry();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new MongooseService();
    }
    return this.instance;
  }

  getMongoose() {
    return mongoose;
  }

  async connectWithRetry() {
    const atlasString = process.env.MONGOOSE_URI; // CurrentDevNew

    console.log("MongoDB connection with retry");
    await mongoose
      .connect(atlasString || "", this.options)
      .then(() => {
        console.log("MongoDB is connected");
      })
      .catch((err) => {
        console.log(
          "MongoDB connection unsuccessful, retry after 5 seconds. ",
          ++this.count
        );
        setTimeout(this.connectWithRetry, 5000);
        console.log("ERROR IS: ", err);
      });
  }

  disconnect() {
    mongoose
      .disconnect()
      .then(() => {
        console.log("MongoDB connection closed");
      })
      .catch((err) => {
        console.log(
          "MongoDB disconnecting unsuccessful, retry after 5 seconds. ",
          ++this.count
        );
        setTimeout(this.disconnect, 5000);
        console.log("ERROR IS: ", err);
      });
  }
}
