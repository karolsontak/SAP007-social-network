/*
* @jest-environment jsdom
*/
/* eslint-disable */
import { registerUser, signIn } from '../src/firebase.js';
import Register from '../src/pages/register/register.js';
import Login from '../src/pages/login/login.js';

jest.mock('../src/firebase.js');
jest.mock('../src/export.js');

describe('registerUser', () => {
  it('Deverá ser uma função', () => {
    expect(typeof registerUser).toBe('function');
  });
});

describe('registerUser', () => {
  it('Deverá registrar corretamente', () => {
    registerUser.mockResolvedValueOnce();
        const name = 'Jesus Amado';
        const email = 'ajuda@deus.com';
        const password = '123456';
        const page = Register();
        const nameInput = page.querySelector('.name');
        const emailInput = page.querySelector('.email');
        const passwordInput = page.querySelector('.password');
        const btnRegister = page.querySelector('#register-button');

        nameInput.value = name;
        emailInput.value = email;
        passwordInput.value = password;
        
        btnRegister.dispatchEvent(new Event('click'));

    expect(registerUser).toHaveBeenCalledWith(name, email, password);
    expect(registerUser).toHaveBeenCalledTimes(1);
  });
});

describe('signIn', () => {
  it('Deverá ser uma função', () => {
    expect(typeof signIn).toBe('function');
  });
});

describe('signIn', () => {
  it('Deverá logar corretamente', () => {
    signIn.mockResolvedValueOnce();
        const email = 'ajuda@deus.com';
        const password = '123456';
        const page = Login();
        const emailLogin = page.querySelector('.email-login');
        const passwordLogin = page.querySelector('.password-login');
        const btnLogin = page.querySelector('#signin-button');

        emailLogin.value = email;
        passwordLogin.value = password;
        
        btnLogin.dispatchEvent(new Event('click'));

    expect(signIn).toHaveBeenCalledWith(email, password);
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});
