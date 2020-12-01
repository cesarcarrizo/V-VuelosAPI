import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import usuarios from "./routes/apiRoutes/usuarios";
import consecutivos from "./routes/apiRoutes/consecutivos";
import aerolineas from "./routes/apiRoutes/aerolineas";
import bitacoras from "./routes/apiRoutes/bitacoras";
import boletos from "./routes/apiRoutes/boletos";
import compras from "./routes/apiRoutes/compras";
import easypays from "./routes/apiRoutes/easypays";
import errores from "./routes/apiRoutes/errores";
import paises from "./routes/apiRoutes/paises";
import puertas from "./routes/apiRoutes/puertas";
import tarjetas from "./routes/apiRoutes/tarjetas";
import vuelos from "./routes/apiRoutes/vuelos";

const app = express();
const PORT = process.env.PORT || 5000;

let logger = (req, res, next) => {
  let path = req.originalUrl;
  let method = req.method;
  console.log(`Petición ${method} hecha hacia ${path}`);
  //console.dir(req);
  next();
};

app.use(cors());

app.set("trust proxy", 1);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(logger);

app.use("/api", usuarios);
app.use("/api", consecutivos);
app.use("/api", bitacoras);
app.use("/api", aerolineas);
app.use("/api", boletos);
app.use("/api", compras);
app.use("/api", easypays);
app.use("/api", errores);
app.use("/api", paises);
app.use("/api", puertas);
app.use("/api", tarjetas);
app.use("/api", vuelos);

app.listen(PORT, () => {
  console.log(`REST API escuchando por peticiones en el puerto ${PORT}...`);
  //console.dir(test);
});
