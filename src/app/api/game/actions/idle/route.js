// /api/game/actions/idle
export async function POST(request) {
    try {

            // simulate player in current state
            let player = request.body.player;

            // Simulate idle gold gain
            // allow for gold scaleing to also be based on level.
            const idleGold = Math.floor(Math.random() * 10 * player.level);
            player.gold += idleGold;

            res.status(200).json(player);

        } catch (error) {
            console.error('Error handling fight:', error);
            return Response.status(500).json({ message: 'Internal server error' });
        }
}