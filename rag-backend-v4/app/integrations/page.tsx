"use client";

import { AuthenticatedConnectUser, paragon } from "@useparagon/connect";
import Login from "@/app/components/login/login";
import useSessionStorage from "@/app/hooks/useSessionStorage";
import { useEffect, useState } from "react";
import { IIntegrationMetadata } from "@/node_modules/@useparagon/connect/dist/src/entities/integration.interface";
import Header from "@/app/components/header";

export default function Page(){
    const jwt = useSessionStorage("jwt");
    const [user, setUser] = useState<AuthenticatedConnectUser | null>(null);
    const [integrationMetadata, setIntegrationMetadata] = useState<Array<IIntegrationMetadata>>([]);

    useEffect(() => {
        if(sessionStorage.getItem("jwt")){
            paragon.authenticate(process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID ?? "", sessionStorage.getItem("jwt") ?? "");
            const usr = paragon.getUser();
            if(usr.authenticated){
                setUser(usr);
            }
        }
    }, []);

    useEffect(() => {
        console.log("hit")
        setIntegrationMetadata(paragon.getIntegrationMetadata());
    }, [user]);

    console.log(user);

    if(user == null && jwt == ""){
        return (
          <main className="h-screen w-screen flex justify-center items-center background-gradient">
            <Header />
            <Login setUser={setUser} />
          </main>
        );
    }else {
      if(user == null){
        return(<div>LOADING...</div>)
      }
      else {
            return (
            <main className="h-screen w-screen flex flex-col space-y-32 justify-center items-center background-gradient">
              <Header />
            <div className={"flex flex-col p-4 space-y-2 border-2 border-gray-300 rounded-xl w-1/4 "}>
            <h1 className={"text-2xl font-mono font-bold"}>Integrations:</h1>
            {integrationMetadata.map((integration: IIntegrationMetadata) => {
              const integrationEnabled = user.authenticated && user.integrations[integration.type]?.enabled;
              return (
                <div key={integration.type}
                     className={"flex space-x-2 border-2 border-gray-300 rounded-xl p-4 items-center justify-between"}>
                  <div className={"flex grow space-x-2"}>
                    <img src={integration.icon} style={{ maxWidth: "30px" }} />
                    <p>{integration.name}</p>
                  </div>
                  <button className={"text-white bg-blue-700 p-2 rounded-xl hover:bg-blue-400"}
                          onClick={() => paragon.connect(integration.type, {})}>
                    {integrationEnabled ? "Manage" : "Enable"}
                  </button>
                </div>
              );
            })}
          </div>
    </main>
    )
      ;
    }
    }
    }