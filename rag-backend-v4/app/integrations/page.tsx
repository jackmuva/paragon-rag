import { AuthenticatedConnectUser, paragon } from "@useparagon/connect";
import styles from "../styles/Integrations.module.css";
import useParagonAuth from "@/app/hooks/useParagonAuth";
import Login from "@/app/components/login/login";

function Page(){
    const { user } = useParagonAuth();

    if(user == null && sessionStorage.getItem("jwt") == null){
        return (
            <Login/>
          // <div>Login Placeholder</div>
        );
    }else {
        if(user == null){
            return(<div>LOADING...</div>)
        }
        else {
            return (
                <div>
                    {paragon.getIntegrationMetadata().map((integration) => {
                        const integrationEnabled = user.authenticated && user.integrations[integration.type]?.enabled;
                        return (
                            <div key={integration.type} className={styles.row}>
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

export default Page;
