import Head from 'next/head'
import Header from '@components/shopapp/Header'
import Footer from '@components/shopapp/Footer'
import { useState, useEffect, useRef } from 'react';
import styles from '@styles/Home.module.css'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { SiQuicklook } from "react-icons/si";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";



export default function ShopAppMain() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showQuicklook, setShowQuicklook] = useState(false);
    const [quicklookItem, setQuicklookItem] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [allItems, setAllItems] = useState([]); // Store all items to reset filteredItems when needed
    const [sortOption, setSortOption] = useState('name'); // State for sorting
    const itemsPerPage = 5;

    const inputRef = useRef(null); // Reference to the input element

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/techProducts/products');
                const data = await response.json();
                setAllItems(data); // Store all items here
                setFilteredItems(data); // Initialize filteredItems with all products
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle the search events
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            // If the search term is cleared, reset to all items
            setFilteredItems(allItems);
            setShowSuggestions(false);
            setCurrentPage(1); // Reset page when clearing the search
            return;
        }

        // Filter items based on the current search term
        const filtered = allItems.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );

        // Update filtered items and show suggestions
        setFilteredItems(filtered);
        setShowSuggestions(true);
        setCurrentPage(1); // Reset page on new search term
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
        setFilteredItems([suggestion]); // Show only the selected suggestion
        setShowSuggestions(false);
        setCurrentPage(1); // Reset page on suggestion click
    };

    // Handle quicklook click
    const handleQuicklook = (item) => {
        setQuicklookItem(item);
        setShowQuicklook(true);
    };

    // Close suggestions when the input field loses focus
    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false); // Delay to allow click event on suggestions
        }, 100); // Optional delay for better UX
    };

    // Function to handle sorting
    const handleSortChange = (event) => {
        const option = event.target.value;
        setSortOption(option);
    };

    // Sort filtered items based on selected sort option
    const sortItems = (items) => {
        if (sortOption === 'price') {
            return items.sort((a, b) => {
                // Parse price as float for sorting
                const priceA = parseFloat(a.price.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
                const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ''));
                return priceA - priceB;
            });
        } else if (sortOption === 'name') {
            return items.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically (A-Z)
        }
        return items; // Default: no sorting, return items as they are
    };

    // Paginate the filtered and sorted items (5 items per page)
    const paginateItems = (items, page, itemsPerPage) => {
        const startIndex = (page - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    // Handle page change (next and previous buttons)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Apply sorting and pagination
    const sortedItems = sortItems(filteredItems);
    const paginatedItems = paginateItems(sortedItems, currentPage, itemsPerPage);
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title> TechDragon | Search Products</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Find your product" />
            <div className={styles.searchBarContainer}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for your product"
                    value={searchTerm}
                    onChange={handleSearch}
                    onBlur={handleBlur} // Handle blur event
                    className={styles.searchInput}
                />
                {showSuggestions && searchTerm && (
                    <div className={styles.autocompleteSuggestions}>
                        <ul>
                            {filteredItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={styles.suggestionItem}
                                    onClick={() => handleSuggestionClick(item)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Sorting Dropdown */}
            <div className={styles.sortContainer}>
                <label htmlFor="sortOptions">Sort by: </label>
                <select
                    id="sortOptions"
                    value={sortOption}
                    onChange={handleSortChange}
                    className={styles.sortSelect}
                >
                    <option value="name">Alphabetical</option>
                    <option value="price">Price: Low to High</option>
                </select>
            </div>

            {/* Quicklook Modal */}
            {showQuicklook && quicklookItem && (
                    <div className={styles.quicklookStyling}>
                                        <img
                                        src={quicklookItem.image}
                                        alt={quicklookItem.name}
                                        className={styles.productImage}
                                        />
                                        <div className={styles.productDetails}>
                                        <strong>{quicklookItem.name}</strong>
                                        <div className={styles.price}>{quicklookItem.price}</div>
                                        <div className={styles.promoCode}>
                                            Promo Code: <strong suppressHydrationWarning>{quicklookItem.promoCode}</strong>
                                        </div>
                                           <div>
                                               <TiStarFullOutline />
                                               <TiStarFullOutline />
                                               <TiStarFullOutline />
                                               <TiStarFullOutline />
                                               <TiStarHalfOutline />
                                               <span><strong>({ Math.floor(Math.random() * 5 ) })</strong></span>
                                           </div>
                                        </div> 
                    </div>
                )}

            <div className={styles.productList}>
                <ul>
                    {paginatedItems.length > 0 ? (
                        paginatedItems.map((item) => (
                            <li key={item.id} className={styles.productItem}>
                                <div className={styles.product}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={styles.productImage}
                                    />
                                    <div className={styles.productDetails}>
                                        <strong>{item.name}</strong>
                                        <div className={styles.price}>{item.price}</div>
                                        <div className={styles.promoCode}>
                                            Promo Code: <strong suppressHydrationWarning>{item.promoCode}</strong>
                                        </div>
                                           <div>
                                               <TiStarFullOutline />
                                               <TiStarFullOutline />
                                               <TiStarFullOutline />
                                               <TiStarFullOutline />
                                               <TiStarHalfOutline />
                                               <span><strong>({ Math.floor(Math.random() * 5 ) })</strong></span>
                                           </div>
                                        <div onClick={() => handleQuicklook(item)}> 
                                           Quicklook <SiQuicklook />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No results found</li>
                    )}
                </ul>
            </div>

            {/* Pagination controls */}
            {filteredItems.length > itemsPerPage && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoMdArrowRoundBack />
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <IoMdArrowRoundForward />
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
}
