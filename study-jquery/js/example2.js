$("document").ready(function () {
    $("table tbody tr").each(function () {
        var year = Number($(this).find('td:eq(4)').text().trim());
        if (year < 1970 || year > 1979) $(this).hide();
    });
});
