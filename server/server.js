import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./DB/index.js";

dotenv.config();

connectDB()
.then(() => {
    app.on("error", (error) => {
console.log("ERRR", error);
throw new error;
    })
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running at port ${process.env.PORT || 5000}`)
    })  
})
.catch((error) => {
    console.log("MONGODB CONNECTION FIELD !!!", error)
});
