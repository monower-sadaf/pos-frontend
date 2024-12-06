'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { updateProduct } from "@/app/_api";

const ProductEditContainer = ({ data, token }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: data.name,
        price: data.price,
        stock: String(data.stock),
        trade_offer_min_qty: data.trade_offer_min_qty ?? '',
        trade_offer_get_qty: data.trade_offer_get_qty ?? '',
        discount: data.discount ?? '',
        discount_or_trade_offer_start_date: data.discount_or_trade_offer_start_date ?? '',
        discount_or_trade_offer_end_date: data.discount_or_trade_offer_end_date ?? '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'discount' && value) {
            setFormData((prev) => ({
                ...prev,
                trade_offer_min_qty: '',
                trade_offer_get_qty: '',
            }));
        }
        if ((name === 'trade_offer_min_qty' || name === 'trade_offer_get_qty') && value) {
            setFormData((prev) => ({
                ...prev,
                discount: '',
            }));
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.price) newErrors.price = 'Price is required.';
        if (!formData.stock) newErrors.stock = 'Stock is required.';
        if (formData.discount && formData.trade_offer_min_qty) {
            newErrors.discount = 'Either a discount or a trade offer is required.';
            newErrors.trade_offer_min_qty = 'Either a discount or a trade offer is required.';
        }
        if (parseInt(formData.stock) < 6) newErrors.stock = 'Stock must be greater than 5.'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await updateProduct(data.id, formData, token).catch((err) => console.log(err));

            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product updated successfully!',
                });
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update product',
                });
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Update Product</h1>
                <Link href={
                    {
                        pathname: '/products'
                    }
                } shallow className="bg-red-500 text-white px-4 py-2 rounded">
                    Back
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium text-sm after:content-['_*'] after:text-red-500">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label className="block font-medium text-sm after:content-['_*'] after:text-red-500">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter product price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.price ? 'border-red-500' : 'border-gray-300'
                            }`}
                        required
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>
                <div>
                    <label className="block font-medium text-sm after:content-['_*'] after:text-red-500 ">
                        Stock <span className="text-xs text-gray-500">(Minimum Stock Quantity is 5.)</span>
                    </label>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Enter stock quantity"
                        value={formData.stock}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.stock ? 'border-red-500' : 'border-gray-300'
                            }`}
                        required
                    />
                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                </div>
                <div>
                    <label className="block font-medium text-sm">Discount (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="discount"
                        placeholder="Enter discount percentage"
                        value={formData.discount}
                        onChange={handleChange}
                        disabled={formData.trade_offer_min_qty || formData.trade_offer_get_qty}
                        className={`w-full border rounded p-2 ${errors.discount ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
                </div>
                <div>
                    <label className="block font-medium text-sm">Trade Offer Minnimum Quantity</label>
                    <input
                        type="number"
                        name="trade_offer_min_qty"
                        placeholder="Enter minimum quantity for trade offer"
                        value={formData.trade_offer_min_qty}
                        onChange={handleChange}
                        disabled={formData.discount}
                        className={`w-full border rounded p-2 ${errors.trade_offer_min_qty ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.trade_offer_min_qty && (
                        <p className="text-red-500 text-sm">{errors.trade_offer_min_qty}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium text-sm">Trade Offer Get Quantity</label>
                    <input
                        type="number"
                        name="trade_offer_get_qty"
                        placeholder="Enter quantity received for trade offer"
                        value={formData.trade_offer_get_qty}
                        onChange={handleChange}
                        disabled={formData.discount}
                        className={`w-full border rounded p-2 ${errors.trade_offer_get_qty ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.trade_offer_get_qty && (
                        <p className="text-red-500 text-sm">{errors.trade_offer_get_qty}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium text-sm">Discount/Trade Offer Start Date</label>
                    <input
                        type="datetime-local"
                        name="discount_or_trade_offer_start_date"
                        value={formData.discount_or_trade_offer_start_date}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.discount_or_trade_offer_start_date
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
                    <label className="block font-medium text-sm">Discount/Trade Offer End Date</label>
                    <input
                        type="datetime-local"
                        name="discount_or_trade_offer_end_date"
                        value={formData.discount_or_trade_offer_end_date}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.discount_or_trade_offer_end_date
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
                <div className="lg:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductEditContainer;