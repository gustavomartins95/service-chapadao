(function () {
    function getService(search) {
        $.ajax({
            method: "GET",
            url: "/consultar/" + search
        })
    };

    $("form").on("submit", event => {
        let search = $("#search").val();
        getService(search);
        return false;
    });

})()