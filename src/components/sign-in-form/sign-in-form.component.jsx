import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase.utils';

import './sign-in-form-component.scss';


const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // Async function (call to DB)
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // See if we've signed in the user with email and password
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);

            // Reset form
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('Cannot log in, user email is not registered');
                    break;
                case 'auth/wrong-password':
                    alert('Cannot log in, wrong password');
                    break;
                default:
                    console.log('user log-in encountered an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit} >

                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />

                <div className='buttons-container'>
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign-in</Button>
                </div>
            </form>

        </div>
    );
}

export default SignInForm;