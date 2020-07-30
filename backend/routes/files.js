const { Router} = require('express');
const { unlink } = require('fs-extra');
const path = require('path');
const router = Router();

const File = require('../models/file');

router.get('/', async (req, res) => {
    const files = await File.find();
    res.json(files);
});

router.post('/', async (req, res) => {
    const { title, author, description } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newFile = new File({ title, author, description, imagePath });
    await newFile.save();
    res.json({ message: 'File saved' });
});

router.delete('/:id', async (req, res) => {
    const file = await File.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + file.imagePath));
    res.json({ message: 'File Deleted' });
});

module.exports = router;