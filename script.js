document.addEventListener('DOMContentLoaded', () => {
    // Functions to handle form submissions and local storage
    function addUser(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        
        // Add user to local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, email, firstName, lastName });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update the users table
        updateUsersTable();
        
        // Reset the form
        document.getElementById('addUserForm').reset();
    }

    function updateUsersTable() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const usersTableBody = document.getElementById('usersTable').querySelector('tbody');
        usersTableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
    }

    function editUser(index) {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users[index];
        document.getElementById('updateUsername').value = user.username;
        document.getElementById('updateEmail').value = user.email;
        document.getElementById('updateFirstName').value = user.firstName;
        document.getElementById('updateLastName').value = user.lastName;
        document.getElementById('updateUserForm').style.display = 'block';
        document.getElementById('updateUserForm').onsubmit = (event) => {
            event.preventDefault();
            users[index] = {
                username: document.getElementById('updateUsername').value,
                email: document.getElementById('updateEmail').value,
                firstName: document.getElementById('updateFirstName').value,
                lastName: document.getElementById('updateLastName').value
            };
            localStorage.setItem('users', JSON.stringify(users));
            updateUsersTable();
            document.getElementById('updateUserForm').style.display = 'none';
        };
    }

    function deleteUser(index) {
        let users = JSON.parse(localStorage.getItem('users'));
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        updateUsersTable();
    }

    document.getElementById('addUserForm').addEventListener('submit', addUser);
    updateUsersTable();
});
