class Employee {
    constructor(identity, fullname, salary) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        // this.sayHello = this.sayHello.bind(this);
        this.sayHello = () => {
            console.log("Hello " + this.fullname + "!");
        }
    }

    /*
        sayHello(){
            console.log("Hello " + this.fullname + "!");
        }
     */
}
