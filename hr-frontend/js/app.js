let hrViewModel= new HrViewModel();
$(
    () => {
        toastr.options = AppConfig.TOASTR_CONFIG;
        i18n.init(
            AppConfig.I18N_CONFIG,
            (t)=>{
                $(document).i18n();
                knockoutLocalize('en');
                ko.validation.init({
                    decorateElement: true,
                    decorateElementOnModified: true,
                    insertMessages: true,
                    errorElementClass: 'text-danger',
                    errorMessageClass: 'help-block text-danger'
                }, true);
                ko.applyBindings(hrViewModel);
                hrViewModel.employee.validateEmployee();
            }
        );
    }
);
