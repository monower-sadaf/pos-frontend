export const revalidate = 3600;

import { cookies } from "next/headers";
import ProductContainer from "@/app/_component/ProductContainer/ProductContainer";
import { getProducts } from "@/app/_api";


const Home = async () => {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    const token = userCookie ? JSON.parse(userCookie.value).token : null;


    const data = await getProducts(token).catch((err) => console.log(err));



    return (
        <ProductContainer data={data} token={token} />
    )
};

export default Home;