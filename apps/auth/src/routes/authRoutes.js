import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new Error(`L'adresse email ${email} est déjà utilisée`);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        const payload = {
            userId: user._id,
            username: user.username,
        };

        const options = {
            expiresIn: "1h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        await user.save();

        res.json({
            message: "Utilisateur créé avec succès",
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${error}`,
        });
    }
};

export const login = async (req, res) => {
    // Logique de connexion de l'utilisateur
};

export const logout = async (req, res) => {
    // Logique de déconnexion de l'utilisateur
};
