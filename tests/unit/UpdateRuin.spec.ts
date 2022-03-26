// import Vuex from 'vuex';
// import { shallowMount, mount } from '@vue/test-utils';
// import { createRouter, createWebHistory } from 'vue-router';
// import { routes } from '@/router';
// import UpdateRuin from '@/components/UpdateRuin.vue';

// export const store = new Vuex.Store({
//   modules: {
//     account: {
//       state: {},
//     },
//     ruins: {
//       state: { Ruinname: 'NombreRuina' },
//       actions: {
//         modifyExistingRuin: jest.fn(),
//         getRuinDetails: jest.fn(),
//       },
//     },
//   },
// });

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// let wrapper: any;

// describe('UpdateRuin.vue', () => {
//   // beforeEach(() => {
//   //   wrapper = mount(UpdateRuin, {
//   //     global: {
//   //       plugins: [store],
//   //     },
//   //     mocks: {
//   //       data() {
//   //         return {
//   //           payload: {
//   //             ruin: {
//   //               name: 'RuinaName',
//   //               location: 'RuinaLocation',
//   //               description: 'RuinaDescription',
//   //               images: 'RuinaImages',
//   //               score: 'RuinaScore',
//   //             },
//   //           },
//   //         };
//   //       },
//   //     },
//   //   });
//   // });

//   test('routing', () => {
//     const wrapperRouter = shallowMount(UpdateRuin, {
//       global: {
//         plugins: [router],
//       },
//     });
//     expect(wrapperRouter.html()).toContain('');
//   });

//   it('renders props.msg when passed', () => {
//     wrapper = mount(UpdateRuin, {
//       global: {
//         plugins: [store],
//       },
//       $mocks: {
//         $store: {
//           payload: {},
//         },
//       },
//       // mocks: {
//       //   data() {
//       //     return {
//       //       payload: {
//       //         ruin: {
//       //           name: 'RuinaName',
//       //           location: 'RuinaLocation',
//       //           description: 'RuinaDescription',
//       //           images: 'RuinaImages',
//       //           score: 'RuinaScore',
//       //         },
//       //       },
//       //     };
//       //   },
//       // },
//     });
//     console.log(wrapper.vm.Ruinname, ' CLOG DE WRAPPER RUINNAME');
//     expect(wrapper.text()).toMatch('Puntuación:');
//     expect(wrapper.text()).toMatch('Imágenes: ');
//   });
//   it('has a button', () => {
//     wrapper = mount(UpdateRuin, {
//       global: {
//         plugins: [store],
//       },
//       // mocks: {
//       //   data() {
//       //     return {
//       //       payload: {
//       //         ruin: {
//       //           name: 'RuinaName',
//       //           location: 'RuinaLocation',
//       //           description: 'RuinaDescription',
//       //           images: 'RuinaImages',
//       //           score: 'RuinaScore',
//       //         },
//       //       },
//       //     };
//       //   },
//       // },
//     });
//     expect(wrapper.find('button').exists()).toBe(true);
//   });
// });
