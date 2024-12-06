'use client';

import { useState } from "react";
import { proceeedSale } from "@/app/_api";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

const MIN_STOCK = 5;

const PosContainer = ({ data }) => {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");


    const addToCart = (product) => {
        if (product.stock - 1 < MIN_STOCK) {
            setMessage(
                `${product.name} cannot be added. Stock will fall below the minimum stock level of ${MIN_STOCK}.`
            );
            return;
        }

        setProducts(products.filter((item) => item.id !== product.id));

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

    const removeFromCart = (productId) => {
        const product = cart.find((item) => item.id === productId);
        setCart(cart.filter((item) => item.id !== productId));

        setProducts([...products, { ...product, stock: product.stock }]);
    };

    const updateQuantity = (productId, quantity) => {
        const product = products.find((item) => item.id === productId);

        if (product && product.stock - quantity < MIN_STOCK) {
            setMessage(
                `${product.name} cannot have its quantity updated. Stock will fall below the minimum stock level of ${MIN_STOCK}.`
            );
            return;
        }

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

    const processSale = async () => {
        if (cart.length === 0) {
            setMessage("Your cart is empty.");
            return;
        }

        const saleData = cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            amount: item.price * item.quantity,
            discount: item.discount,
            trade_offer_min_qty: item.trade_offer_min_qty,
            trade_offer_get_qty: item.trade_offer_get_qty,
        }));

        const payload = { items: saleData };

        try {
            const response = await proceeedSale(payload, token).catch((err) => console.log(err));

            if (response.status == true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setCart([]);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (err) {
            setMessage("An error occurred while processing the sale.");
            console.error(err);
        }
    };

    const HandleSearch = (term) => {
        const filteredProducts = data.filter(
            (product) =>
                product.name.toLowerCase().includes(term.toLowerCase()) &&
                product.stock > MIN_STOCK &&
                !cart.some((cartItem) => cartItem.id === product.id)
        );
        setProducts(filteredProducts);
    };

    const ClearSearch = () => {
        setSearchTerm('');
        setProducts([]);
        setMessage('');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
            {/* {message && <p className="mt-4 text-red-500">{message}</p>} */}

            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search for products"
                    value={searchTerm}
                    onChange={(e) => {
                        const term = e.target.value;
                        setSearchTerm(term);
                        HandleSearch(term);

                        if (term?.length == 0) {
                            ClearSearch();
                        }
                    }}
                    className="border rounded p-2 w-3/4"
                />

                {
                    searchTerm.length > 0 && (
                        <button onClick={ClearSearch} className="bg-red-500 text-white px-4 py-2 rounded">
                            Clear
                        </button>
                    )
                }
            </div>

            {products.length > 0 ? (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Search Results</h2>
                    <ul>
                        {products.map((product) => (
                            <li onClick={() => addToCart(product)} key={product.id} className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100">
                                <span>{product.name} - ${parseFloat(product.price).toFixed(2)}</span>
                                <span className="ml-4 text-sm text-gray-500">
                                    Stock: {product.stock}
                                </span>
                                <div className="ml-4 text-sm text-gray-500">
                                    {product.discount && (
                                        <span className="text-green-500">Discount: {product.discount}%</span>
                                    )}
                                    {product.trade_offer_min_qty && product.trade_offer_get_qty && (
                                        <span className="text-blue-500 ml-2">
                                            Buy {product.trade_offer_min_qty} Get {product.trade_offer_get_qty} Free
                                        </span>
                                    )}
                                </div>
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
            ) : (
                <p className="text-gray-500 text-center">No products found.</p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="">
                    <h2 className="text-lg font-semibold mb-2">Cart</h2>
                    {cart.length > 0 ? (
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Price</th>
                                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                    <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                                    <th className="border border-gray-300 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">${parseFloat(item.price).toFixed(2)}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) => {
                                                    if(item.stock >= e.target.value) {
                                                        updateQuantity(item.id, e.target.value);
                                                    }else {
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Oops...',
                                                            text: 'Stock Finished.',
                                                        })
                                                    }
                                                }
                                                }
                                                className="border rounded p-1 w-16 text-center"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">Your cart is empty.</p>
                    )}
                </div>

                <div className="">
                    <div className="flex flex-col items-end mb-4">
                        <h2 className="text-lg font-semibold mb-2">Summary</h2>
                        <p>Total Before Discounts: ${totalBeforeDiscount.toFixed(2)}</p>
                        <p>Total Discounts: -${totalDiscount.toFixed(2)}</p>
                        <p className="font-bold">Final Total: ${finalTotal.toFixed(2)}</p>
                    </div>

                    {
                        finalTotal > 0 && (
                            <div className="flex justify-end">
                                <button
                                    onClick={processSale}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Process Sale
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default PosContainer;