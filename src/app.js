import express,{json,urlencoded} from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import componentRouters from "./components/components-router.js";

import { dbUri } from "./utils/config.js";

const app = express();

app.use(json({ limit: '50kb' }));
app.use(urlencoded({ limit: '50kb'}));
app.use(helmet());
app.use(cors());

app.use(componentRouters);

mongoose.connect(dbUri, {

    useNewUrlParser: true,

    useUnifiedTopology: true
    
}).then( success => { if(success) console.log("db connection has been estalished successfully") }).catch(error => console.log(error.message));

export default app;
