import { authHeader } from '@/_helpers/auth.header';

describe('Given auth.header.ts', () => {
  describe('If there is a user item on localStorage', () => {
    test('Test', () => {
      localStorage.setItem('user', JSON.stringify({ token: 'pepe' }));
      expect(authHeader()).toEqual({ Authorization: 'Bearer pepe' });
      localStorage.clear();
    });
    test('Test 2', () => {
      expect(authHeader()).toEqual({});
      localStorage.clear();
    });
  });
});
