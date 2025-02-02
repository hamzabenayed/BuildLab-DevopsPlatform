import { GoogleLogin } from "react-google-login";
const clientId = '151877856440-ppcj77ol630skcs9aetaa4eg2pcv4a1o.apps.googleusercontent.com'





function Loging() {


    const onSuccess = (res) => {
        console.log("Login Success! Current User: ", res.profileObj);
    }


    const onFailure = (res) => {
        console.log("Login Failed! res: ", res);
    }



    return (
        <div id="signInButton">
            <GoogleLogin>
                clientId={clientId}
                buttonText="Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            </GoogleLogin>

        </div>
    )
} export default Loging;