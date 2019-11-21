package com.example.hr.controller;

import com.example.hr.entity.Employee;
import com.example.hr.service.EmployeeService;
import com.example.hr.validation.TcKimlikNo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;

@RestController
@RequestScope
@RequestMapping("/employees")
@CrossOrigin
@Validated
public class HrController {
    @Autowired private EmployeeService empSrv;

    // http://localhost:7001/hr/api/v1/employees/1
    @GetMapping("/{identity}")
    public Employee getEmployeeByIdentity(
            @PathVariable @Validated @TcKimlikNo String identity){
        return empSrv.findEmployeeById(identity);
    }

   // http://localhost:7001/hr/api/v1/employees?page=0&size=10
    @GetMapping
    public List<Employee> getEmployees(@RequestParam int page,
                                       @RequestParam int size){
        return empSrv.findEmployees(page,size);
    }

    @PostMapping
    public void addEmployee(@RequestBody @Validated Employee employee){
        empSrv.createEmployee(employee);
    }

    @PutMapping
    public void updateEmployee(@RequestBody @Validated Employee employee){
        empSrv.updateEmployee(employee);
    }

    @DeleteMapping("/{identity}")
    public Employee deleteEmployeeByIdentity(@PathVariable String identity){
        return empSrv.removeEmployeeById(identity);
    }
}
