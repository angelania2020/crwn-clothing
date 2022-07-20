import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // console.log(formFields);

    // Destructure setter from user context
    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Confirm 2 passswords match
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            // See if we've authenticated the user with email and password
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // Set current user as a newly registered user
            setCurrentUser(user);
            // Create userDoc
            const userDocRef = await createUserDocumentFromAuth(user, { displayName });
            //Reset form fields
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };


    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email"
                    // inputOptions = {{
                    //     type: 'email',
                    //     required: true,
                    //     onChange: handleChange,
                    //     name: "email",
                    //     value: email
                    //     }}
                    type='email' required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button type='submit'>Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;