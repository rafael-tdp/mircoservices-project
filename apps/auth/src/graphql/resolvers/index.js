import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const resolver = {
  users: async () => {
    try {
      const usersFetched = await User.find()
      return usersFetched.map(user => {
        return {
          ...user._doc,
          _id: user.id,
        }
      })
    } catch (error) {
      throw error
    }
  },

  register: async args => {
    try {
        const { firstname, lastname, email, password, role } = args.user;

        if (!(firstname && lastname && email && password && role))
            throw new Error("Invalid arguments");

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new Error(`L'adresse email ${email} est déjà utilisée`);

        const user = new User({
            firstname, 
            lastname, 
            email, 
            password: hashedPassword,
            role
        })

        const payload = {
            userId: user._id
        };

        const options = {
            expiresIn: "12h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        const newUser = await user.save()
        return { ...newUser._doc, message: "Utilisateur créé avec succès", token: token }
    } catch (error) {
      throw error
    }
  },
  login: async args => {

    try {
        const { email, password } = args.user;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Identifiants invalides");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Mot de passe invalides");

        }

        const payload = {
            userId: user._id,
        };

        const options = {
            expiresIn: "12h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        return { user, message: "Connecté", token: token }

    } catch (error) {
        throw error
    }

  }



}

export default resolver;
