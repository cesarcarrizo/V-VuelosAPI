import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/boletos")
  .get(async (req, res) => {
    let query = `select * from boletos;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into boletos values(
                '${data.pk}',
                '${data.vuelo}',
                '${data.usuario}',
                ${data.total},
                ${data.estatus}
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Boleto agregado correctamente!",
        nuevoBoleto: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/boletos/:pk")
  .get(async (req, res) => {
    let query = `select * from boletos where valor_bol_pk=${req.params.pk};`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from boletos where valor_bol_pk=${req.params.pk};`;
      await db(query);
      res.json({
        estatus: `Elemento eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
