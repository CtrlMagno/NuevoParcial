import { AppDispatcher } from '../Dispatcher';
import { AuthActionTypes } from '../stores/AuthStore';
import { authService } from '../../services/authService';
import { LoginData, CreateUserData, User } from '../../types/User';

export class AuthActions {
  

  static async login(loginData: LoginData): Promise<void> {

    AppDispatcher.dispatch({
      type: AuthActionTypes.LOGIN_REQUEST,
      payload: null
    });

    try {
      const result = await authService.login(loginData);
      

      AppDispatcher.dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: result
      });
    } catch (error: any) {

      AppDispatcher.dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: error.message
      });
    }
  }


  static async signup(signupData: CreateUserData): Promise<void> {

    AppDispatcher.dispatch({
      type: AuthActionTypes.SIGNUP_REQUEST,
      payload: null
    });

    try {
      const result = await authService.signup(signupData);
      

      AppDispatcher.dispatch({
        type: AuthActionTypes.SIGNUP_SUCCESS,
        payload: result
      });
    } catch (error: any) {

      AppDispatcher.dispatch({
        type: AuthActionTypes.SIGNUP_FAILURE,
        payload: error.message
      });
    }
  }


  static async logout(): Promise<void> {
    try {
      await authService.logout();
      

      AppDispatcher.dispatch({
        type: AuthActionTypes.LOGOUT,
        payload: null
      });
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
+
      AppDispatcher.dispatch({
        type: AuthActionTypes.LOGOUT,
        payload: null
      });
    }
  }

  static clearError(): void {
    AppDispatcher.dispatch({
      type: AuthActionTypes.CLEAR_ERROR,
      payload: null
    });
  }

  static async updateProfile(userId: string, updates: Partial<User>): Promise<void> {
    try {
      const updatedUser = await authService.updateUserProfile(userId, updates);
      
      AppDispatcher.dispatch({
        type: AuthActionTypes.UPDATE_PROFILE,
        payload: updatedUser
      });
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
    }
  }


  static initializeAuthListener(): () => void {
    return authService.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('Firebase Auth: Usuario encontrado:', user.email);
        
        try {
          const token = await authService.getCurrentToken();
          AppDispatcher.dispatch({
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: { user, token }
          });
        } catch (error) {
          console.error('Error getting token:', error);
        }
      } else {
        console.log('Firebase Auth: No hay usuario autenticado');
        AppDispatcher.dispatch({
          type: AuthActionTypes.LOGOUT,
          payload: null
        });
      }
    });
  }
}

export default AuthActions; 