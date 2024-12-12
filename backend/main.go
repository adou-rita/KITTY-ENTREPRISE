package main

import (
	"log"
	"net/http"

	"kitty-entreprises/backend/handlers"
)

func main() {
	// Initialiser la base de données
	if err := database.InitDatabase(); err != nil {
		log.Fatalf("Erreur d'initialisation de la base de données : %v", err)
	}
	defer database.CloseDatabase()

	// Créer les gestionnaires
	productHandler := handlers.NewProductHandler()

	// Routes
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
	log.Println("Serveur démarré sur :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}