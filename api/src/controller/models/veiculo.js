const CRUD = require("../CRUD");

const table = "Veiculo";

const queries = (data={}) => {
    return {
        getAll: `SELECT * FROM ${table}`,
        get: `SELECT * FROM ${table} WHERE placa = '${data.placa}'`,
        create: `INSERT INTO ${table} VALUE
            ('${data.placa}', '${data.modelo}', '${data.marca}', '${data.tipo}', ${data.diaria})`,
        update: `UPDATE ${table} SET
            placa = '${data.placa}',
            modelo = '${data.modelo}',
            marca = '${data.marca}',
            tipo = '${data.tipo}',
            diaria = '${data.diaria}'
            WHERE placa = '${data.placa}'`,
        delete: `DELETE FROM ${table} WHERE placa = '${data.placa}'`
    }
}

class Veiculo extends CRUD {
    constructor(queries) {
        super(queries);
    }
}

const veiculo = new Veiculo(queries);
module.exports = veiculo;
