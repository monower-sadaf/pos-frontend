

import { cookies } from "next/headers";
import ProductEditContainer from "@/app/_component/ProductEditContainer/ProductEditContainer";
import { getSingleProduct } from "@/app/_api";


const Home = async ({params: { id }, searchParams}) => {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    const token = userCookie ? JSON.parse(userCookie.value).token : null;


    const data = await getSingleProduct(id,token).catch((err) => console.log(err));


    return (
        <ProductEditContainer data={data} token={token} />
    )
};

export default Home;