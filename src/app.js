import express from "express"
import { config } from "./config/config.js";
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";


const port = config.server.port;
const app = express();


app.listen(port,()=>console.log("Server ready"));

//midlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuración de las sessiones del servidor
app.use(session({
    store: MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true
}));

//configuración de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));


//rutas 
app.use(viewsRouter);
app.use("/api/sessions", sessionsRouter);


/* app.get("/login",(req,res)=>{
    const {username} = req.query;
    req.session.user={username, visitas:1}
    console.log(req.session);
    res.send("usuario logeado");
});

app.get("/visitas",(req,res)=>{
    console.log(req.session);
    if(req.session?.user?.username){
        req.session.user.visitas++;
        res.send(`Ya estas logueado ${req.session.user.username} y visitaste esta pagina ${req.session.user.visitas}`)
    } else{
        res.send("necesitas estar logeado")
    }
}); */