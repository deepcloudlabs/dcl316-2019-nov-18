let jack = new Employee("1","Jack Bauer",150000);
let kate = new Employee("2","Kate Austen",250000);
let employees = [ jack , kate ];
/*
let totalSalary = employees.map( function(emp){return emp.salary;})
      .reduce( function(sum,salary) { return sum+salary; } , 0 );
 */
// emp => emp.salary : lambda expression
// (sum,salary) => sum+salary : lambda expression
let totalSalary = employees.map( emp => emp.salary)
      .reduce( (sum,salary) => sum+salary , 0 );
/*
for (let emp of employees){
    totalSalary += emp.salary;
}
 */
document.querySelector("#total").innerText = totalSalary;
