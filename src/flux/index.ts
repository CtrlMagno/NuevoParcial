
export { default as AppDispatcher } from './Dispatcher';
export type { Action, DispatchToken, Callback } from './Dispatcher';


export { Store } from './Store';


export { default as AuthStore, authStore } from './stores/AuthStore';
export { AuthActionTypes } from './stores/AuthStore';
export type { AuthState } from './stores/AuthStore';
export { default as AuthActions } from './actions/AuthActions';

export { default as PostStore, postStore } from './stores/PostStore';
export { PostActionTypes } from './stores/PostStore';
export type { PostState } from './stores/PostStore';



import { authStore } from './stores/AuthStore';
import { postStore } from './stores/PostStore';


export const getStores = () => ({
  auth: authStore,
  posts: postStore
});


export const destroyAllStores = () => {
  authStore.destroy();
  postStore.destroy();
}; 