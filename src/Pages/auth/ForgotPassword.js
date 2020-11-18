import React, {useState, useEffect} from 'react';
import {Button} from 'antd'
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";


const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state)=> ({...state}))

    useEffect(()=> {
      if (user && user.token)history.push('/')
    },[user])

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth.sendPasswordResetEmail(email,config)
            .then(()=> {
                setEmail("")
                setLoading(false)
                toast.success("Veuillez confirmer votre mot de passe par mail !")
            })
            .catch((error)=> {
                setLoading(false)
                toast.error("Veuillez saisir la bonne adresse mail !!");
                console.log("error", error)
            })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (<h4 className="text-danger">Recherche ...</h4>) : (<h4>Mot de passe oublié</h4>)}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e => setEmail(e.target.value))}
                    placeholder="Saisir votre email"
                    autoFocus
                />
                <br/>
                <Button type="primary" disabled={!email}>Envoyer</Button>
            </form>
        </div>

    );
};

export default ForgotPassword;
