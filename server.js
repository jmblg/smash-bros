// Importation des dépendances nécessaires
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Créer une application Express
const app = express();

// Définir le port d'écoute du serveur
const port = 3001;

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Créer un répertoire 'images' si ce n'est pas déjà fait
const imagesDir = path.resolve(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Endpoint pour télécharger une image
app.post('/download-image', async (req, res) => {
    const { url, filename } = req.body;

    if (!url || !filename) {
        return res.status(400).json({ error: 'L\'URL et le nom du fichier sont nécessaires.' });
    }

    try {
        // Télécharge l'image via Axios
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        // Crée un chemin de fichier où l'image sera sauvegardée
        const filePath = path.resolve(imagesDir, filename);

        // Sauvegarde l'image dans le répertoire 'images'
        fs.writeFileSync(filePath, buffer);
        
        // Retourner une réponse positive
        res.status(200).json({ message: `Image téléchargée avec succès sous le nom : ${filename}`, filename });
    } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
        res.status(500).json({ error: 'Erreur lors du téléchargement de l\'image' });
    }
});

// Lancer le serveur Express
app.listen(port, () => {
    console.log(`Serveur démarré à l'adresse http://localhost:${port}`);
});
