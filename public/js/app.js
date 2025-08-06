// Global variables
let currentEmployeeId = null;
let currentDepartmentId = null;
let employees = [];
let departments = [];

// API Base URL
const API_BASE = '/api';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadEmployees();
    loadDepartments();
});

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Employee functions
async function loadEmployees() {
    try {
        const response = await fetch(`${API_BASE}/employees`);
        employees = await response.json();
        displayEmployees(employees);
    } catch (error) {
        console.error('Error loading employees:', error);
        showAlert('Error loading employees', 'error');
    }
}

function displayEmployees(employeesToShow) {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '';
    
    employeesToShow.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.firstName} ${employee.lastName}</td>
            <td>${employee.email}</td>
            <td>${employee.position}</td>
            <td>${employee.department ? employee.department.name : 'N/A'}</td>
            <td>${employee.phone}</td>
            <td><span class="status-${employee.isActive ? 'active' : 'inactive'}">${employee.isActive ? 'Active' : 'Inactive'}</span></td>
            <td class="action-buttons">
                <button class="action-btn btn-warning" onclick="editEmployee('${employee._id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-danger" onclick="deleteEmployee('${employee._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function searchEmployees() {
    const searchTerm = document.getElementById('employeeSearch').value.toLowerCase();
    const filteredEmployees = employees.filter(employee => 
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.employeeId.toLowerCase().includes(searchTerm)
    );
    displayEmployees(filteredEmployees);
}

function showEmployeeForm(employeeId = null) {
    currentEmployeeId = employeeId;
    const modal = document.getElementById('employeeModal');
    const title = document.getElementById('employeeModalTitle');
    const form = document.getElementById('employeeForm');
    
    if (employeeId) {
        title.textContent = 'Edit Employee';
        const employee = employees.find(emp => emp._id === employeeId);
        if (employee) {
            document.getElementById('employeeId').value = employee.employeeId;
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('phone').value = employee.phone;
            document.getElementById('position').value = employee.position;
            document.getElementById('department').value = employee.department ? employee.department._id : '';
            document.getElementById('salary').value = employee.salary;
        }
    } else {
        title.textContent = 'Add Employee';
        form.reset();
    }
    
    modal.style.display = 'block';
}

function closeEmployeeModal() {
    document.getElementById('employeeModal').style.display = 'none';
    currentEmployeeId = null;
}

async function submitEmployeeForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const employeeData = Object.fromEntries(formData.entries());
    
    try {
        const url = currentEmployeeId 
            ? `${API_BASE}/employees/${currentEmployeeId}`
            : `${API_BASE}/employees`;
        
        const method = currentEmployeeId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData)
        });
        
        if (response.ok) {
            showAlert(currentEmployeeId ? 'Employee updated successfully!' : 'Employee added successfully!', 'success');
            closeEmployeeModal();
            loadEmployees();
        } else {
            const error = await response.json();
            showAlert(error.message || 'Error saving employee', 'error');
        }
    } catch (error) {
        console.error('Error saving employee:', error);
        showAlert('Error saving employee', 'error');
    }
}

async function editEmployee(employeeId) {
    showEmployeeForm(employeeId);
}

