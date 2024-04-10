const CRUD = require("../CRUD");

const table = "Aluguel";

const queries = (data={}) => {
    return {
        getAll: `SELECT * FROM ${table}`,
        get: `SELECT * FROM ${table} WHERE id = ${data.id}`,
        create: `INSERT INTO ${table}(placa, cpf, reserva, retirada, devolucao, subtotal) VALUE(
            '${data.placa}',
            '${data.cpf}',
            '${data.reserva}',
            '${data.retirada}',
            '${data.devolucao}',
            ${data.subtotal}
        )`,
        update: `UPDATE ${table} SET
            placa = '${data.placa}',
            cpf = '${data.cpf}',
            reserva = '${data.reserva}',
            retirada = '${data.retirada}',
            devolucao = '${data.devolucao}',
            subtotal = '${data.subtotal}'
            WHERE id = '${data.id}'`,
        delete: `DELETE FROM ${table} WHERE id = '${data.id}'`
    }
}

class Veiculo extends CRUD {
    constructor(queries) {
        super(queries);
    }
}

const veiculo = new Veiculo(queries);
module.exports = veiculo;
