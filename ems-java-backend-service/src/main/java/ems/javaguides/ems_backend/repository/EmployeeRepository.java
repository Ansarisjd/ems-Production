package ems.javaguides.ems_backend.repository;

import ems.javaguides.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
                   
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
}