async function deleteEmployee(employeeId) {
    if (confirm('Are you sure you want to delete this employee?')) {
        try {
            const response = await fetch(`${API_BASE}/employees/${employeeId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showAlert('Employee deleted successfully!', 'success');
                loadEmployees();
            } else {
                const error = await response.json();
                showAlert(error.message || 'Error deleting employee', 'error');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            showAlert('Error deleting employee', 'error');
        }
    }
}

// Department functions
async function loadDepartments() {
    try {
        const response = await fetch(`${API_BASE}/departments`);
        departments = await response.json();
        displayDepartments(departments);
        updateDepartmentSelects();
    } catch (error) {
        console.error('Error loading departments:', error);
        showAlert('Error loading departments', 'error');
    }
}

function displayDepartments(departmentsToShow) {
    const tbody = document.getElementById('departmentTableBody');
    tbody.innerHTML = '';
    
    departmentsToShow.forEach(department => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${department.departmentCode}</td>
            <td>${department.name}</td>
            <td>${department.description}</td>
            <td>${department.location}</td>
            <td>${department.manager ? `${department.manager.firstName} ${department.manager.lastName}` : 'N/A'}</td>
            <td><span class="status-${department.isActive ? 'active' : 'inactive'}">${department.isActive ? 'Active' : 'Inactive'}</span></td>
            <td class="action-buttons">
                <button class="action-btn btn-warning" onclick="editDepartment('${department._id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-danger" onclick="deleteDepartment('${department._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function searchDepartments() {
    const searchTerm = document.getElementById('departmentSearch').value.toLowerCase();
    const filteredDepartments = departments.filter(department => 
        department.name.toLowerCase().includes(searchTerm) ||
        department.departmentCode.toLowerCase().includes(searchTerm) ||
        department.description.toLowerCase().includes(searchTerm)
    );
    displayDepartments(filteredDepartments);
}

function showDepartmentForm(departmentId = null) {
    currentDepartmentId = departmentId;
    const modal = document.getElementById('departmentModal');
    const title = document.getElementById('departmentModalTitle');
    const form = document.getElementById('departmentForm');
    
    if (departmentId) {
        title.textContent = 'Edit Department';
        const department = departments.find(dept => dept._id === departmentId);
        if (department) {
            document.getElementById('departmentCode').value = department.departmentCode;
            document.getElementById('departmentName').value = department.name;
            document.getElementById('description').value = department.description;
            document.getElementById('location').value = department.location;
            document.getElementById('manager').value = department.manager ? department.manager._id : '';
        }
    } else {
        title.textContent = 'Add Department';
        form.reset();
    }
    
    modal.style.display = 'block';
}

function closeDepartmentModal() {
    document.getElementById('departmentModal').style.display = 'none';
    currentDepartmentId = null;
}

function updateDepartmentSelects() {
    const departmentSelect = document.getElementById('department');
    const managerSelect = document.getElementById('manager');
    
    // Update department select
    departmentSelect.innerHTML = '<option value="">Select Department</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept._id;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });
    
    // Update manager select
    managerSelect.innerHTML = '<option value="">Select Manager</option>';
    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp._id;
        option.textContent = `${emp.firstName} ${emp.lastName}`;
        managerSelect.appendChild(option);
    });
}

async function submitDepartmentForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const departmentData = Object.fromEntries(formData.entries());
    
    try {
        const url = currentDepartmentId 
            ? `${API_BASE}/departments/${currentDepartmentId}`
            : `${API_BASE}/departments`;
        
        const method = currentDepartmentId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentData)
        });
        
        if (response.ok) {
            showAlert(currentDepartmentId ? 'Department updated successfully!' : 'Department added successfully!', 'success');
            closeDepartmentModal();
            loadDepartments();
        } else {
            const error = await response.json();
            showAlert(error.message || 'Error saving department', 'error');
        }
    } catch (error) {
        console.error('Error saving department:', error);
        showAlert('Error saving department', 'error');
    }
}

async function editDepartment(departmentId) {
    showDepartmentForm(departmentId);
}

async function deleteDepartment(departmentId) {
    if (confirm('Are you sure you want to delete this department?')) {
        try {
            const response = await fetch(`${API_BASE}/departments/${departmentId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showAlert('Department deleted successfully!', 'success');
                loadDepartments();
            } else {
                const error = await response.json();
                showAlert(error.message || 'Error deleting department', 'error');
            }
        } catch (error) {
            console.error('Error deleting department:', error);
            showAlert('Error deleting department', 'error');
        }
    }
}

// Utility functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            alert.style.backgroundColor = '#28a745';
            break;
        case 'error':
            alert.style.backgroundColor = '#dc3545';
            break;
        default:
            alert.style.backgroundColor = '#17a2b8';
    }
    
    document.body.appendChild(alert);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Event listeners
document.getElementById('employeeForm').addEventListener('submit', submitEmployeeForm);
document.getElementById('departmentForm').addEventListener('submit', submitDepartmentForm);

// Close modals when clicking outside
window.onclick = function(event) {
    const employeeModal = document.getElementById('employeeModal');
    const departmentModal = document.getElementById('departmentModal');
    
    if (event.target === employeeModal) {
        closeEmployeeModal();
    }
    if (event.target === departmentModal) {
        closeDepartmentModal();
    }
} 