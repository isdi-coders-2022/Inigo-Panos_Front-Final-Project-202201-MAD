import axios from 'axios';
import * as api from '@/router/users.service';

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('Given the service api', () => {
  let id: string;
  let user: any;
  let token: string;
  beforeAll(() => {
    id = '6230785357282c2abf249e6b';
    user = {
      userName: 'pepe',
      isAdmin: false,
    };
    token = '';
  });

  describe('Testing getData', () => {
    beforeEach(() => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };
      mockedAxios.get.mockResolvedValue(user);
    });

    test('GetData', () => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };
      return api.getData(id as string).then((data) => {
        expect(data).toEqual(user);
      });
    });
  });
  describe('Testing register', () => {
    beforeEach(() => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };
      mockedAxios.post.mockResolvedValue(user);
    });

    test('Register', () => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };
      return api.register(user as any).then((data) => {
        expect(data).toEqual(user);
      });
    });
  });
  describe('Testing login', () => {
    beforeEach(() => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };
      mockedAxios.post.mockResolvedValue(user);
    });

    test('Login', () => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };

      return api.login(user as any).then((data) => {
        expect(data).toEqual(user);
      });
    });
  });
  describe('Testing logout', () => {
    test('Logout', () => {
      // window.localStorage.removeItem('token');
      jest.spyOn(global.localStorage, 'removeItem');
      global.localStorage.removeItem = jest.fn();
      expect(localStorage.removeItem).toHaveBeenCalled();
      // expect(window.localStorage.getItem('token')).toBe(null);
    });
  });
  describe('Testing loginWithToken', () => {
    beforeEach(() => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };
      mockedAxios.post.mockResolvedValue(user);
    });

    test('LoginUsingToken', () => {
      user = {
        userName: 'pepe',
        isAdmin: false,
      };

      return api.loginUsingToken(user as any).then((data) => {
        expect(data).toEqual(user);
      });
    });
  });
});
