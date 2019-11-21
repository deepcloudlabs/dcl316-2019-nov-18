class HrViewModel {
    constructor() {
        this.employee = new Employee();
        this.employees = ko.observableArray([]);
        this.fileData = ko.observable({
            dataUrl: ko.observable(AppConfig.NO_IMAGE)
        });
        this.findAll = this.findAll.bind(this);
        this.find = this.find.bind(this);
        this.insertFile = this.insertFile.bind(this);
        this.dragover = this.dragover.bind(this);
    }

    insertFile(e, data) {
        e.preventDefault();
        let files = e.target.files || e.originalEvent.dataTransfer.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.fileData().dataUrl(event.target.result);
        };
    }

    dragover(e) {
        e.preventDefault();
    }

    find() {
        fetch(`${AppConfig.REST_API_BASE_URL}/employees/${this.employee.identityNo()}`)
            .then(resp => resp.json())
            .then(employee => {
                if (employee.photo == null) employee.photo = AppConfig.NO_IMAGE;
                return employee;
            }).then(employee => {
               this.employee.refresh(employee);
               this.fileData().dataUrl(employee.photo);
            });
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
