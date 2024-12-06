

import { cookies } from "next/headers";
import ServiceCreateContainer from "@/app/_component/ProductCreateContainer/ProductCreateContainer";

const Home = () => {

    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    const token = userCookie ? JSON.parse(userCookie.value).token : null;


    return (
        <ServiceCreateContainer token={token} />
    )
};

export default Home;