


import Link from "next/link";
import ServiceCreateContainer from "@/app/_component/ServiceCreateContainer/ServiceCreateContainer";

const Home = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h3>Add New Product</h3>

                <Link href={
                    {
                        pathname: '/products'
                    }
                } shallow>
                    Back
                </Link>
            </div>

            <ServiceCreateContainer />
        </div>
    )
};

export default Home;