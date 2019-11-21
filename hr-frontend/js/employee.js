class Employee {
    constructor() {
        this.identityNo = ko.observable("")
            .extend({
                required: true,
                tcKimlikNo: true,
                message: "Enter a valid identity!"
            });
        this.fullname = ko.observable("").extend({
            required: true,
            pattern: {
                params: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
                message: "Enter a valid full name!"
            }
        });
        this.iban = ko.observable("TR");
        this.salary = ko.observable(2200).extend({
            required: true,
            min: 2400
        });
        this.department = ko.observable("IT");
        this.birthYear = ko.observable(3000).extend({
            required: true,
            max: 2000
        });
        this.partTime = ko.observable(false);
        this.photo = ko.observable(AppConfig.NO_IMAGE);
        this.refresh = this.refresh.bind(this);
        this.validateEmployee = this.validateEmployee.bind(this);
        this.isEmployeeValid = this.isEmployeeValid.bind(this);
    }

    isEmployeeValid() {
        for (let field in this) {
            let o = this[field];
            if (ko.isObservable(o) && o.hasOwnProperty('rules') && !o.isValid()) {
                return false;
            }
        }
        return true;
    }

    validateEmployee() {
        for (let field in this) {
            let o = this[field];
            if (ko.isObservable(o) && o.hasOwnProperty('rules')) {
                o.isModified(true);
                ko.validation.validateObservable(o);
                console.log(o.isValid())
            }
        }
    }

    refresh(employee) {
        for (let field in employee) {
            if (this.hasOwnProperty(field)) {
                if (ko.isObservable(this[field]))
                    this[field](employee[field]);
                else
                    this[field] = employee[field];
            }
        }
    }
}
