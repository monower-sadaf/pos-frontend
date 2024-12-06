"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="w-full min-h-[60vh] lg:h-screen flex flex-col justify-center items-center bg-slate-100">
      <h1 className="text-3xl text-primary text-center">
        Page Not Found.
      </h1>
      <button
        className="bg-green-500 text-white  px-4 py-2 rounded-md mt-3"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </section>
  );
};
export default NotFound;