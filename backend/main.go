package main

import (
	"log"
	"net/http"

	"kitty-entreprises/backend/database"
	"kitty-entreprises/backend/handlers"
)

func main() {
	// Initialiser la base de données
	if err := database.InitSQLiteDatabase(); err != nil {
		log.Fatalf("Erreur d'initialisation de la base de données : %v", err)
	}
	defer database.CloseSQLiteDatabase()

	// Créer les gestionnaires
	productHandler := handlers.NewProductHandler()

	// Servir les fichiers statiques avec des chemins spécifiques
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("../frontend/assets"))))

	// Servir l'index.html et autres fichiers
	fs := http.FileServer(http.Dir("../frontend"))
	http.Handle("/", fs)

	// Routes API
	http.HandleFunc("/api/products", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			productHandler.GetProducts(w, r)
		case http.MethodPost:
			productHandler.CreateProduct(w, r)
		default:
			http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		}
	})

	// Démarrer le serveur
	log.Println("Serveur démarré sur le port 9000...")
	log.Fatal(http.ListenAndServe(":9000", nil))
}
