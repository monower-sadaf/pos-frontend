'use client';

import { useState, useEffect } from "react";

const PosContainer = ({ data }) => {
    const [products, setProducts] = useState([]); // Filtered products for display
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");

    // Filter products in real time based on the search term
    useEffect(() => {
        const filteredProducts = data.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
    }, [searchTerm, data]);

    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (productId, quantity) => {
        setCart(
            cart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const calculateTotals = () => {
        let totalBeforeDiscount = 0;
        let totalDiscount = 0;
        let finalTotal = 0;

        cart.forEach((item) => {
            const subtotal = item.price * item.quantity;
            totalBeforeDiscount += subtotal;

            let discount = 0;
            if (item.discount) {
                discount = (item.discount / 100) * subtotal;
            }

            let tradeOfferDiscount = 0;
            if (item.trade_offer_min_qty && item.quantity >= item.trade_offer_min_qty) {
                const freeItems = Math.floor(item.quantity / item.trade_offer_min_qty) * item.trade_offer_get_qty;
                tradeOfferDiscount = freeItems * item.price;
            }

            totalDiscount += Math.max(discount, tradeOfferDiscount);
            finalTotal += subtotal - Math.max(discount, tradeOfferDiscount);
        });

        return { totalBeforeDiscount, totalDiscount, finalTotal };
    };

    const { totalBeforeDiscount, totalDiscount, finalTotal } = calculateTotals();

    const processSale = () => {
        if (cart.length === 0) {
            setMessage("Your cart is empty.");
            return;
        }

        // Simulated sale submission (replace with API call)
        setMessage("Sale processed successfully!");
        setCart([]); // Clear the cart
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
            {/* Product Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search for products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2 w-3/4"
                />
            </div>

            {/* Product Search Results */}
            {products.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Search Results</h2>
                    <ul>
                        {products.map((product) => (
                            <li
                                key={product.id}
                                className="flex justify-between items-center p-2 border-b"
                            >
                                <span>{product.name} - ${parseInt(product.price).toFixed(2)}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                >
                                    Add to Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Cart */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Cart</h2>
                {cart.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">${parseInt(item.price).toFixed(2)}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                updateQuantity(item.id, parseInt(e.target.value) || 1)
                                            }
                                            className="border rounded p-1 w-16 text-center"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
            </div>

            {/* Totals */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                <p>Total Before Discounts: ${totalBeforeDiscount.toFixed(2)}</p>
                <p>Total Discounts: -${totalDiscount.toFixed(2)}</p>
                <p className="font-bold">Final Total: ${finalTotal.toFixed(2)}</p>
            </div>

            {/* Process Sale Button */}
            <button
                onClick={processSale}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Process Sale
            </button>

            {/* Message */}
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default PosContainer;
