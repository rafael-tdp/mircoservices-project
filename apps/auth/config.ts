// Configuration de la base de données
export const DB_HOST: string = "localhost";
export const DB_PORT: number = 8080;
export const DB_NAME: string = "auth_db";
export const DB_USER: string = "auth_user";
export const DB_PASSWORD: string = "ChangeMe";

// Configuration de l'API externe
export const API_KEY: string = "your_api_key";
export const API_SECRET: string = "your_api_secret";

// Configuration du système d'authentification
export const JWT_SECRET: string = "your_jwt_secret";
export const JWT_EXPIRATION: number = 3600; // Durée de validité du token JWT en secondes

// Autres paramètres de configuration
export const DEBUG_MODE: boolean = true; // Active le mode de débogage (à désactiver en production)
export const LOG_LEVEL: string = "info"; // Niveau de journalisation (debug, info, warning, error, critical)
