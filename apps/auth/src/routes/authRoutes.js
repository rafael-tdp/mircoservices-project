import User from '../models/user.js'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new User({
            username,
            email,
            password,
        });

        await user.save();

        res.json({
            message: "Utilisateur créé avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${error}`,
        });
    }
};

export const loginUser = async (req, res) => {
    // Logique de connexion de l'utilisateur
};

export const logoutUser = async (req, res) => {
    // Logique de déconnexion de l'utilisateur
};
