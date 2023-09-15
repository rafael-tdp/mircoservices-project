import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json()); // Middleware pour parser le corps des requêtes en JSON

// Configuration d'Express Mailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureConnections: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: true
    }
  });

// Route pour envoyer un e-mail
app.post("/send-email", (req, res) => {
  
  const { to } = req.body;

  // Envoi de l'e-mail
  transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: to,
    subject: "IMPORTANT: Notification de nouvelle note",
    text: 
    "Bonjour,\n\n" +
    "Nous sommes heureux de vous informer qu'une nouvelle note a été publiée pour vous dans notre système. Cette note est maintenant disponible pour consultation.\n\n" +
    "Cordialement,\n" +
    "Devisio",
  }, (err, info) => {

    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    } else {
      console.log('E-mail envoyé avec succès:', info.response);
      res.status(200).json({ message: 'E-mail envoyé avec succès !' });
    }
  });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

export default app;
