export const revalidate = 3600;

import { cookies } from "next/headers";
import PosContainer from "@/app/_component/PosContainer/PosContainer";
import { getProducts } from "@/app/_api";

const Home = async () => {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    const token = userCookie ? JSON.parse(userCookie.value).token : null;

    const data = await getProducts(token).catch((err) => console.log(err));


    return (
        <PosContainer data={data} />
    )
};

export default Home;