$("document").ready(function () {
    $("table tbody tr").each(function () {
        /*
        var directors= $(this).find('td:eq(2) a');
        if (directors.length<2) $(this).hide();
        */
        var content = $(this).find('td:eq(2)').text().trim();
        if (content.indexOf(',') == -1) $(this).hide();
    });
});
