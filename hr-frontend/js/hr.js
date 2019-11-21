class HrViewModel {
    constructor(){
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        this.findAll = this.findAll.bind(this);
    }

    findAll(){
        fetch(`${AppConfig.REST_API_BASE_URL}/employees?page=0&size=10`)
            .then( resp => resp.json() )
            .then( employees => this.employees(employees));
    }
};
