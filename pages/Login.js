import styled from "styled-components";
import Head from "next/head";
import {Button} from '@material-ui/core';
import {auth, provider} from '../firebase';

function Login() {
    const signIn = _ => {
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            
            <LoginContainer>
                <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    height:100vh;
    background-color:whitesmoke;
    position:relative;
`;
const LoginContainer = styled.div`
    padding:100px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:50vw;
    align-items:center;
    background-color:white;
    display:flex;
    flex-direction:column;
    border-radius:5px;
    box-shadow:1px 1px 10px rgba(0,0,0,0.1);
    @media(max-width:767px) {
        width:100vw;
        height:100vh;
    }
`;
const Logo = styled.img`
    width:200px;
    height:200px;
    margin-bottom:50px;
`;