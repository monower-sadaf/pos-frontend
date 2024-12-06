'use client';

import { useState } from "react";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ServiceCreateContainer = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        trade_offer_min_qty: '',
        trade_offer_get_qty: '',
        discount: '',
        discount_or_trade_offer_start_date: '',
        discount_or_trade_offer_end_date: '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '', // Clear error for the field on change
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({}); // Clear previous errors

        // Validate required fields locally
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.price) newErrors.price = 'Price is required.';
        if (!formData.stock) newErrors.stock = 'Stock is required.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('product create response: ', response);

            if (response.ok) {
                // toast.success('Product added successfully!');
                setMessage('Product added successfully!');
                setFormData({
                    name: '',
                    price: '',
                    stock: '',
                    trade_offer_min_qty: '',
                    trade_offer_get_qty: '',
                    discount: '',
                    discount_or_trade_offer_start_date: '',
                    discount_or_trade_offer_end_date: '',
                });

                router.push('/products');
            } else {
                // toast.error('Failed to add product.');
                const errorData = await response.json();
                if (errorData.errors) {
                    setErrors(errorData.errors);
                } else {
                    setMessage(`Error: ${errorData.message}`);
                }
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label className="block font-medium">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter product price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>
                <div>
                    <label className="block font-medium">
                        Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Enter stock quantity"
                        value={formData.stock}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.stock ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                </div>
                <div>
                    <label className="block font-medium">Trade Offer Min Qty</label>
                    <input
                        type="number"
                        name="trade_offer_min_qty"
                        placeholder="Enter minimum quantity for trade offer"
                        value={formData.trade_offer_min_qty}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.trade_offer_min_qty ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.trade_offer_min_qty && (
                        <p className="text-red-500 text-sm">{errors.trade_offer_min_qty}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Trade Offer Get Qty</label>
                    <input
                        type="number"
                        name="trade_offer_get_qty"
                        placeholder="Enter quantity received for trade offer"
                        value={formData.trade_offer_get_qty}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.trade_offer_get_qty ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.trade_offer_get_qty && (
                        <p className="text-red-500 text-sm">{errors.trade_offer_get_qty}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Discount (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="discount"
                        placeholder="Enter discount percentage"
                        value={formData.discount}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.discount ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
                </div>
                <div>
                    <label className="block font-medium">Discount/Trade Offer Start Date</label>
                    <input
                        type="datetime-local"
                        name="discount_or_trade_offer_start_date"
                        placeholder="Enter start date for discount or trade offer"
                        value={formData.discount_or_trade_offer_start_date}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.discount_or_trade_offer_start_date
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                    />
                    {errors.discount_or_trade_offer_start_date && (
                        <p className="text-red-500 text-sm">
                            {errors.discount_or_trade_offer_start_date}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Discount/Trade Offer End Date</label>
                    <input
                        type="datetime-local"
                        name="discount_or_trade_offer_end_date"
                        placeholder="Enter end date for discount or trade offer"
                        value={formData.discount_or_trade_offer_end_date}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${
                            errors.discount_or_trade_offer_end_date
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                    />
                    {errors.discount_or_trade_offer_end_date && (
                        <p className="text-red-500 text-sm">
                            {errors.discount_or_trade_offer_end_date}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
            {/* {message && <p className="mt-4 text-green-500">{message}</p>} */}
        </div>
    );
};

export default ServiceCreateContainer;
