import {createContext, ReactElement, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession} from "amazon-cognito-identity-js";
import {cognitoConfig} from "../../cognitoConfig.ts";


interface AuthContextType {
    user?: any;
    loading: boolean;
    loadingInitial: boolean;
    error?: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
})

export function AuthProvider({
                                 children,
                             }: {
    children: ReactNode;
}): ReactElement {
    const [user, setUser] = useState<any>();
    const [error, setError] = useState<any>();
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation();
    // Reset the error state if we change page
    useEffect(() => {
        if (error) setError(undefined);
    }, [error, location.pathname]);

    useEffect(() => {
        const _user = localStorage.getItem("user");
        if (_user) {
            setUser(JSON.parse(_user));
        }
        setLoadingInitial(false);
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
            })

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
            })

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (userCredentials: CognitoUserSession) => {
                    const user = {
                        authToken: userCredentials.getIdToken(),
                        name: email
                    } as any;
                    const cognitoUser = userPool.getCurrentUser();
                    cognitoUser?.getSession((err: any, _session: any) => {
                        if (err) {
                            setError(err)
                        }
                    });
                    setUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                },
                onFailure: (err) => {
                    setError(err)
                },
            })

        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    const logout = async (): Promise<void> => {
        setLoading(true);
        try {
            userPool.getCurrentUser()?.signOut(() => {
                setUser(undefined);
                localStorage.removeItem("user")
            });
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    const memoValue = useMemo(
        () => ({
            user,
            loadingInitial,
            loading,
            error,
            login,
            logout
        }),
        [user, loadingInitial, loading, error]
    );

    return (
        <AuthContext.Provider value={memoValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}
