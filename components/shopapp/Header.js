import { useState } from 'react';
import { GiWyvern } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import styles from '@styles/shopmodules/Header.module.css';
import Cart from '@components/shopapp/cart/Cart'; // Import the Cart component


export default function Header({ cartItems, onRemoveFromCart, onClearCart }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false); // For mobile menu
    const [showCart, setShowCart] = useState(false); // State for showing the cart

    // Toggle dropdown menu visibility
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Toggle mobile menu visibility
    const toggleMobileMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
       <header className={styles.header}>
            <div className={styles.navbar}>
                {/* Logo in the center */}
                <div className={styles.logo}>
                    <a href="/shopapp"><GiWyvern /> TechDragon</a>
                </div>

                {/* Right section with dropdown and cart */}
                <div className={styles.rightSection}>
                    {/* Cart Toggle Button */}
                    <button 
                        className={styles.cartButton} 
                        onClick={() => setShowCart(!showCart)}
                    >
                        {showCart ? <FiShoppingCart />
                                  : (<><FiShoppingCart/>
                                        {cartItems.length == 0 
                                            ? '' 
                                            : <span className={styles.cartItemCount}>{cartItems.length}</span>
                                        }
                                     </>)}
                    </button>
                </div>
            </div>

            {/* Cart Component */}
            {showCart && (
                <Cart 
                    cartItems={cartItems} 
                    onRemoveFromCart={onRemoveFromCart} 
                    onClearCart={onClearCart} 
                />
            )}
        </header>
    );
}
