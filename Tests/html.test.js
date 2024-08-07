const fs = require('fs');
const path = require('path');

describe('HTML', () => {

    function checkElement(selector, attributes) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        Object.keys(attributes).forEach(attr => {
            expect(element.getAttribute(attr)).toBe(attributes[attr]);
        });
        return element;
    }

    function checkStyles(selector, expectedStyles) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        const styles = window.getComputedStyle(element);
        Object.keys(expectedStyles).forEach(style => {
            expect(styles[style]).toBe(expectedStyles[style]);
        });
    }

    function checkContains(containerSelector, childSelectors) {
        const container = document.querySelector(containerSelector);
        expect(container).toBeTruthy();
        childSelectors.forEach(childSelector => {
            const child = document.querySelector(childSelector);
            expect(container.contains(child)).toBe(true);
        });
    }

    function checkTextContent(selector, expectedText) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        expect(element.textContent.trim()).toBe(expectedText);
    }

    function checkNthChildTextContent(trSelector, expectedTextContents) {
        const tr = document.querySelector(trSelector);
        expect(tr).toBeTruthy();
        
        const children = tr.children;
        expect(children.length).toBe(expectedTextContents.length);
    
        for (let i = 0; i < expectedTextContents.length; i++) {
            expect(children[i].textContent).toBe(expectedTextContents[i]);
        }
    }

    function checkDisabledState(selector, expectedDisabled) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        expect(element.disabled).toBe(expectedDisabled);
    }
    
        
    
    describe('Users Page', () => {

        beforeEach(() => {
        
            const html = fs.readFileSync(path.resolve(__dirname, '../users.html'), 'utf8');
            const cssContent = fs.readFileSync(path.resolve(__dirname, '../css/style.css'), 'utf8');
            
            document.body.innerHTML = html;
            
            const styleElement = document.createElement('style');
            styleElement.textContent = cssContent;
            document.head.appendChild(styleElement);
    
            jest.resetModules();
    
        });

        it('Title and Body', () => {

            checkElement('head', {});
            checkTextContent('title',"User Management");
            checkElement('link[rel="stylesheet"',{href:"css/style.css"});
            checkContains('body', ['.sidebar','.content','script']);
        });

        it('Sidebar', () => {

            checkContains('.sidebar', ['a','#user','#group','#role']);
            checkElement('#user',{
                href: "users.html",
                class: 'active',
            });
            checkElement('#group',{
                href: "groups.html",
            });
            checkElement('#role',{
                href: "roles.html",
            });
            checkTextContent('#user', "User Management");
            checkTextContent('#group', "Group Management");
            checkTextContent('#role', "Role Management");

        });

        describe('Content', () => {

            it('Add User', () => {

                checkContains('.content', ['h2','#addUserForm','h3','#usersTable','#updateUserForm']);
            
                checkTextContent('.content h2', "User Management");

                checkContains('#addUserForm', ['#addUserForm h3','#addUserForm label','#addUserForm input','#addUserForm button']);

                checkTextContent('#addUserForm h3', "Add User");
                checkTextContent('label[for="userName"]', "Username:");
                checkTextContent('label[for="email"]', "Email:");
                checkTextContent('label[for="firstName"]', "First Name:");
                checkTextContent('label[for="lastName"]', "Last Name:");
                checkElement('#userName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#email',{
                    type: 'email',
                    required: ''
                });
                checkElement('#firstName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#lastName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#addUserForm button',{
                    type: 'submit',
                });
                checkDisabledState('#addUserForm button', false);            
                checkTextContent('#addUserForm button', "Add User");

            });

            it('User List', () => {

                checkTextContent('#userList', "Users List");

                checkContains('#usersTable', ['thead','tr','th','tbody']);
                checkNthChildTextContent('#usersTable thead tr', [
                    'Username', 
                    'Email', 
                    'First Name', 
                    'Last Name', 
                    'Actions'
                ]);
                checkTextContent('tbody','');

            });

            it('Update User', () => {

                checkElement('#updateUserForm',{style: "display:none;",});
                checkContains('#updateUserForm', ['#updateUserForm h3','#updateUserForm label','#updateUserForm input','#updateUserForm button']);

                checkTextContent('#updateUserForm h3', "Update User");
                checkTextContent('label[for="updateUsername"]', "Username:");
                checkTextContent('label[for="updateEmail"]', "Email:");
                checkTextContent('label[for="updateFirstName"]', "First Name:");
                checkTextContent('label[for="updateLastName"]', "Last Name:");
                checkElement('#updateUsername',{
                    type: 'text',
                    required: ''
                });
                checkElement('#updateEmail',{
                    type: 'email',
                    required: ''
                });
                checkElement('#updateFirstName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#updateLastName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#updateUserForm button',{
                    type: 'submit',
                });
                checkDisabledState('#updateUserForm button', false);            
                checkTextContent('#updateUserForm button', "Update User");

            });

        });

        it('Script', () => {
            checkElement('script',{src:"script.js"});
        });
            
    });

    describe('Groups Page', () => {

        beforeEach(() => {
        
            const html = fs.readFileSync(path.resolve(__dirname, '../groups.html'), 'utf8');
            const cssContent = fs.readFileSync(path.resolve(__dirname, '../css/style.css'), 'utf8');
            
            document.body.innerHTML = html;
            
            const styleElement = document.createElement('style');
            styleElement.textContent = cssContent;
            document.head.appendChild(styleElement);
    
            jest.resetModules();
    
        });

        it('Title and Body', () => {

            checkElement('head', {});
            checkTextContent('title',"Group Management");
            checkElement('link[rel="stylesheet"',{href:"css/style.css"});
            checkContains('body', ['.sidebar','.content','script']);
        });

        it('Sidebar', () => {

            checkContains('.sidebar', ['a','#user','#group','#role']);
            checkElement('#user',{
                href: "users.html"
                
            });
            checkElement('#group',{
                href: "groups.html",
                class: 'active'
            });
            checkElement('#role',{
                href: "roles.html",
            });
            checkTextContent('#user', "User Management");
            checkTextContent('#group', "Group Management");
            checkTextContent('#role', "Role Management");

        });

        describe('Content', () => {

            it('Create Group', () => {

                checkContains('.content', ['h2','#createGroupForm','#groupList','#addUsersToGroupForm']);

                checkTextContent('.content h2', "Group Management");

                checkContains('#createGroupForm', ['h3','label','input','button']);

                checkTextContent('#createGroupForm h3', "Create Group");
                checkTextContent('label[for="groupName"]', "Group Name:");
                
                checkElement('#groupName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#createGroupForm button',{
                    type: 'submit',
                });
                checkDisabledState('#createGroupForm button', false);            
                checkTextContent('#createGroupForm button', "Create Group");

            });

            it('Group List', () => {

                checkTextContent('#groupList', "Groups List");

                checkContains('#groupsTable', ['thead','tr','th','tbody']);
                checkNthChildTextContent('#groupsTable thead tr', [
                    'Group Name', 
                    'Actions'
                ]);
                checkTextContent('tbody','');

            });

            it('Add Users to Group', () => {

                checkContains('#addUsersToGroupForm', ['#addUsersToGroupForm h3','#addUsersToGroupForm label','#addUsersToGroupForm select','#addUsersToGroupForm button']);


                checkTextContent('#addUsersToGroupForm h3', "Add Users to Group");
                checkTextContent('label[for="groupSelect"]', "Select Group:");
                checkTextContent('label[for="usersSelect"]', "Select Users:");
                checkElement('#groupSelect',{
                    required: ''
                });
                checkElement('#usersSelect',{
                    required: '',
                    multiple:''
                });
            
                checkElement('#addUsersToGroupForm button',{
                    type: 'submit',
                });
                checkDisabledState('#addUsersToGroupForm button', false);            
                checkTextContent('#addUsersToGroupForm button', "Add Users to Group");

            });

        });

        it('Script', () => {
            checkElement('script',{src:"script.js"});
        });
    });

    describe('Roles Page', () => {

        beforeEach(() => {
        
            const html = fs.readFileSync(path.resolve(__dirname, '../roles.html'), 'utf8');
            const cssContent = fs.readFileSync(path.resolve(__dirname, '../css/style.css'), 'utf8');
            
            document.body.innerHTML = html;
            
            const styleElement = document.createElement('style');
            styleElement.textContent = cssContent;
            document.head.appendChild(styleElement);
    
            jest.resetModules();
    
        });
        
        it('Title and Body', () => {

            checkElement('head', {});
            checkTextContent('title',"Role Management");
            checkElement('link[rel="stylesheet"',{href:"css/style.css"});
            checkContains('body', ['.sidebar','.content','script']);
        });

        it('Sidebar', () => {

            checkContains('.sidebar', ['a','#user','#group','#role']);
            checkElement('#user',{
                href: "users.html",    
            });
            checkElement('#group',{
                href: "groups.html",
            });
            checkElement('#role',{
                href: "roles.html",
                class: 'active',
            });
            checkTextContent('#user', "User Management");
            checkTextContent('#group', "Group Management");
            checkTextContent('#role', "Role Management");

        });

        describe('Content', () => {

            it('Create Role', () => {

                checkContains('.content', ['h2','#createRoleForm','h3','#rolesTable','#assignRolesToUserForm','#assignRolesToGroupForm','#roleAssignments']);

                checkTextContent('.content h2', "Role Management");
            
                checkContains('#createRoleForm', ['h3','label','input','button']);
    
                checkTextContent('#createRoleForm h3', "Create Role");
                checkTextContent('label[for="roleName"]', "Role Name:");
                checkTextContent('label[for="roleDescription"]', "Role Description:");
    
                checkElement('#roleName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#roleDescription',{
                    type: 'text',
                    required: ''
                });
                checkElement('#createRoleForm button',{
                    type: 'submit',
                });
                checkDisabledState('#createRoleForm button', false);            
                checkTextContent('#createRoleForm button', "Create Role");

            });

            it('Role List', () => {

                checkTextContent('#roleList', "Roles List");

                // checkContains('#rolesTable', ['thead','tr','th','tbody']);
                checkNthChildTextContent('#rolesTable thead tr', [
                    'Role Name', 
                    'Description', 
                    'Actions'
                ]);
                checkTextContent('tbody','');

            });

            it('Assign Roles to Users', () => {

                checkTextContent('#assignRolesToUserForm h3', "Assign Roles to User");
                checkTextContent('label[for="roleSelect"]', "Select Role:");
                checkTextContent('label[for="usersSelect"]', "Select Users:");
                checkElement('#roleSelect',{
                    required: ''
                });
                checkElement('#usersSelect',{
                    required: '',
                    multiple:''
                });
           
                checkElement('#assignRolesToUserForm button',{
                    type: 'submit',
                });
                checkDisabledState('#assignRolesToUserForm button', false);            
                checkTextContent('#assignRolesToUserForm button', "Assign Roles to Users");


            });

            it('Assign Roles to Groups', () => {

                checkTextContent('#assignRolesToGroupForm h3', "Assign Roles to Group");
                checkTextContent('label[for="groupRoleSelect"]', "Select Role:");
                checkTextContent('label[for="groupsSelect"]', "Select Groups:");
                checkElement('#groupRoleSelect',{
                    required: ''
                });
                checkElement('#groupsSelect',{
                    required: '',
                    multiple:''
                });
           
                checkElement('#assignRolesToGroupForm button',{
                    type: 'submit',
                });
                checkDisabledState('#assignRolesToGroupForm button', false);            
                checkTextContent('#assignRolesToGroupForm button', "Assign Roles to Groups");


            });

            it('Role Assignment List', () => {

                checkTextContent('#roleAssignments', "Role Assignments");

                //checkContains('#roleAssignmentsTable', ['thead','tr','th','tbody']);
                checkNthChildTextContent('#roleAssignmentsTable thead tr', [
                    'Role Name', 
                    'Assigned Users', 
                    'Assigned Groups'
                ]);
                checkTextContent('tbody','');

            });

        });

        it('Script', () => {
            checkElement('script',{src:"script.js"});
        });

    });

});