$(document).ready(function () {
    $("#prazo").css("display","none");
    document.getElementById("inpPreco").value = 0.00;
    document.getElementById("inpMaoDeObra").value = 0.00;
    document.getElementById("inpTotal").value = 0.00;
    document.getElementById("inpPrazo").value = 0;
});

function optionSelected() {
    var option = document.getElementById("optionFormasDePagamento").value;
    validate(option);
    sum();
}

function validate (option) {
    if (option == 'Á Vista') {
        $("#prazo").css("display","none");
        $("#recebimento").css("display","block");
    } else if (option == 'Boleto') {
        $("#recebimento").css("display","none");
        $("#prazo").css("display","block");
    } else {
        $("#prazo").css("display","none");
        $("#recebimento").css("display","block");
    }
}

function sum() {
    var preco = document.getElementById("inpPreco").value;
    var maoDeObra = document.getElementById("inpMaoDeObra").value;

    if (document.getElementById("optionFormasDePagamento").value == 'Boleto') {
        document.getElementById("inpTotal").value = 0.00;
    } else if (document.getElementById("optionFormasDePagamento").value != 'Boleto') {
        document.getElementById("inpPrazo").value = 0;

        if( isNumber(parseFloat(preco)) && isNumber(parseFloat(maoDeObra)) ) {
            var total = parseFloat(preco) + parseFloat(maoDeObra);
            document.getElementById("inpTotal").value = total.toFixed(2);
        } else {
            document.getElementById("inpTotal").value = 0.00;
        }
    }
}

function isNumber(number) {
    return !isNaN(number);
}