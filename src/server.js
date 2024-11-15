const express = require('express');
const multer = require('multer');
const { create } = require('ipfs-http-client');
const ethers = require('ethers');
const app = express();

// IPFS client setup
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// File upload middleware
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.post('/api/upload', upload.single('photo'), async (req, res) => {
    try {
        // Upload to IPFS
        const result = await ipfs.add(req.file.buffer);

        // Submit to blockchain
        // ... contract interaction code ...

        res.json({ success: true, imageHash: result.path });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/contestants', async (req, res) => {
    // Fetch current contestants from blockchain
    // ... contract interaction code ...
}); 