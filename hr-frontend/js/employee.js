class Employee {
    constructor(){
        this.identityNo	= ko.observable("");
        this.fullname = ko.observable("");
        this.iban = ko.observable("TR");
        this.salary	= ko.observable(2400);
        this.department	= ko.observable("IT");
        this.birthYear	= ko.observable(2000);
        this.partTime	= ko.observable(false);
        this.photo	= ko.observable(AppConfig.NO_IMAGE);
    }
}
