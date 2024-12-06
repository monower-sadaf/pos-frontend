'use client';

import Link from "next/link";
import { deleteProduct } from "@/app/_api";
import Swal from "sweetalert2";

const ProductContainer = ({ data, token }) => {

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteProduct(id, token).catch((err) => console.log(err));

                if (response.status) {
                    Swal.fire(
                        'Deleted!',
                        'Product has been deleted.',
                        'success'
                    );

                    window.location.reload();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message,
                    });
                }


            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <section className="p-4">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 gap-4 lg:gap-0">
                <h1 className="text-2xl font-bold">Product List</h1>
                <div>
                    <Link href={
                        {
                            pathname: '/products/create'
                        }
                    } shallow className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Add New
                    </Link>
                </div>
            </div>
            {data && data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Stock</th>
                                <th className="border border-gray-300 px-4 py-2">Trade Offer</th>
                                <th className="border border-gray-300 px-4 py-2">Discount (%)</th>
                                <th className="border border-gray-300 px-4 py-2">Offer Dates</th>
                                <th className="border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr
                                    key={product.id}
                                    className={`${product.stock <= 5 ? 'bg-red-100' : ''
                                        } hover:bg-gray-50`}
                                >
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {product.id}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {product.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        ${parseInt(product.price).toFixed(2)}
                                    </td>
                                    <td
                                        className={`border border-gray-300 px-4 py-2 text-center ${product.stock <= 5 ? 'text-red-600 font-bold' : ''
                                            }`}
                                    >
                                        {product.stock}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {product.trade_offer_min_qty &&
                                            product.trade_offer_get_qty
                                            ? `Buy ${product.trade_offer_min_qty} Get ${product.trade_offer_get_qty}`
                                            : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {product.discount ? `${product.discount}%` : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {product.discount_or_trade_offer_start_date &&
                                            product.discount_or_trade_offer_end_date
                                            ? `${new Date(
                                                product.discount_or_trade_offer_start_date
                                            ).toLocaleDateString()} - ${new Date(
                                                product.discount_or_trade_offer_end_date
                                            ).toLocaleDateString()}`
                                            : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <Link href={{
                                            pathname: `/products/edit/${product.id}`
                                        }} shallow className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No products found.</p>
            )}
        </section>
    );
};

export default ProductContainer;
