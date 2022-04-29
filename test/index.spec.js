import { registerUser } from '../src/firebase.js';
import Register from './mock.js';

jest.mock('./mock.js');

describe('registerUser', () => {
  it('Deverá registrar corretamente', () => {
    const name = 'Jesus Amado';
    const email = 'ajuda@deus.com';
    const password = '123456';
    const page = Register();
    const nameInput = page.querySelector('#name');
    const emailInput = page.querySelector('#email');
    const passwordInput = page.querySelector('#password');

    nameInput.value = name;
    emailInput.value = email;
    passwordInput.value = password;

    nameInput.dispatchEvent(new Event('keyup'));
    emailInput.dispatchEvent(new Event('keyup'));
    passwordInput.dispatchEvent(new Event('keyup'));

    expect(registerUser).toHaveBeenCalledWith(page, name, email, password);
  });
});
