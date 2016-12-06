(function () {
    function getService(search) {
        $.ajax({
            method: "GET",
            url: "/consultar/" + search
        })
            .done(services => {
                addTableRow(services);
            });
    };

    function addTableRow(services) {
        var newRow, columns, total;

        for (var i in services) {
            total = parseFloat(services[i].maoDeObra) + parseFloat(services[i].preco);

            newRow = $("<tr>");
            columns = "";

            columns += "<td>" + services[i].id + "</td>";
            columns += "<td>" + services[i].nome + "</td>";
            columns += "<td>" + services[i].placa + "</td>";
            columns += "<td>" + services[i].modelo + "</td>";
            columns += "<td>" + services[i].formasDePagamento + "</td>";
            columns += "<td>" + services[i].preco.toFixed(2) + "</td>";
            columns += "<td>" + services[i].maoDeObra.toFixed(2) + "</td>";
            columns += "<td>" + total.toFixed(2) + "</td>";
            columns += "<td>" + services[i].dataAtual + "</td>";
            columns += "<td>" + services[i].dataDeVencimento + "</td>";

            columns += '<td class="actions">';
            columns += '<a class="btn btn-success btn-xs" href="#">Receber</a> <a class="btn btn-primary btn-xs" href="#">Visualizar</a> <a class="btn btn-warning btn-xs" href="#">Editar</a> <a class="btn btn-danger btn-xs" href="#">Excluir</a>';
            columns += '</td>';

            newRow.append(columns);
            $("#tableServices").append(newRow);
        }
        return false;
    };

    $("form").on("submit", event => {
        let search = $("#search").val();
        getService(search);
        return false;
    });

})()