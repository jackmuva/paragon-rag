import { useEffect, useState } from "react";
import { paragon, AuthenticatedConnectUser, SDK_EVENT } from '@useparagon/connect';

export async function getParagonUserToken(username: string, password: string): Promise<string> {
  let response = "";
  const user = {
    usernameOrEmail: username,
    password: password
  }

  response = await fetch(process.env.NEXT_PUBLIC_AUTH_BACKEND ?? "", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(function (data) {
    data.json().then((response) => {
      if (response.accessToken) {
        paragon.authenticate(process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID ?? "", response.accessToken);
        sessionStorage.setItem("jwt", response.accessToken);
        return response.accessToken;
      } else {
        return "";
      }
    })
  }) ?? "";
  return response;
}

export default function useParagonAuth(): {
  user?: AuthenticatedConnectUser;
  error?: Error;
} {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthenticatedConnectUser | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    // getParagonUserToken().then(setToken).catch(setError);
    setToken(sessionStorage.getItem("jwt"));
  }, []);

  // Listen for account state changes
  useEffect(() => {
    const listener = () => {
      const authedUser = paragon.getUser();
      if (authedUser.authenticated) {
        setUser({ ...authedUser });
      }
    };
    paragon.subscribe(SDK_EVENT.ON_INTEGRATION_INSTALL, listener);
    paragon.subscribe(SDK_EVENT.ON_INTEGRATION_UNINSTALL, listener);
    return () => {
      paragon.unsubscribe(SDK_EVENT.ON_INTEGRATION_INSTALL, listener);
      paragon.unsubscribe(SDK_EVENT.ON_INTEGRATION_UNINSTALL, listener);
    };
  }, []);

  useEffect(() => {
    if (token && !error) {
      paragon
        .authenticate(process.env.NEXT_PARAGON_PROJECT_ID ?? "", token)
        .then(() => {
          const authedUser = paragon.getUser();
          if (authedUser.authenticated) {
            setUser(authedUser);
          }
        })
        .catch(setError);
    }
  }, [token, error]);

  return { user, error };
}