export default function handler(req, res) {
    // The product list data
    const items = [
        { id: 1, image: "https://dummyimage.com/100/000000/ffffff.png&text=MacBook", name: "MacBook Pro 16-inch", price: "$2,499.00", promoCode: generatePromoCode() },
        { id: 2, image: "https://dummyimage.com/100/000000/ffffff.png&text=Surface", name: "Microsoft Surface Laptop 4", price: "$1,299.00", promoCode: generatePromoCode() },
        { id: 3, image: "https://dummyimage.com/100/000000/ffffff.png&text=DellXPS", name: "Dell XPS 13", price: "$1,199.00", promoCode: generatePromoCode() },
        { id: 4, image: "https://dummyimage.com/100/000000/ffffff.png&text=Lenovo", name: "Lenovo ThinkPad X1 Carbon", price: "$1,399.00", promoCode: generatePromoCode() },
        { id: 5, image: "https://dummyimage.com/100/000000/ffffff.png&text=HP", name: "HP Spectre x360", price: "$1,399.99", promoCode: generatePromoCode() },
        { id: 6, image: "https://dummyimage.com/100/000000/ffffff.png&text=Asus", name: "Asus ROG Strix G15", price: "$1,749.00", promoCode: generatePromoCode() },
        { id: 7, image: "https://dummyimage.com/100/000000/ffffff.png&text=Razer", name: "Razer Blade 15", price: "$1,899.00", promoCode: generatePromoCode() },
        { id: 8, image: "https://dummyimage.com/100/000000/ffffff.png&text=Alienware", name: "Alienware m15 R6", price: "$2,099.00", promoCode: generatePromoCode() },
        { id: 9, image: "https://dummyimage.com/100/000000/ffffff.png&text=Chromebook", name: "Google Pixelbook Go", price: "$649.00", promoCode: generatePromoCode() },
        { id: 10, image: "https://dummyimage.com/100/000000/ffffff.png&text=SurfaceGo", name: "Microsoft Surface Go 3", price: "$399.00", promoCode: generatePromoCode() },
        { id: 11, image: "https://dummyimage.com/100/000000/ffffff.png&text=MacMini", name: "Mac Mini M1", price: "$699.00", promoCode: generatePromoCode() },
        { id: 12, image: "https://dummyimage.com/100/000000/ffffff.png&text=IMac", name: "Apple iMac 24-inch", price: "$1,299.00", promoCode: generatePromoCode() },
        { id: 13, image: "https://dummyimage.com/100/000000/ffffff.png&text=Monitor", name: "LG UltraFine 5K Monitor", price: "$1,299.00", promoCode: generatePromoCode() },
        { id: 14, image: "https://dummyimage.com/100/000000/ffffff.png&text=Logitech", name: "Logitech MX Master 3 Mouse", price: "$99.99", promoCode: generatePromoCode() },
        { id: 15, image: "https://dummyimage.com/100/000000/ffffff.png&text=Kensington", name: "Kensington Expert Mouse", price: "$129.99", promoCode: generatePromoCode() },
        { id: 16, image: "https://dummyimage.com/100/000000/ffffff.png&text=Keychron", name: "Keychron K4 Wireless Keyboard", price: "$89.99", promoCode: generatePromoCode() },
        { id: 17, image: "https://dummyimage.com/100/000000/ffffff.png&text=Logitech", name: "Logitech G Pro X Gaming Headset", price: "$129.00", promoCode: generatePromoCode() },
        { id: 18, image: "https://dummyimage.com/100/000000/ffffff.png&text=SteelSeries", name: "SteelSeries Arctis 7 Wireless Headset", price: "$149.99", promoCode: generatePromoCode() },
        { id: 19, image: "https://dummyimage.com/100/000000/ffffff.png&text=Elgato", name: "Elgato Stream Deck", price: "$149.99", promoCode: generatePromoCode() },
        { id: 20, image: "https://dummyimage.com/100/000000/ffffff.png&text=HPPrinter", name: "HP Envy 6055e Printer", price: "$129.00", promoCode: generatePromoCode() },
        { id: 21, image: "https://dummyimage.com/100/000000/ffffff.png&text=Canon", name: "Canon PIXMA TR8620 Printer", price: "$179.99", promoCode: generatePromoCode() },
        { id: 22, image: "https://dummyimage.com/100/000000/ffffff.png&text=ExternalSSD", name: "Samsung T7 Portable SSD 1TB", price: "$129.99", promoCode: generatePromoCode() },
        { id: 23, image: "https://dummyimage.com/100/000000/ffffff.png&text=FlashDrive", name: "SanDisk Ultra 128GB USB 3.0", price: "$24.99", promoCode: generatePromoCode() },
        { id: 24, image: "https://dummyimage.com/100/000000/ffffff.png&text=ExternalHD", name: "Seagate 2TB Backup Plus", price: "$59.99", promoCode: generatePromoCode() },
        { id: 25, image: "https://dummyimage.com/100/000000/ffffff.png&text=GraphicsCard", name: "NVIDIA GeForce RTX 3080", price: "$699.99", promoCode: generatePromoCode() },
        { id: 26, image: "https://dummyimage.com/100/000000/ffffff.png&text=CPU", name: "AMD Ryzen 9 5900X", price: "$799.99", promoCode: generatePromoCode() },
        { id: 27, image: "https://dummyimage.com/100/000000/ffffff.png&text=RAM", name: "Corsair Vengeance LPX 16GB DDR4", price: "$79.99", promoCode: generatePromoCode() },
        { id: 28, image: "https://dummyimage.com/100/000000/ffffff.png&text=Motherboard", name: "MSI MAG B550 TOMAHAWK", price: "$139.99", promoCode: generatePromoCode() },
        { id: 29, image: "https://dummyimage.com/100/000000/ffffff.png&text=PowerSupply", name: "EVGA SuperNOVA 650 G5", price: "$109.99", promoCode: generatePromoCode() },
        { id: 30, image: "https://dummyimage.com/100/000000/ffffff.png&text=Case", name: "NZXT H510 Mid Tower", price: "$69.99", promoCode: generatePromoCode() },
    ];

    // Send a JSON response with the product data
    res.status(200).json(items);
}

// Simulate promo code generation
function generatePromoCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let promoCode = '';
    for (let i = 0; i < 8; i++) {
        promoCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return promoCode;
}
