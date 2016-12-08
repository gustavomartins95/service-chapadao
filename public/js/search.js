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

        if (services.length === 0) {
            newRow = $("<tr>");
            columns = "";
            columns += '<td colspan="12" class="text-center danger">Nenhum dado encontrado.</td>';
            newRow.append(columns);
            $("#tableServices").append(newRow);
        } else {
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
                columns += '<a class="btn btn-warning btn-xs" href="/editar/'+ services[i].id +'">Editar</a> '
                         + '<a class="btn btn-danger btn-xs" href="/deletar/'+ services[i].id +'">Excluir</a>';
                columns += '</td>';

                newRow.append(columns);
                $("#tableServices").append(newRow);
            }
        }
        return false;
    };    

    $("form").on("submit", event => {
        let search = $("#search").val();
        $("#tableServices tr").remove();
        getService(search);
        return false;
    });

})()