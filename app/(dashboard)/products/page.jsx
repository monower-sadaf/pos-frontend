export const revalidate = 3600;

import ProductContainer from "@/app/_component/ProductContainer/ProductContainer";
import { getProducts } from "@/app/_api";
import { getUserToken } from "@/lib/getCookie";

const Home = async () => {
    const token = getUserToken();
    const data = await getProducts(token).catch((err) => console.log(err));

    return (
        <ProductContainer data={data} token={token} />
    )
};

export default Home;