import Head from 'next/head'
import Header from '@components/shopapp/Header'
import Footer from '@components/shopapp/Footer'
import { useState, useEffect } from 'react';
import styles from '@styles/Home.module.css'

export default function ShopAppMain() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // For loading state
    const [resetResults, setResetResults] = useState(true);
    const itemsPerPage = 5; // Set to 5 for now

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/techProducts/products');
                const data = await response.json();
                setFilteredItems(data); // Set the fetched items as initial filteredItems
                setLoading(false);
                setResetResults(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
                setResetResults(false);
            }
        };

        fetchProducts();
    }, [resetResults]); // Only run once when the component mounts

    // Handle the search events
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setShowSuggestions(false);
            setFilteredItems(filteredItems); // Reset to all items when search is cleared
            setCurrentPage(1); // Reset page on empty search
            setResetResults(true);
            return;
        }

        const filtered = filteredItems.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
        setShowSuggestions(true);
        setCurrentPage(1); // Reset page on new search
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
        setFilteredItems([suggestion]);
        setShowSuggestions(false);
        setCurrentPage(1); // Reset page on suggestion click
    };

    // Paginate the filtered items (5 items per page)
    const paginateItems = (items, page, itemsPerPage) => {
        const startIndex = (page - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    // Handle page change (next and previous buttons)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedItems = paginateItems(filteredItems, currentPage, itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>ShopApp | Search Products</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Find your product" />
            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    placeholder="Search for your product"
                    value={searchTerm}
                    onChange={handleSearch}
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
                        {"<"}
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {">"}
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
}