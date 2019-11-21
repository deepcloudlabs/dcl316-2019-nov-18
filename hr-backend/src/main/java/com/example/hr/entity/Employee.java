package com.example.hr.entity;

import com.example.hr.validation.Iban;
import com.example.hr.validation.TcKimlikNo;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Objects;

@Entity
@Table(name = "employees")
@DynamicInsert
@DynamicUpdate
public class Employee {
    @Id
    @Column(name = "identity")
    @TcKimlikNo
    @NotNull
    private String identityNo;
    @Pattern(regexp = "^[A-Z][a-z]+ [A-Z][a-z]+$")
    private String fullname;
    @NotNull
    @Iban
    private String iban;
    @Min(2400)
    private double salary;
    @Column(name = "year")
    @Max(2000)
    private int birthYear;
    @Column(name = "part_time")
    private boolean partTime;
    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] photo;
    @Enumerated(EnumType.STRING)
    @NotNull
    private Department department;

    public Employee() {
    }

    //region setter/getter
    public String getIdentityNo() {
        return identityNo;
    }

    public void setIdentityNo(String identityNo) {
        this.identityNo = identityNo;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public int getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }

    public boolean isPartTime() {
        return partTime;
    }

    public void setPartTime(boolean partTime) {
        this.partTime = partTime;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
    //endregion

    //region equals and hashcode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee employee = (Employee) o;
        return Objects.equals(identityNo, employee.identityNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(identityNo);
    }

    //endregion

    //region toString
    @Override
    public String toString() {
        return "Employee{" +
                "identityNo='" + identityNo + '\'' +
                ", fullname='" + fullname + '\'' +
                ", iban='" + iban + '\'' +
                ", salary=" + salary +
                ", birthYear=" + birthYear +
                ", partTime=" + partTime +
                ", department=" + department +
                '}';
    }

    //endregion
}