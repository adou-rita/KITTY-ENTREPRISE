package database

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitSQLiteDatabase() error {
	dataDir := "./data"
	if err := os.MkdirAll(dataDir, os.ModePerm); err != nil {
		return err
	}

	dbPath := filepath.Join(dataDir, "kitty_entreprises.db")
	var err error
	DB, err = sql.Open("sqlite3", dbPath)
	if err != nil {
		return err
	}

	if err := DB.Ping(); err != nil {
		return err
	}

	if err := createTables(); err != nil {
		return err
	}

	log.Println("Base de données SQLite connectée avec succès")
	return nil
}

func createTables() error {
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

func CloseSQLiteDatabase() {
	if DB != nil {
		DB.Close()
	}
}
