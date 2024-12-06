"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="w-full min-h-[60vh] lg:h-screen flex flex-col justify-center items-center">
      <h1 className="text-20 lg:text-40 text-primary text-center">
        দুঃখিত, এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      <button
        className="text-primary border border-primary hover:bg-primary hover:text-white px-[18px] rounded-md mt-3"
        onClick={() => router.back()}
      >
        ফিরে যান
      </button>
    </section>
  );
};
export default NotFound;