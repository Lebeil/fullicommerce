import React, {useState} from 'react';
import {auth, googleAuthProvider} from "../../firebase";
import { toast } from "react-toastify";
import {MailOutlined, GoogleOutlined} from '@ant-design/icons';
import {Button} from 'antd'
import {useDispatch} from "react-redux";

const Login = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(true)

    let dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setDisable(false)
        /*console.log(email, password)*/
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            /*console.log(result)*/
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                }
            })
            history.push('/')
        }catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(true);
        }
    }

    const googleLogin = async ()=> {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result)=> {
                const {user} = result
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    }
                })
                history.push('/');
            })
            .catch((error)=> {
                console.log(error);
                toast.error(error.message);
        });
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
                disabled={!email || password.length < 6 || !disable}
            >
                Se connecter avec l'email
            </Button>

        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger">Chargement...</h4>) : (<h4>Connexion</h4>)}
                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        shape="round"
                        icon={<GoogleOutlined style={{verticalAlign:'text-bottom'}}/>}
                        size="large"
                    >
                        Se connecter avec Google
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Login;
