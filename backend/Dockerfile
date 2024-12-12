version: '3.8'
services:
backend:
build: 
context: ./backend
ports:
- "8080:8080"
environment:
- DB_PATH=/data/kitty_entreprises.db
volumes:
- ./data:/data

frontend:
build: 
context: ./frontend
ports:
- "3000:3000"
depends_on:
- backend
environment:
- REACT_APP_API_URL=http://backend:8080/api