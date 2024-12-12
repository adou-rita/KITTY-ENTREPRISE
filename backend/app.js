// Fonction pour récupérer la liste des utilisateurs
function getUsers() {
    fetch("/users")
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById("userList");
            userList.innerHTML = ""; // Vide le conteneur avant d'ajouter les utilisateurs

            data.forEach(user => {
                const userDiv = document.createElement("div");
                userDiv.innerHTML = `
                    <strong>${user.name}</strong><br>
                    Email: ${user.email}<br>
                    <hr>
                `;
                userList.appendChild(userDiv);
            });
        })
        .catch(error => {
            document.getElementById("userList").textContent = "Erreur lors de la récupération des utilisateurs.";
        });
}

// Appeler la fonction pour afficher les utilisateurs au chargement de la page
document.addEventListener("DOMContentLoaded", getUsers);
