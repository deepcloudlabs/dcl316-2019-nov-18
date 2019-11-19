$(document).ready(function () {
    $("#movies tbody tr").each(function (index) {
        let genres = $(this).find("td:eq(3)").text()
            .trim().replace(/\s+/g, '').split(',');
        if (genres.length != 2)
            $(this).hide(index * 20 + 200);
        if (genres.indexOf("Drama") < 0 || genres.indexOf("Comedy") < 0)
            $(this).hide(index * 20 + 200);
    });
});