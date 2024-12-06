'use client';
import { useEffect } from "react";
const Error = ({ error, reset }) => {
  useEffect(()=>{
    console.log(error)
  },[error]);
    return (
      <section className="min-h-screen w-full bg-white flex flex-col space-y-4 justify-center items-center">
        <h3 className="text-20 leading-[20.23px]">Something went wrong.</h3>
        <button
          onClick={() => reset()}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          রিফ্রেশ করুন
        </button>
      </section>
    );
};
export default Error;