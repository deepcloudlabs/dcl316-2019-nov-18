let hrViewModel= new HrViewModel();
$(
    () => {
        toastr.options = AppConfig.TOASTR_CONFIG;
        knockoutLocalize('en');
        ko.applyBindings(hrViewModel);
        ko.validation.init({
            decorateElement: true,
            decorateInputElement: true,
            insertMessages: true,
            errorElementClass: 'errorStyle',
            errorMessageClass: 'errorStyle',
            errorClass: 'errorStyle'
        }, true);
        hrViewModel.employee.validateEmployee();
    }
);
