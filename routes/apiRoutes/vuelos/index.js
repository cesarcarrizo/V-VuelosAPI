import express from "express";
import db from "../../../database";

const router = express.Router();

router.route("/vuelos/descargas").get(async (req, res) => {
  let query = "select * from vuelos where estatus_vlo=5;";
  res.json(await db(query));
});

router
  .route("/vuelos")
  .get(async (req, res) => {
    let query = `select * from vuelos;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into vuelos values(
                '${data.pk}',
                '${data.aerolinea}',
                '${data.puerta}',
                '${data.destino}',
                '${data.procedencia}',
                '${data.hora}',
                '${data.fecha}',
                ${data.estatus}
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Vuelo agregado correctamente!",
        nuevoVuelo: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/vuelos/:pk")
  .get(async (req, res) => {
    let query = `select * from vuelos where valor_vlo_pk='${req.params.pk}';`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from vuelos where valor_vlo_pk='${req.params.pk}';`;
      await db(query);
      res.json({
        estatus: `Elemento eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
