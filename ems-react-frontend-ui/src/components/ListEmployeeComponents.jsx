import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponents = () => {

  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        console.log("Full response:", response);

        const employeesList =
          response?.data?.data ||  // backend wrapped response
          response?.data ||        // backend direct array
          [];                      // safety fallback

        setEmployees(Array.isArray(employeesList) ? employeesList : []);
      })
      .catch(error => {
        console.error("API error:", error);
        setEmployees([]);
      });
  }

  function addNewEmployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">List of Employees</h2>

      <button
        className="btn btn-primary mb-2"
        onClick={addNewEmployee}
      >
        Add Employee
      </button>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <table className="table table-striped table-bordered w-75 mx-auto text-center">
            <thead className="table-dark">
              <tr>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5">No employees found</td>
                </tr>
              ) : (
                employees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button
                        className="btn btn-info me-2"
                        onClick={() => updateEmployee(employee.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListEmployeeComponents;
