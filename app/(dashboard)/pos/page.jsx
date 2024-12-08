export const revalidate = 3600;

import PosContainer from "@/app/_component/PosContainer/PosContainer";
import { getProducts } from "@/app/_api";
import { getUserToken } from "@/lib/getCookie";

const Home = async () => {
    const token = getUserToken();
    const data = await getProducts(token).catch((err) => console.log(err));


    return (
        <PosContainer data={data} />
    )
};

export default Home;