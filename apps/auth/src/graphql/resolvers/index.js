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

  createUser: async args => {
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
}

export default resolver;
