package com.example.hr.service;

import com.example.hr.entity.Employee;
import com.example.hr.repository.EmployeeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public Employee findEmployeeById(String identity) {
        return employeeRepository.findById(identity)
                                 .orElseThrow(
                  ()->new IllegalArgumentException("Cannot find employee!"));
    }

    @Transactional(readOnly = true)
    public List<Employee> findEmployees(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page,size))
                                 .getContent();
    }

    @Transactional
    public void createEmployee(Employee employee) {
        String identity= employee.getIdentityNo();
        if (employeeRepository.existsById(identity))
            throw new IllegalArgumentException("Employee already exists!");
        employeeRepository.save(employee);
    }

    @Transactional
    public void updateEmployee(Employee employee) {
        String identity=employee.getIdentityNo();
        employeeRepository.findById(identity).ifPresent(
            foundEmployee -> {
                foundEmployee.setIban(employee.getIban());
                foundEmployee.setSalary(employee.getSalary());
                foundEmployee.setPhoto(employee.getPhoto());
                foundEmployee.setPartTime(employee.isPartTime());
                foundEmployee.setDepartment(employee.getDepartment());
            }
        );
    }

    @Transactional
    public Employee removeEmployeeById(String identity) {
        Optional<Employee> employee = employeeRepository.findById(identity);
        employee.ifPresent(employeeRepository::delete);
        return employee.orElseThrow(
                ()->new IllegalArgumentException("Cannot find employee!"));
    }
}
