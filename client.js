const form = document.getElementById('employeeForm');
const employeeTable = document.getElementById('employeeTable').querySelector('tbody');
const totalMonthly = document.getElementById('totalMonthly');

let employees = [];

function addEmployee() {
    // Get values from inputs
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const id = form.idNumber.value;
    const title = form.jobTitle.value;
    const annualSalary = parseFloat(form.annualSalary.value);
    
    employees.push({ firstName, lastName, id, title, annualSalary });
    addEmployeeRow({ firstName, lastName, id, title, annualSalary });

    updateTotalMonthly();

    form.reset();
}

function addEmployeeRow(employee) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.id}</td>
      <td>${employee.title}</td>
      <td>$${employee.annualSalary.toFixed(2)}</td>
      
      <td><button onclick="deleteEmployee(this, ${employee.id})">Delete</button></td>
    `;
    employeeTable.appendChild(row);
  }

  function deleteEmployee(button, id) {
    // Remove the row from the table
    button.closest('tr').remove();
  
    employees = employees.filter(emp => emp.id != id);

    updateTotalMonthly();
}

function updateTotalMonthly() {
    const totalAnnual = employees.reduce((sum, emp) => sum + emp.annualSalary, 0);
    const totalMonthlyCost = totalAnnual / 12;

    totalMonthly.textContent = `Total Monthly: $${totalMonthlyCost.toFixed(2)}`;  
   
    if (totalMonthlyCost > 20000) {
        totalMonthly.classList.add('over-budget');
      } else {
        totalMonthly.classList.remove('over-budget');
      }
    }
    
