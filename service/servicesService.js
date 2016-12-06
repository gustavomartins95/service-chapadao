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
    }
}

module.exports = servicesService;