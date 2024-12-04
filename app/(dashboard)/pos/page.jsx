export const revalidate = 3600;


import PosContainer from "@/app/_component/PosContainer/PosContainer";


const Home = async () => {

    const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products').then((res) => res.json());


    console.log('data: ', data);

    return (
        <PosContainer data={data} />
    )
};

export default Home;