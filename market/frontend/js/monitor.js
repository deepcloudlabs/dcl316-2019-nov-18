class DashboardViewModel {
    constructor(){
        // domain related observables

        this.data = {
            labels: ko.observableArray([]),
            datasets: [
                {
                    label: [],
                    backgroundColor: "rgba(220,220,220,0.2)",
                    borderColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: ko.observableArray([])
                }
            ]
        } ;

        this.changeLng= this.changeLng.bind(this);
        this.i18n= this.i18n.bind(this);
        this.translate= this.translate.bind(this);
        this.start= this.start.bind(this);
        this.stop= this.stop.bind(this);
    }

    // i18n
    changeLng(lng){
        i18n.setLng(lng,() => {
            this.i18n();
        });
    };

    i18n(){
        $(document).i18n();
    };

    translate(word){
        return i18n.t(word);
    };

    // starts monitoring
    start(){
        /* TODO: start the monitoring */
        toastr.success(i18n.t("messageMonitoringStarted"), "", AppConfig.TOASTR_CONFIG);
    };

    // stops monitoring
    stop(){
        /* TODO: stop the monitoring */
        toastr.warning(i18n.t("messageMonitoringStoped"), "", AppConfig.TOASTR_CONFIG);
    };

};

var dashBoardViewModel= new DashboardViewModel();

$( () => {
    i18n.init(AppConfig.I18N_CONFIG,(t) => {
        $(document).i18n();
        ko.applyBindings(dashBoardViewModel);
    });
});