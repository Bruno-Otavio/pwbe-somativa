const express = require("express");
const router = express.Router();

const cliente = require("../controller/models/cliente");
const veiculo = require("../controller/models/veiculo");
const aluguel = require("../controller/models/aluguel");

const verifier = (req, res) => {
    res.json("Back-end sucinto");
}

router.get("/", verifier);

router.get("/cliente", cliente.getAll);
router.get("/cliente/:cpf", cliente.get);
router.post("/cliente", cliente.create);
router.put("/cliente/:cpf", cliente.update);
router.delete("/cliente/:cpf", cliente.deleteData);

router.get("/veiculo", veiculo.getAll);
router.get("/veiculo/:placa", veiculo.get);
router.post("/veiculo", veiculo.create);
router.put("/veiculo/:placa", veiculo.update);
router.delete("/veiculo/:placa", veiculo.deleteData);

router.get("/aluguel", aluguel.getAll);
router.get("/aluguel/:id", aluguel.get);
router.post("/aluguel", aluguel.create);
router.put("/aluguel/:id", aluguel.update);
router.delete("/aluguel/:id", aluguel.deleteData);

module.exports = router;
