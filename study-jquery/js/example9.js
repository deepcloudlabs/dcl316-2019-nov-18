$(document).ready(function () {
    $("#movies tbody").sortable({
        revert: true,
        placeholder: "ui-state-highlight"
    });
});