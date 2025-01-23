import { useState } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import styles from '@styles/shopmodules/Cart.module.css';

export default function Cart({ cartItems, onRemoveFromCart, onClearCart }) {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity), 0).toFixed(2);
    };

    return (
        <div className={styles.cartContainer}>
            <span
                className={styles.cartTitle}
            >
                Your Cart
            </span>
            {cartItems.length === 0 ? (
                <p>Start adding items when you're ready.</p>
            ) : (
                <>
                    <ul className={styles.cartList}>
                        {cartItems.map((item, index) => (
                            <li 
                                key={index} 
                                className={styles.cartItem}
                            >
                                <div className={styles.cartItemDetails}>
                                    <strong>{item.name}</strong>
                                    <span>{item.price}</span>
                                    <span>Qty: {item.quantity}</span>
                                </div>
                                <button 
                                    onClick={() => onRemoveFromCart(item)} 
                                    className={styles.removeButton}
                                >
                                    <RiDeleteBin5Fill />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.cartSummary}>
                        <strong>Total: <br />
                        ${calculateTotal()}</strong>
                    </div>
                    <button 
                        onClick={onClearCart} 
                        className={styles.clearButton}
                        >
                            Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}