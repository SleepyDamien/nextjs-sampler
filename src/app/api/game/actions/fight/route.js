export async function POST(request) {
    try {
            // Grab player 
            let player = request.body.player;

            // Simulate fight outcome
            // Multiply level times the result to assure scaling for the example
            const gainedExp = Math.floor(Math.random() * 10) + 1 * player.level;

            // Allow for no gold gain, simulate empty pockets of monster
            const gainedGold = Math.floor(Math.random() * 5) * player.level;

            const expCap = 100 * player.level;
            player.exp += gainedExp;
            player.gold += gainedGold;

            // Level up the player if they have enough experience
            if (player.exp >= expCap) {
                player.level += 1;
                player.exp -= expCap;
            }

            return Response.status(200).json(player);
        } catch (error) {
            console.error('Error handling fight:', error);
            return Response.status(500).json({ message: 'Internal server error' });
        }
}