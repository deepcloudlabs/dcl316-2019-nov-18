package com.example.hr.repository;

import com.example.hr.entity.Department;
import com.example.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,String> {
    List<Employee> findAllByBirthYearBetweenAndDepartment(
            int from, int to, Department department);
    @Query(value = "select e from Employee e where e.birthYear between :from and :to and e.department=:department",nativeQuery = false)
    List<Employee> bulVeGetir(int from, int to, Department department);
}
