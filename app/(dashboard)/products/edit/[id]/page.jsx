import ProductEditContainer from "@/app/_component/ProductEditContainer/ProductEditContainer";
import { getSingleProduct } from "@/app/_api";
import { getUserToken } from "@/lib/getCookie";


const Home = async ({params: { id }}) => {
    const token = getUserToken();
    const data = await getSingleProduct(id,token).catch((err) => console.log(err));

    return (
        <ProductEditContainer data={data} token={token} />
    )
};

export default Home;