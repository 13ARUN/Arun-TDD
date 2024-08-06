document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const usersList = document.getElementById('usersList');
    const groupForm = document.getElementById('groupForm');
    const groupsList = document.getElementById('groupsList');
    const roleForm = document.getElementById('roleForm');
    const rolesList = document.getElementById('rolesList');
    const cancelEdit = document.getElementById('cancelEdit');

    const selectGroup = document.getElementById('selectGroup');
    const selectUsers = document.getElementById('selectUsers');
    const assignUsersToGroupsForm = document.getElementById('assignUsersToGroupsForm');

    const selectRole = document.getElementById('selectRole');
    const selectUsersForRole = document.getElementById('selectUsersForRole');
    const assignRolesToUsersForm = document.getElementById('assignRolesToUsersForm');

    const selectRoleForGroup = document.getElementById('selectRoleForGroup');
    const selectGroupsForRole = document.getElementById('selectGroupsForRole');
    const assignRolesToGroupsForm = document.getElementById('assignRolesToGroupsForm');

    const loadUsers = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        usersList.innerHTML = '';
        selectUsers.innerHTML = '';
        selectUsersForRole.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${user.username} (${user.email}) - ${user.firstName} ${user.lastName}
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>`;
            usersList.appendChild(li);

            const option = document.createElement('option');
            option.value = index;
            option.textContent = user.username;
            selectUsers.appendChild(option);
            selectUsersForRole.appendChild(option.cloneNode(true));
        });
    };

    const loadGroups = () => {
        const groups = JSON.parse(localStorage.getItem('groups')) || [];
        groupsList.innerHTML = '';
        selectGroup.innerHTML = '<option value="" disabled selected>Select Group</option>';
        selectGroupsForRole.innerHTML = '';
        groups.forEach((group, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${group.name}
                <button onclick="deleteGroup(${index})">Delete</button>`;
            groupsList.appendChild(li);

            const option = document.createElement('option');
            option.value = index;
            option.textContent = group.name;
            selectGroup.appendChild(option);
            selectGroupsForRole.appendChild(option.cloneNode(true));
        });
    };

    const loadRoles = () => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        rolesList.innerHTML = '';
        selectRole.innerHTML = '<option value="" disabled selected>Select Role</option>';
        selectRoleForGroup.innerHTML = '<option value="" disabled selected>Select Role</option>';
        roles.forEach((role, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${role.name} - ${role.description}
                <button onclick="deleteRole(${index})">Delete</button>`;
            rolesList.appendChild(li);

            const option = document.createElement('option');
            option.value = index;
            option.textContent = role.name;
            selectRole.appendChild(option);
            selectRoleForGroup.appendChild(option.cloneNode(true));
        });
    };

    const clearUserForm = () => {
        document.getElementById('userId').value = '';
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        cancelEdit.classList.add('hidden');
    };

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (userId) {
            // Edit existing user
            users[userId] = { username, email, firstName, lastName };
            alert('User updated successfully');
        } else {
            // Add new user
            users.push({ username, email, firstName, lastName });
            alert('User added successfully');
        }

        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
        clearUserForm();
    });

    groupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const groupName = document.getElementById('groupName').value;
        const groups = JSON.parse(localStorage.getItem('groups')) || [];
        groups.push({ name: groupName });
        localStorage.setItem('groups', JSON.stringify(groups));
        loadGroups();
        alert('Group created successfully');
    });

    roleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleName = document.getElementById('roleName').value;
        const roleDescription = document.getElementById('roleDescription').value;
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        roles.push({ name: roleName, description: roleDescription });
        localStorage.setItem('roles', JSON.stringify(roles));
        loadRoles();
        alert('Role created successfully');
    });

    assignUsersToGroupsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const groupIndex = selectGroup.value;
        const selectedUserIndexes = Array.from(selectUsers.selectedOptions).map(option => parseInt(option.value));
        const groups = JSON.parse(localStorage.getItem('groups')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (groupIndex !== '') {
            groups[groupIndex].userIds = selectedUserIndexes;
            localStorage.setItem('groups', JSON.stringify(groups));
            alert('Users assigned to group successfully');
        }
    });

    assignRolesToUsersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleIndex = selectRole.value;
        const selectedUserIndexes = Array.from(selectUsersForRole.selectedOptions).map(option => parseInt(option.value));
        const roles = JSON.parse(localStorage.getItem('roles')) || [];

        if (roleIndex !== '') {
            roles[roleIndex].userIds = selectedUserIndexes;
            localStorage.setItem('roles', JSON.stringify(roles));
            alert('Roles assigned to users successfully');
        }
    });

    assignRolesToGroupsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleIndex = selectRoleForGroup.value;
        const selectedGroupIndexes = Array.from(selectGroupsForRole.selectedOptions).map(option => parseInt(option.value));
        const roles = JSON.parse(localStorage.getItem('roles')) || [];

        if (roleIndex !== '') {
            roles[roleIndex].groupIds = selectedGroupIndexes;
            localStorage.setItem('roles', JSON.stringify(roles));
            alert('Roles assigned to groups successfully');
        }
    });

    window.editUser = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users[index];
        document.getElementById('userId').value = index;
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        cancelEdit.classList.remove('hidden');
    };

    window.deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (confirm('Are you sure you want to delete this user?')) {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
            alert('User deleted successfully');
        }
    };

    window.deleteGroup = (index) => {
        const groups = JSON.parse(localStorage.getItem('groups')) || [];
        if (confirm('Are you sure you want to delete this group?')) {
            groups.splice(index, 1);
            localStorage.setItem('groups', JSON.stringify(groups));
            loadGroups();
            alert('Group deleted successfully');
        }
    };

    window.deleteRole = (index) => {
        const roles = JSON.parse(localStorage.getItem('roles')) || [];
        if (confirm('Are you sure you want to delete this role?')) {
            roles.splice(index, 1);
            localStorage.setItem('roles', JSON.stringify(roles));
            loadRoles();
            alert('Role deleted successfully');
        }
    };

    cancelEdit.addEventListener('click', clearUserForm);

    loadUsers();
    loadGroups();
    loadRoles();
});
