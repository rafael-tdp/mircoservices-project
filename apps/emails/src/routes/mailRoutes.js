import app from "express"; // Importez l'instance Express existante depuis votre fichier principal (app.js ou index.js)

export const notify = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Envoyez l'e-mail en utilisant Express Mailer
    app.mailer.send('email', {
      to,
      subject,
      text
    }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
      } else {
        res.status(200).json({ message: 'E-mail envoyé avec succès !' });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: `Une erreur est survenue lors de la notification de l'utilisateur : ${error}`,
    });
  }
};
