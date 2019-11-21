class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        this.findAll = this.findAll.bind(this);
        this.find = this.find.bind(this);
    }

    find() {
        fetch(`${AppConfig.REST_API_BASE_URL}/employees/${this.employee.identityNo()}`)
            .then( resp => resp.json() )
            .then( employee => {
                if (employee.photo == null) employee.photo = AppConfig.NO_IMAGE;
                return employee;
            }).then( employee => this.employee.refresh(employee));

    }

    findAll() {
        fetch(`${AppConfig.REST_API_BASE_URL}/employees?page=0&size=10`)
            .then(resp => resp.json())
            .then(employees => employees.map(emp => {
                if (emp.photo == null) emp.photo = AppConfig.NO_IMAGE;
                return emp;
            }))
            .then(employees => this.employees(employees));
    }
};
