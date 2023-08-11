
import Link from "next/link"
import "@/app/css/login.css"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { httpPost } from "@/app/core/http-request-contract"
import { handleInput } from "@/app/core/repository/handle_input"
import InputText from "@/app/components/forms/input-text/input.text"
import ButtonPrimary from "@/app/components/forms/button-primary/button-primary"
import { loginBody, validateLoginBody } from "@/app/core/repository/login/login_body"
import Image from "next/image"
import backgroundLogin from "@/app/assets/images/image.png"


export default function LoginComponent() {
    const router = useRouter();
    const [values, setValues] = useState(loginBody)

    React.useEffect(() => {
        validateSesion()
    }, [])

    const validateSesion = () => {
        if (sessionStorage.getItem("user") != undefined)
            router.push("/home")
    }

    const validateLogin = async () => {
        let validation = validateLoginBody(values)
        if (typeof validation === 'string') alert(validation)
        else httpPost("users/login", values).then((response) => {
            if (response.name != null || response.name != undefined)
                ////
                sessionStorage.setItem("user", response.name);
        }).catch((err) => { console.log(err) });
        validateSesion()
    }

    return (
        <div className="login-bg ">
            <div className="container-fluid main">
                <div className="row main">
                    <div className="Logo">Task Master</div>
                    <div className="col-md-2 offset-md-10 container-primary">
                        <div className="vertical-center">
                            <div className="container">
                                <form>
                                    <InputText hint="Email" id="email" type="email" handleInput={[handleInput, values, setValues]} />
                                    <InputText hint="Password" id="password" type="password" handleInput={[handleInput, values, setValues]} />
                                    <ButtonPrimary text="Login" callBack={() => { validateLogin() }} />
                                    <Link className="text-white text-center" href={"/register"}><p className="mg-t-5">Create new acount</p></Link>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Image src={backgroundLogin} alt={"imagen"} className="image"/>
                </div>
            </div>
        </div>
    )


    
}