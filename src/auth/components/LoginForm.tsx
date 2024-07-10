import {ReactElement} from 'react';
import FormAction from "./FormAction";
import useAuth from "../context/AuthContext";
import {Input, useField} from "../../shared_kernel/ui/atoms";


const LoginForm = (): ReactElement => {
        const {login} = useAuth();
        const emailField = useField<string>("");
        const passwordField = useField<string>("");
        const handleSubmit = async (e: any) => {
            e.preventDefault();
            await login(emailField.value, passwordField.value);

        }
        return (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    <Input labelText="Email"
                           labelFor="email-address"
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required={true}
                           placeholder="Ingrese su email"
                           {...emailField}
                    />
                </div>
                <div className="-space-y-px">
                    <Input labelText="Password"
                           labelFor="password"
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           required={true}
                           placeholder="Password"
                           {...passwordField}
                    />
                </div>

                <FormAction handleSubmit={handleSubmit} text="Login"/>

            </form>

        );
    }
;

export default LoginForm;
