$("document").ready(function () {
    var list = ["Drama", "Comedy"];
    $("table tbody tr").each(function () {
        var genres = $(this).find('td:eq(3)')
            .text()
            .trim()
            .replace(/\s+/g, '')
            .split(',');
        if (genres.length != 2) $(this).hide();
        for (var i in list) {
            if (genres.indexOf(list[i]) == -1) $(this).hide();
        }
        /*
        list.forEach( g => {
            if (genres.indexOf(g)==-1) $(this).hide();
        });
        */
    });
});
