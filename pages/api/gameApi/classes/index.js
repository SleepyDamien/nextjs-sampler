export default function handler(req, res) {
    const classStats = {
        warrior: {
            className: "Warrior",
            attack: 150,
            defense: 150,
            speed: 100,
            health: 100,
        },
        mage: {
            className: "Mage",
            magic: 200,
            defense: 70,
            speed: 80,
            health: 100,
        },
        rogue: {
            className: "Rogue",
            attack: 100,
            defense: 80,
            speed: 150,
            health: 125,
        },
    };

    res.status(200).json(classStats);
}
