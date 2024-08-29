import React, { FormEvent } from "react";
import { getParagonUserToken } from "@/app/hooks/useParagonAuth";

export default function Login(){

  const handleSubmit = async (e: FormEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);

    console.log(formData.get("email")?.toString() ?? "");
    // await getParagonUserToken(formData.get("email")?.toString() ?? "",
    //   formData.get("password")?.toString() ?? "");
  };


  return(
    <div className="mt-40 mx-[640px] place-self-center w-1/3 text-center flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl">
      <form onSubmit={handleSubmit} className="p-6 md:p-20">
        <h2 className="font-sans font-bold mb-2 text-lg">Log In</h2>
        <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
          Log in to your account to access your Paragon integrations
        </p>
        <input type="email" id="email"
               className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
               placeholder="Email"/>
        <input type="password" id="password"
               className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
               placeholder="Password" />
        <div>
          <button
            className="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            type="submit">Login
          </button>
        </div>
      </form>
    </div>
  );
}