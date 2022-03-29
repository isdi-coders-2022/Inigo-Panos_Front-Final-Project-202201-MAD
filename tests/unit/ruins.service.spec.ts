import axios from 'axios';
import * as api from '@/router/ruins.service';

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('Given the service api', () => {
  let id: string;
  let ruin: any;
  let payload: any;
  let token: string;

  describe('Testing updateRuin', () => {
    beforeEach(() => {
      payload = {
        ruin: {
          _id: '1111',
          name: 'ruina',
        },
      };
      mockedAxios.patch.mockResolvedValue(payload);
    });

    test('UpdateRuin', () => {
      payload = {
        ruin: {
          _id: '1111',
          name: 'ruina',
        },
      };
      return api.updateRuin(payload as any).then((data) => {
        expect(data).toEqual(payload);
      });
    });
  });

  describe('Testing newCommentOnRuin', () => {
    beforeEach(() => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      mockedAxios.patch.mockResolvedValue(payload);
    });

    test('newCommentOnRuin', () => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      return api.newCommentOnRuin(payload as any).then((data) => {
        expect(data).toEqual(payload);
      });
    });
  });

  describe('Testing deleteComment', () => {
    beforeEach(() => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      mockedAxios.delete.mockResolvedValue(payload);
    });

    test('deleteComment', () => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      return api.deleteComment(payload as any).then((data) => {
        expect(data).toEqual(payload);
      });
    });
  });

  describe('Testing addToFavoritesToggle', () => {
    beforeEach(() => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      mockedAxios.patch.mockResolvedValue(payload);
    });

    test('addToFavoritesToggle', () => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      return api.addToFavoritesToggle(payload as any).then((data) => {
        expect(data).toEqual(payload);
      });
    });
  });

  describe('Testing addToVisitedToggle', () => {
    beforeEach(() => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      mockedAxios.patch.mockResolvedValue(payload);
    });

    test('addToVisitedToggle', () => {
      payload = {
        ruinId: '1111',
        text: 'Mock',
      };
      return api.addToVisitedToggle(payload as any).then((data) => {
        expect(data).toEqual(payload);
      });
    });
  });

  describe('Testing createNewRuin', () => {
    beforeEach(() => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      mockedAxios.post.mockResolvedValue(ruin);
    });

    test('createNewRuin', () => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      return api.createNewRuin(ruin as any).then((data) => {
        expect(data).toEqual(ruin);
      });
    });
  });

  describe('Testing deleteRuin', () => {
    beforeEach(() => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      mockedAxios.delete.mockResolvedValue(ruin);
    });

    test('deleteRuin', () => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      return api.deleteRuin(ruin as any).then((data) => {
        expect(data).toEqual(ruin);
      });
    });
  });

  describe('Testing getAllRuins', () => {
    beforeEach(() => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      mockedAxios.get.mockResolvedValue(ruin);
    });

    test('getAllRuins', () => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      return api.getAllRuins().then((data) => {
        expect(data).toEqual(ruin);
      });
    });
  });

  describe('Testing getRuinDetails', () => {
    beforeEach(() => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      mockedAxios.get.mockResolvedValue(ruin);
    });

    test('getRuinDetails', () => {
      ruin = {
        name: '1111',
        description: 'Mock',
      };
      id = '1111';
      // const result = api.request.handlers[0].fulfilled({ headers: {} });

      return api.getRuinDetails(id as string).then((data) => {
        expect(data).toEqual(ruin);
        // expect(result.headers).toHaveProperty('Authorization');
      });
    });
  });
});
