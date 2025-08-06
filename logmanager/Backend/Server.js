import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
//import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;
app.use(cors());
app.get('/api/folder/:folderName/logs', (req, res) => {
    const logsFolder = "C:/Users/Justi/Desktop/Logs"
    const folderPath = path.join(logsFolder, req.params.folderName);
    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(500).json({ error: 'Cannot read folder' });
        // gets just the .txt files name to display on the page, would need another request to donwload the given file
        // This is better because it means we wont have to load all the logs files every time we open the page as some of these could be very large.
        const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

        
    

        res.json(txtFiles);
    });
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