import * as React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useImmer} from "use-immer";
import {useAuthStore} from '@/stores/useAuthStore.ts';
import Input from "@/components/UI/Inputs/Input.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import './auth.scss'
import Button from "@/components/UI/Buttons/Button.tsx";

interface Auth {
    login: string;
    password: string;
    error: string | null;
    isNullLogin: boolean,
    isNullPassword: boolean,
}

const Auth: React.FC = () => {
    const [auth, updateAuth] = useImmer<Auth>({
        login: '',
        password: '',
        error: null,
        isNullLogin: false,
        isNullPassword: false,
    })

    const setAuthToken = useAuthStore((state) => state?.setAuthToken);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!auth.login || !auth.password) {
            if (!auth.login) {
                updateAuth(draft => {
                    draft.isNullLogin = true;
                });
            }

            if (!auth.password) {
                updateAuth(draft => {
                    draft.isNullPassword = true;
                });
            }

            return;
        }
        updateAuth(draft => {
            draft.error = null
        })

        const login = auth.login
        const password = auth.password

        try {
            const response = await axios.post('http://92.55.15.91:8225/login.getAuthToken', {
                login,
                password,
            });
            console.log(response);
            const token = response.data.authToken;
            setAuthToken(token);
            navigate('/menu');
        } catch {
            updateAuth(draft => {
                draft.error = 'Ошибка авторизации. Проверьте введенные данные.'
            })
        }
    };

    const handleChangeLogin = (login?: string): void => {
        updateAuth((draft) => {
            if (login != null) {
                draft.login = login.trim()
            }
            draft.isNullLogin = false
        })
    }

    const handleChangePassword = (password?: string): void => {
        updateAuth((draft) => {
            if (password != null) {
                draft.password = password
            }
            draft.isNullPassword = false
        })
    }

    return (
        <>

            <div className={'main'}>
                <div className="auth">
                    <div className="auth__header">
                        <img src="public/img/login/logo.svg" className={'auth__logo'} alt=""/>
                        <h1 className={'auth__title'}>OmpMobile</h1>
                    </div>

                    <form
                        className={'auth__form'}
                        onSubmit={handleLogin}
                    >
                        <Input
                            type={'text'}
                            name={'login'}
                            title={'Логин'}
                            placeholder={'GLEK_TEST'}
                            inputValue={auth.login}
                            updateValue={handleChangeLogin}
                            validateValue={false}
                            isNull={auth.isNullLogin}
                            textError={''}
                        />
                        <Input
                            type={'password'}
                            name={'password'}
                            title={'Пароль'}
                            placeholder={'****'}
                            inputValue={auth.password}
                            updateValue={handleChangePassword}
                            validateValue={false}
                            isNull={auth.isNullPassword}
                            textError={''}
                        />

                        {auth.error && <p style={{color: 'red'}}>{auth.error}</p>}
                        <Button
                            type={'submit'}
                            classBtn={'btn'}
                            text={'Войти'}
                            onClickBtn={()=>{}}
                        />
                    </form>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Auth;
