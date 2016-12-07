function optionReport(option) {
    getReport(option);
}

function getReport(option) {
    $.ajax({
        method: "GET",
        url: "/relatorios/" + option
    })
        .done(relatorio => {
            gerarPdf(relatorio)
        });
};

function gerarPdf(relatorio) {
    var documento = new jsPDF();
    documento.setFontSize(24);
    documento.setTextColor(255, 0, 0);
    documento.text(70, 20, "Service Chapadão");
    documento.text(67, 30, "Relatórios de contas");
    documento.setFontSize(12);
    documento.setTextColor(0, 0, 0);
    documento.text(20, 40, 'Nome');
    documento.text(85, 40, 'Formas De Pagamento');
    documento.text(160, 40, 'Total');

    if (relatorio.length === 0) {
        documento.text(85, 50, "No report found.");
    } else {
        for (i=0, j=50; i<relatorio.length; i++ , j=j+10) {
            var total = parseFloat(relatorio[i].total);
            documento.text(20, j, relatorio[i].nome);
            documento.text(100, j, relatorio[i].formasDePagamento);
            documento.text(160, j, "R$ " + total.toFixed(2));
        }
    }

    documento.output('dataurlnewwindow');
}