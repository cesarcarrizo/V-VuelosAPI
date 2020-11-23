import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/compras")
  .get(async (req, res) => {
    let query = `select * from compras;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into compras values(
                '${data.pk}',
                '${data.cedula}',
                '${data.vuelo}',
                ${data.cantidad},
                ${data.total},
                ${data.pago}
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Compra agregada correctamente!",
        nuevaCompra: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/compras/:pk")
  .get(async (req, res) => {
    let query = `select * from compras where valor_comp_pk='${req.params.pk};'`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from compras where valor_comp_pk='${req.params.pk}';`;
      await db(query);
      res.json({
        estatus: `Elemento compra eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
