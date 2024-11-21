// api/gameApi/player.js

// Plug into a database for more robust saving.
let player = {
    level: 1,
    health: 100,
    gold: 0,
    exp: 0,
};

export default function handler(req, res) {
    res.status(200).json(player);
}