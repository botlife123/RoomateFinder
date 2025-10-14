package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Response struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

type User struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

func main() {
	router := mux.NewRouter()

	// API routes
	router.HandleFunc("/api/health", healthCheckHandler).Methods("GET")
	router.HandleFunc("/api/users", getUsersHandler).Methods("GET")
	router.HandleFunc("/api/users", createUserHandler).Methods("POST")

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:8081", "http://localhost:19000", "http://localhost:19006"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	port := ":8080"
	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal(err)
	}
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	response := Response{
		Message: "Server is running",
		Data: map[string]string{
			"status": "healthy",
			"time":   time.Now().Format(time.RFC3339),
		},
	}
	respondJSON(w, http.StatusOK, response)
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	// Mock data for now
	users := []User{
		{
			ID:        "1",
			Name:      "John Doe",
			Email:     "john@example.com",
			CreatedAt: time.Now(),
		},
		{
			ID:        "2",
			Name:      "Jane Smith",
			Email:     "jane@example.com",
			CreatedAt: time.Now(),
		},
	}

	response := Response{
		Message: "Users retrieved successfully",
		Data:    users,
	}
	respondJSON(w, http.StatusOK, response)
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		respondJSON(w, http.StatusBadRequest, Response{
			Message: "Invalid request body",
		})
		return
	}

	// In a real app, you would save to a database
	user.ID = "3"
	user.CreatedAt = time.Now()

	response := Response{
		Message: "User created successfully",
		Data:    user,
	}
	respondJSON(w, http.StatusCreated, response)
}

func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}
