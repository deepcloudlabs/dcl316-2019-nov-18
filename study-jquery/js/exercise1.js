$(document).ready(function () {
    $("#movies tbody tr").each(function (index) {
        let year = Number($(this).find("td:eq(4)").text().trim());
        if (year > 1979 || year < 1970) $(this).hide(index * 20 + 200);
    });
});