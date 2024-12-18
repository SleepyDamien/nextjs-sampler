// /api/gameApi/idle.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      try {
      // simulate player in current state
      let player = req.body.player;

          // Simulate idle gold gain
      // allow for gold scaleing to also be based on level.
      const idleGold = Math.floor(Math.random() * 10 * player.level);
      player.gold += idleGold;

          res.status(200).json(player);

      } catch (error) {
        console.error('Error handling fight:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}