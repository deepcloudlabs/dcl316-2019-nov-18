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
        this.addEmployee = this.addEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(employee) {
        fetch(`${AppConfig.REST_API_BASE_URL}/employees/${employee.identityNo}`,
            {
                method: 'DELETE'
            })
            .then(resp => resp.json())
            .then(employee => {
                if (employee.photo == null) employee.photo = AppConfig.NO_IMAGE;
                else
                    employee.photo = toSrcImage(employee.photo);
                return employee;
            }).then(employee => {
            this.employee.refresh(employee);
            this.fileData().dataUrl(employee.photo);
            let employees = this.employees()
                .filter(emp => emp.identityNo != employee.identityNo);
            this.employees(employees);
            toastr.warning("Employee is deleted!")
        });

    }

    removeEmployee() {
        fetch(`${AppConfig.REST_API_BASE_URL}/employees/${this.employee.identityNo()}`,
            {
                method: 'DELETE'
            })
            .then(resp => resp.json())
            .then(employee => {
                if (employee.photo == null) employee.photo = AppConfig.NO_IMAGE;
                else
                    employee.photo = toSrcImage(employee.photo);
                return employee;
            }).then(employee => {
            this.employee.refresh(employee);
            this.fileData().dataUrl(employee.photo);
            toastr.warning("Employee is deleted!")
        });
    }

    async addEmployee() {
        let emp = ko.toJS(this.employee);
        emp.photo = toRawImage(this.fileData().dataUrl());
        let json = JSON.stringify(emp);
        await fetch(`${AppConfig.REST_API_BASE_URL}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        toastr.success("Employee is created!")
    }

    updateEmployee() {
        let emp = ko.toJS(this.employee);
        emp.photo = toRawImage(this.fileData().dataUrl());
        let json = JSON.stringify(emp);
        fetch(`${AppConfig.REST_API_BASE_URL}/employees`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        }).then(() => toastr.success("Employee is updated!"));
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
                else
                    employee.photo = toSrcImage(employee.photo);
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
                if (emp.photo == null)
                    emp.photo = AppConfig.NO_IMAGE;
                else
                    emp.photo = toSrcImage(emp.photo);
                return emp;
            }))
            .then(employees => this.employees(employees));
    }
};
