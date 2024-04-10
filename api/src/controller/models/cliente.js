const connect = require("../../connect/connect")
const CRUD = require("../CRUD");

const table = "Cliente";
const phone_table = "Telefone";

const queries = (data={}) => {
    return {
        getAll: `SELECT c.*, p.numero FROM ${table} as c 
            LEFT JOIN ${phone_table} as p 
            ON c.cpf = p.cpf`,
        get: `SELECT c.*, p.numero FROM ${table} as c 
            LEFT JOIN ${phone_table} as p 
            ON c.cpf = p.cpf
            WHERE c.cpf = '${data.cpf}'`,
        create: `INSERT INTO ${table} VALUE ('${data.cpf}', '${data.nome_cliente}')`,
        createPhone: `INSERT INTO ${phone_table}(numero) VALUE ('${data.numero}')`,
        update: `UPDATE ${table} SET cpf = '${data.cpf}', nome_cliente = '${data.nome_cliente}' WHERE cpf = '${data.cpf}'`,
        updatePhone: `UPDATE ${phone_table} SET cpf = '${data.cpf}', numero = '${data.numero}' WHERE cpf = '${data.cpf}'`,
        delete: `DELETE FROM ${table} WHERE cpf = '${data.cpf}'`,
    }
}

class Cliente extends CRUD {
    constructor(queries) {
        super(queries)
        this.queries = queries;
    }

    create = (req, res) => {
        const data = { ...req.body };
        if (data.numero === undefined) {
            connect.query(this.queries(data).create, (err, result) => {
                if (err) res.status(500).json(err).end();
                else res.status(201).json(req.body).end();
            });
        } else {
            let newItem = {};

            connect.query(this.queries(data).create, (err, result) => {
                if (err) {
                    res.status(500).json(err).end();
                    return;
                }
                else {
                    newItem = { ...req.body };
                }
            });

            connect.query(this.queries(data).createPhone, (err, result) => {
                if (err) res.status(500).json(err).end();
                else {
                    newItem.numero = [...req.body.numero];
                    res.status(201).json(req.body).end()
                }
            });
        }
    }

    update = (req, res) => {
        const data = { ...req.params, ...req.body };
        if (data.numero === undefined) {
            console.log(data);
            connect.query(this.queries(data).update, (err, result) => {
                if (err) res.status(400).json(err).end();
                else {
                    if (result.affectedRows > 0) {
                        res.status(202).json(req.body).end();
                    } else {
                        res.status(404).json(err).end();
                    }
                }
            }); 
        } else {
            let newItem = {};

            connect.query(this.queries(data).update, (err, result) => {
                if (err) {
                    res.status(400).json(err).end();
                    return;
                }
                else {
                    if (result.affectedRows > 0) {
                        newItem = { ...req.params, ...req.body };
                    } else {
                        res.status(404).json(err).end();
                        return;
                    }
                }
            });

            connect.query(this.queries(data).updatePhone, (err, result) => {
                if (err) {
                    res.status(400).json(err).end();
                    return;
                }
                else {
                    if (result.affectedRows > 0) {
                        newItem.numero = req.body.numero;
                        console.log(newItem);
                        res.status(202).json(newItem).end();
                    } else {
                        console.log("error phone");
                        res.status(404).json(err).end();
                        return;
                    }
                }
            });
        }
    }
}

const cliente = new Cliente(queries);
module.exports = cliente;
