import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/aerolineas")
  .get(async (req, res) => {
    let query = `select * from aerolineas;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into aerolineas values(
                '${data.pk}',
                '${data.nombre}',
                '${data.url}'
               );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Aerolínea agregada correctamente!",
        nuevaAerolinea: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/aerolineas/:pk")
  .get(async (req, res) => {
    let query = `select * from aerolineas where valor_aero_pk='${req.params.pk}';`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from aerolineas where valor_aero_pk='${req.params.pk};'`;
      await db(query);
      res.json({
        estatus: `Elemento aerolínea satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
