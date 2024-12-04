const ProductContainer = ({ data }) => {
    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            {data && data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Stock</th>
                                <th className="border border-gray-300 px-4 py-2">Trade Offer</th>
                                <th className="border border-gray-300 px-4 py-2">Discount (%)</th>
                                <th className="border border-gray-300 px-4 py-2">Offer Dates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr
                                    key={product.id}
                                    className={`${
                                        product.stock <= 5 ? 'bg-red-100' : ''
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
                                        className={`border border-gray-300 px-4 py-2 text-center ${
                                            product.stock <= 5 ? 'text-red-600 font-bold' : ''
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
