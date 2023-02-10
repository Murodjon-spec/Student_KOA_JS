import Koa from 'koa';
import Router from 'koa-router';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import studentRouters from './api/routes/studentRoutes';
import animalRouters from './api/routes/animalRouters';
import fruitRouter from './api/routes/fruitRouter';


const port = 3000;
const app = new Koa();
const router = Router();


app.use(bodyParser());
app.use(respond());

studentRouters(router);
animalRouters(router);
fruitRouter(router);




app.use(router.routes())
        .use(router.allowedMethods());

app.listen(port);

console.log(`Listening on ${port}`);

export default app.listen();