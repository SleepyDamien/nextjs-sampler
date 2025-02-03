export default function handler(req, res) {
    res.status(200).json({
        buffs: [
            { name: "XP Boost", duration: 30, maxDuration: 30 },
            { name: "Gold Boost", duration: 20, maxDuration: 20 },
        ],
    });
}