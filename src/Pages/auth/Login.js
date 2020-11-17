import React, {useState} from 'react';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {MailOutlined} from '@ant-design/icons';
import {Button} from 'antd'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse mail"
                    autoFocus
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                />
            </div>

            <br/>
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                shape="round"
                icon={<MailOutlined style={{verticalAlign:'text-top'}}/>}
                size="large"
                disabled={!email || password.length < 6}
            >
                Se connecter avec l'email
            </Button>

        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md6 offset-md-3">
                    <h4>Connexion</h4>
                    {loginForm()}
                </div>
            </div>

        </div>
    );
};

export default Login;
