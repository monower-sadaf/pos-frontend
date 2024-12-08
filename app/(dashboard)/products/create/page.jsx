import ServiceCreateContainer from "@/app/_component/ProductCreateContainer/ProductCreateContainer";
import { getUserToken } from "@/lib/getCookie";

const Home = () => {
    const token = getUserToken();

    return (
        <ServiceCreateContainer token={token} />
    )
};

export default Home;