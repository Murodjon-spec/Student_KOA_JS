import Koa from 'koa';
import Router from 'koa-router';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import routes from './api/routes/studentRoutes';

const port = 3000;
const app = new Koa();
const router = Router();


app.use(bodyParser());
app.use(respond());

routes(router);

app.use(router.routes())
        .use(router.allowedMethods());

app.listen(port);

console.log(`Listening on ${port}`);

export default app.listen();