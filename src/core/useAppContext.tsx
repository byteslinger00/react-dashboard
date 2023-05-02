

// const isLocalhost = window.location.origin.indexOf("localhost") > -1;
import React from "react";

const baseUrl = "https://backend.baohule.com"

interface IApplicationContext {
    apiBaseUrl: string;
}



const reactApplicationContext = React.createContext<IApplicationContext>(
    {} as any
);

export default function useAppContext(): IApplicationContext {
    return React.useContext(reactApplicationContext);
}

export function AppContextProvider(props: any) {
    const {Provider} = reactApplicationContext;


 const value = {
        apiBaseUrl: baseUrl,
    };

    return <Provider value={value}>{props.children}</Provider>;
}