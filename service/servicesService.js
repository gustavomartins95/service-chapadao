const connection = require('../api/conexao.js');

var servicesService = {
    save: function (dados, callback) {
        connection.query('INSERT INTO `service` SET ?', [dados], function (err, result) {
            if (err) throw err;

            callback(result.affectedRows);
        });
    },
    filter: function (nome, callback) {
        connection.query('SELECT *, DATE_FORMAT(`dataAtual`, "%d/%m/%Y") AS `dataAtual`, '
                       + 'DATE_FORMAT(`dataDeVencimento`, "%d/%m/%Y") AS `dataDeVencimento` '
                       + 'FROM service WHERE '
                       + 'nome LIKE "%"?"%" OR placa LIKE "%"?"%" OR modelo LIKE "%"?"%" '
                       + 'ORDER BY id', [nome, nome, nome], function (error, results) {
            if (error) throw error;
            
            callback(results);
        });
    },
    delete: function (id, callback) {
        connection.query('DELETE FROM `service` WHERE id = ?', [id], function (error, results) {
            if (error) throw error;
            
            callback(results.affectedRows);
        });
    },
    reports: function (option, callback) {
        if (option == "recebidas") {
            connection.query('SELECT `nome`, `formasDePagamento`, SUM(`preco` + `maoDeObra`) as total '
                + 'FROM service '
                + 'WHERE recebimento > 0 '
                + 'GROUP BY formasDePagamento '
                + 'ORDER BY nome', function (error, results) {
                    if (error) throw error;

                    callback(results);
                });
        } else if (option == "receber") {
            connection.query('SELECT `nome`, `formasDePagamento`, SUM(`preco` + `maoDeObra`) as total '
                + 'FROM service '
                + 'WHERE recebimento = 0 and CURRENT_DATE <= dataDeVencimento '
                + 'GROUP BY formasDePagamento '
                + 'ORDER BY nome', function (error, results) {
                    if (error) throw error

                    callback(results);
                });
        } else if (option == "atrasadas") {
            connection.query('SELECT `nome`, `formasDePagamento`, SUM(`preco` + `maoDeObra`) as total '
                + 'FROM service '
                + 'WHERE recebimento = 0 and CURRENT_DATE > dataDeVencimento '
                + 'GROUP BY formasDePagamento '
                + 'ORDER BY nome', function (error, results) {
                    if (error) throw error;

                    callback(results);
                });
        } else {
            callback(null);
        }
        }
}

module.exports = servicesService;