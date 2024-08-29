import React, {useState} from "react";
import { getParagonUserToken } from "@/app/hooks/useParagonAuth";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id , value} = e.target;
    if(id === "email"){
      setEmail(value);
    }
    if(id === "password"){
      setPassword(value);
    }
  }

  const handleSubmit = async () => {
    await getParagonUserToken(email, password);
  };


  return(
    <div className="mt-40 mx-[640px] place-self-center w-1/3 text-center flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl">
      <div className="p-6 md:p-20">
        <h2 className="font-sans font-bold mb-2 text-lg">Log In</h2>
        <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
          Log in to your account to access your Paragon integrations
        </p>
        <input type="email" id="email"
               className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
               placeholder="Email" onChange={(e) => handleInputChange(e)}/>
        <input type="password" id="password"
               className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
               placeholder="Password"
               onChange={(e) => handleInputChange(e)}/>
        {errorMessage && <div className="text-red-700 my-2"> {errorMessage} </div>}
        <div>
          <button
            className="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            onClick={() => handleSubmit()} type="submit">Login
          </button>
        </div>
      </div>
    </div>
  );
}