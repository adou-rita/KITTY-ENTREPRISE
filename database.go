package database

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq" // Utilisation du driver PostgreSQL
)

var DB *sql.DB

func InitDatabase() error {
	// Remplacer par les bonnes informations de connexion
	connStr := "postgresql://user:password@localhost:5432/kitty_entreprise?sslmode=disable" // ?sslmode=disable pour désactiver SSL

	// Ouverture de la connexion
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return err
	}

	// Vérifier la connexion
	if err = db.Ping(); err != nil {
		return err
	}

	// Affectation de la base de données à la variable globale DB
	DB = db
	log.Println("Connexion à la base de données réussie")
	return nil
}

func CloseDatabase() {
	if DB != nil {
		if err := DB.Close(); err != nil {
			log.Printf("Erreur lors de la fermeture de la base de données : %v", err)
		} else {
			log.Println("Base de données fermée avec succès.")
		}
	}
}
