// server.js
import jsonServer from "json-server";
import auth from "json-server-auth";

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(middlewares);

app.use(auth);

app.use(router);

app.listen(3001, () => {
  console.log("JSON Server with Auth is running on port 3001");
});
