package database

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"

	_ "github.com/mattn/go-sqlite3" // Import du driver SQLite
)

// InitDB initialise la base de données SQLite
func InitDB(dbPath string) (*sql.DB, error) {
	// Connexion à SQLite
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, fmt.Errorf("erreur lors de la connexion à la base de données : %v", err)
	}

	// Charger le script SQL
	schema, err := ioutil.ReadFile("database/schema.sql")
	if err != nil {
		return nil, fmt.Errorf("erreur lors du chargement du fichier schema.sql : %v", err)
	}

	// Exécuter le script SQL
	_, err = db.Exec(string(schema))
	if err != nil {
		return nil, fmt.Errorf("erreur lors de l'exécution du script SQL : %v", err)
	}

	log.Println("Base de données initialisée avec succès !")
	return db, nil
}
