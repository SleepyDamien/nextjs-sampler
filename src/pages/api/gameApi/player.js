// api/gameApi/player.js

// Base player data
let player = {
    level: 1,
    health: 100,
    gold: 0,
    exp: 0,
    classes: {
        warrior: {
            baseDamage: 15,
            damageMultiplier: 2,
            baseDefense: 10,
            defenseMultiplier: 3,
            baseMana: 0,
            manaMultiplier: 0, // Warriors don't use mana
        },
        mage: {
            baseDamage: 10,
            damageMultiplier: 1.5,
            baseDefense: 5,
            defenseMultiplier: 1,
            baseMana: 20,
            manaMultiplier: 5,
        },
        rogue: {
            baseDamage: 12,
            damageMultiplier: 2.5,
            baseDefense: 7,
            defenseMultiplier: 2,
            baseMana: 10,
            manaMultiplier: 3,
        },
    },
};

// Function to calculate scaled stats
function calculateStats(level, playerClass) {
    const classStats = player.classes[playerClass];
    if (!classStats) {
        throw new Error("Invalid class selected.");
    }

    return {
        damage: classStats.baseDamage + level * classStats.damageMultiplier,
        defense: classStats.baseDefense + level * classStats.defenseMultiplier,
        mana: classStats.baseMana + level * classStats.manaMultiplier,
    };
}

export default function handler(req, res) {
    const { level, className } = req.query; // Accept level and class via query parameters

    if (!className || !player.classes[className]) {
        return res.status(400).json({ error: "Invalid class name." });
    }

    const stats = calculateStats(parseInt(level || player.level, 10), className);

    res.status(200).json({
        level: parseInt(level || player.level, 10),
        class: className,
        stats,
    });
}