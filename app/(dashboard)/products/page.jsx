export const revalidate = 3600;

import Link from "next/link";
import ProductContainer from "@/app/_component/ProductContainer/ProductContainer";
const Home = async () => {
    const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products').then((res) => res.json());



    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h3>
                    Products
                </h3>

                <Link href={
                    {
                        pathname: '/products/create'
                    }
                } shallow>
                    Add New
                </Link>
            </div>

            <ProductContainer data={data} />
        </div>
    )
};

export default Home;