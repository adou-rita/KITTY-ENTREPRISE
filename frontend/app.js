document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById('addUserForm');
    const userList = document.getElementById('userList');

    // Fonction pour récupérer les utilisateurs depuis l'API
    function fetchUsers() {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(users => {
                userList.innerHTML = '';  // Réinitialiser la liste avant d'ajouter les utilisateurs
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `Nom: ${user.name}, Email: ${user.email}`;
                    userList.appendChild(li);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des utilisateurs:', error));
    }

    // Fonction pour ajouter un utilisateur via l'API
    function addUser(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = { name, email, password };

        fetch('http://localhost:8080/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (response.status === 201) {
                alert('Utilisateur ajouté avec succès!');
                fetchUsers();  // Récupérer la liste des utilisateurs après ajout
            } else {
                alert('Erreur lors de l\'ajout de l\'utilisateur');
            }
        })
        .catch(error => console.error('Erreur lors de l\'ajout de l\'utilisateur:', error));
    }

    // Initialiser la récupération des utilisateurs au chargement de la page
    fetchUsers();

    // Ajouter un utilisateur lorsque le formulaire est soumis
    addUserForm.addEventListener('submit', addUser);
});
