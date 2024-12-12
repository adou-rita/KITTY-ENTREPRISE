package database

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDatabase() error {
	// Créer le dossier data s'il n'existe pas
	dataDir := "./data"
	if err := os.MkdirAll(dataDir, os.ModePerm); err != nil {
		return err
	}

	// Chemin complet de la base de données
	dbPath := filepath.Join(dataDir, "kitty_entreprises.db")

	// Ouvrir ou créer la base de données
	var err error
	DB, err = sql.Open("sqlite3", dbPath)
	if err != nil {
		return err
	}

	// Création des tables
	if err := createTables(); err != nil {
		return err
	}

	return nil
}

func createTables() error {
	// Exemple de création de table produits
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS products (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
			price DECIMAL(10,2) NOT NULL,
			stock INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Printf("Erreur de création de table: %v", err)
		return err
	}

	return nil
}

func CloseDatabase() {
	if DB != nil {
		DB.Close()
	}
}