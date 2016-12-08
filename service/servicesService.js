const connection = require('../api/conexao.js');

var servicesService = {
    save: function (dados, callback) {
        const datas = dataDeVencimento(dados.prazoEmDias);

        connection.query('INSERT INTO `service` SET ? , ?', [dados, datas], function (err, result) {
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

function dataDeVencimento (prazoEmDias) {
    // The number of milliseconds in one day
    // 60 * 1000 = 60.000 milisegundos que é 60 segundos
    // 60 * (60 * 1000) = 3.600.000 milisegundos que é 60 minutos
    // 24 * (60 * (60 * 1000)) = 86400000 milisegundos que é 1440 minutos
    // 1440 minutos são 24 horas
    const milliseconds =  24 * 60 * 60 * 1000;
    const dataAtual = new Date();

    // getTime() Returns the numeric value of the specified date as the number of milliseconds
    // since January 1, 1970, 00:00:00 UTC (negative for prior times).
    const dataDeVencimento = new Date(dataAtual.getTime() + (prazoEmDias * milliseconds));

    return {dataAtual: dataAtual, dataDeVencimento: dataDeVencimento};
}

module.exports = servicesService;