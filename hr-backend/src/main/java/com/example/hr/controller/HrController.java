package com.example.hr.controller;

import com.example.hr.entity.Employee;
import com.example.hr.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

@RestController
@RequestScope
@RequestMapping("/employees")
@CrossOrigin
public class HrController {
    private EmployeeService empSrv;

    @GetMapping("/{identity}")
    public Employee getEmployeeByIdentity(@PathVariable String identity){
        return empSrv.findEmployeeById(identity);
    }
}
