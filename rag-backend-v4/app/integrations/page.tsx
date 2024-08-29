"use client";

import { AuthenticatedConnectUser, paragon } from "@useparagon/connect";
import Login from "@/app/components/login/login";
import useSessionStorage from "@/app/hooks/useSessionStorage";
import { useEffect, useState } from "react";
import { IIntegrationMetadata } from "@/node_modules/@useparagon/connect/dist/src/entities/integration.interface";

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
          <Login setUser={setUser}/>
        );
    }else {
        if(user == null){
            return(<div>LOADING...</div>)
        }
        else {
            return (
                  <div className={"flex flex-row space-x-10 align-middle"}>
                      {integrationMetadata.map((integration: IIntegrationMetadata) => {
                          const integrationEnabled = user.authenticated && user.integrations[integration.type]?.enabled;
                          return (
                            <div key={integration.type} className={"m-4"}>
                                <img src={integration.icon} style={{maxWidth: "30px"}}/>
                                <p>{integration.name}</p>

                                <button onClick={() => paragon.connect(integration.type, {})}>
                                    {integrationEnabled ? "Manage" : "Enable"}
                                </button>
                            </div>
                          );
                      })}
                  </div>
            );
        }
    }
}