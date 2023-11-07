import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {useGetCaptchaQuery, useLoginMutation} from "../../Dall/api";
import {ResultCode} from "../../Dall/apiTypes";
import {Preloader} from "../common/Preloader/Preloader";


type ValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


export const Login = () => {


    const [login, {data}] = useLoginMutation()
    const captcha = useGetCaptchaQuery().data?.url
    const [captchaStatus, setCaptchaStatus] = useState(false)
    const errorMessage = data?.messages[0]


    useEffect(() => {
        if (data?.resultCode === ResultCode.Captcha) {
            setCaptchaStatus(true)
        } else {
            setCaptchaStatus(false)
        }
    }, [captcha])


    const validationLogin = Yup.object().shape({
        email: Yup.string().email().required('Required'),
        password: Yup.string().min(6)
    })

    const onSubmitHandler = (values:ValuesType) => {
        let {email, password, rememberMe, captcha} = values
        login({email, password, rememberMe, captcha})
    }


    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
            validationSchema={validationLogin}
            onSubmit={(values) => onSubmitHandler(values)}>

            <Form>

                <FormContainer>
                    <Description>
                        <p>To log in get registered
                            <Link href={'https://social-network.samuraijs.com/'}
                                  target={'_blank'}> here
                            </Link>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </Description>

                    <FormWrapper>

                        <Title>LOGIN</Title>
                        <FieldContainer>
                            <Label htmlFor="email">EMAIL</Label>
                            <Input id="email" name="email" type='email' placeholder="Email"/>
                            <ErrorMessage name="email"/>
                        </FieldContainer>

                        <FieldContainer>
                            <Label htmlFor="password">PASSWORD</Label>
                            <Input id="password" name="password" type='password' placeholder="Password"/>
                            <ErrorMessage name="password"/>
                        </FieldContainer>

                        <ButtonLogin type="submit">
                            Login

                        </ButtonLogin>

                        {captchaStatus &&
                            <FieldContainer>
                                <img src={captcha} alt='captcha'/>
                                <Input id="captcha" name="captcha" type='captcha' placeholder="captcha"/>
                            </FieldContainer>
                        }
                        {errorMessage && <ErrorMessageStyle> {errorMessage}</ErrorMessageStyle>}
                    </FormWrapper>


                </FormContainer>

            </Form>


        </Formik>
    );
};

const Link = styled.a`
  color: #bd5629;
  text-decoration: none;
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 25px;
  border-radius: 10px;
  gap: 10px;
  width: 300px;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`
const Label = styled.label`
  font-weight: bold;
  background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
`

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-weight: bold;
  background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  text-align: center;
`


const ButtonLogin = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
  border-radius: 50px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 200px;
  height: 35px;
  margin: 0 auto;
  transition: background 0.5s ease-in-out;


  &:hover {
    background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
  }
`

const Input = styled(Field)`
  margin-top: 10px;
  margin-bottom: 15px;
  padding: 5px;
  border: none;
  border-bottom: 2px solid palevioletred;
  outline: none;
  font-size: 14px;

  &:not(:focus) {
    background: none;
  }
`
const ErrorMessageStyle = styled.div`
  text-align: center;
  color: red;
`

const Description = styled.div`
    text-align: center;
`


