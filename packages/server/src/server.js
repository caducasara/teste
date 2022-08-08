const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();

server.use(cors({
    origin: '*'
}));

server.get("/playlists", async (req, res) => {
    const { data } = await axios.get('http://localhost:3000/playlists');

    return res.json(data);
});

server.get("/album/:id", async (req, res) => {
    const { id } = req.params;
    const { data } = await axios.get('http://localhost:3000/playlists');

    const albums = data.flatMap(item => item.albums);
    const find = albums.find(album => album.id === Number(id));

    return res.json(find);
});

server.listen(4001, () => console.log('Server is running'));