import React, {createContext, PropsWithChildren, useContext, useState} from "react";


export interface DynamicFormContextState {
    itsValid?: boolean;
    state: FormState;
    updateState: (value: (((prevState: FormState) => FormState) | FormState)) => void;
}

export type FormState = { [key: string]: { value: any, itsValid: boolean } };
export const DynamicFormContext = createContext<DynamicFormContextState | null>(null);

export function useDynamicFormContext() {
    const context = useContext(DynamicFormContext);
    if (!context) {
        throw Error("Dynamic Form Component can only be used under a DynamicFormContext");
    }

    return context;
}

export const DynamicFormContextWrapper: React.FC<PropsWithChildren> = ({children}) => {
    const [formState, setFormState] = useState<FormState>({});
    return (
        <DynamicFormContext.Provider value={{
            state: formState,
            updateState: setFormState
        }}>
            {children}
        </DynamicFormContext.Provider>
    )
}
