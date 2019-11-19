$(document).ready(function () {
    $("#movies tbody tr").each(function (index) {
        let numOfDirectors = $(this).find("td:eq(2) a").length;
        if (numOfDirectors < 2) $(this).hide(index * 20 + 200);
    });
});