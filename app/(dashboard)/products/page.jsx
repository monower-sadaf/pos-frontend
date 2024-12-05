export const revalidate = 3600;

import { cookies } from "next/headers";
import Link from "next/link";
import ProductContainer from "@/app/_component/ProductContainer/ProductContainer";
import { getProducts } from "@/app/_api";


const Home = async () => {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    const token = userCookie ? JSON.parse(userCookie.value).token : null;

    
    const data = await getProducts(token).catch((err) => console.log(err));



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