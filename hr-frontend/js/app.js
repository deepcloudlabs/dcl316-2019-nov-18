let hrViewModel= new HrViewModel();
$(
    () => {
        toastr.options = AppConfig.TOASTR_CONFIG;
        ko.applyBindings(hrViewModel);
    }
);
