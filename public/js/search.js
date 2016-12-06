(function () {
    function getService(search) {
        $.ajax({
            method: "GET",
            url: "/consultar/" + search
        })
            .done(services => {
                console.log(services);
            });
    };

    $("form").on("submit", event => {
        let search = $("#search").val();
        getService(search);
        return false;
    });

})()