import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
//import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;
app.use(cors());
app.get('/api/folder/:folderName/logs', async (req, res) => {
    const folderName = req.params.folderName;
    const repoOwner = 'Yustin1999';
    const repoName = 'LogFiles';
    const branch = 'main';
    const folderPath = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/Logs/${folderName}?ref=${branch}`;
    try {
        const response = await fetch(folderPath);
        if (!response.ok) return res.status(500).json({ error: 'Cannot fetch folder from GitHub' });
        const files = await response.json();
        const txtFiles = files
            .filter(file => file.type === 'file' && path.extname(file.name).toLowerCase() === '.txt')
            .map(file => ({
                name: file.name,
                download_url: file.download_url
            }));
        res.json(txtFiles)
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Error fetching folder contents' });
    }
    
});
app.get('/api/folder/:folderName/:filename', (req, res) => {
    const logsFolder = "C:/Users/Justi/Desktop/Logs"
    const folderPath = path.join(logsFolder, req.params.folderName, req.params.filename);


    res.download(folderPath, req.params.filename, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    })
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});