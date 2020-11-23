import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/tarjetas")
  .get(async (req, res) => {
    let query = `select * from tarjetas;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into tarjetas values(
                ${data.pk},
                '${data.cedula}',
                ${data.mes},
                ${data.anio},
                ${data.cvv},
                ${data.tipo},
                ${data.proovedor}
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Tarjeta agregada correctamente!",
        nuevaTarjeta: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/tarjetas/:pk")
  .get(async (req, res) => {
    let query = `select * from tarjetas where numero_t=${req.params.pk};`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from tarjetas where numero_t=${req.params.pk};`;
      await db(query);
      res.json({
        estatus: `Elemento  tarjeta eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
