import { signInWithGooglePopup } from '../../utils/firebase.utils';

const SignIn = () => {
    // Async function (call to DB)
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    );
}

export default SignIn