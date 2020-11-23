import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/easypays")
  .get(async (req, res) => {
    let query = `select * from easypays;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into easypays values(
                ${data.pk},
                ${data.nrotarjeta},
                ${data.safecode},
                ${data.password},
                ${data.retorno},
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Easypay agregado correctamente!",
        nuevoEasypay: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/easypays/:pk")
  .get(async (req, res) => {
    let query = `select * from easypays where easyp_pk=${req.params.pk};`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from easypays where easyp_pk=${req.params.pk};`;
      await db(query);
      res.json({
        estatus: `Elemento eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
