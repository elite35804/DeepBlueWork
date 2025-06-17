import { AppDetails } from '@/Config';
import * as internalActions from '@/store/internalActions';
import * as Storage from '@/utils/AsyncStorage';
import { isEmpty } from 'lodash';
import axios from '@/utils/axios';

const TOKEN_NAME = '@' + AppDetails.appName.toLowerCase().replace(/\s/g, '') + ':token';

export const internal = internalActions;




/*
*
*/
export const setStoredAuthToken = async ({ state }, data) => {
  return Storage.putObject(TOKEN_NAME, data);
};

/*
*
*/
export const getStoredAuthToken = async ({state}) => {
  var TOKEN = await Storage.getObject(TOKEN_NAME);
  if (!TOKEN) {
    Storage.putObject(TOKEN_NAME, null);
    return null;
  } else {
    state.access_token = TOKEN.access_token
  }
  return TOKEN;
};

/*
*
*/
export const removeStoredAuthToken = async () => {
  return Storage.remove(TOKEN_NAME);
};

/*
*
*/
export const logout = async ({ state, actions }) => {
  state.currentUser = null;
  state.isLoggedIn = false;
  state.access_token = null;

  await actions.removeStoredAuthToken();
  // actions.pushNotification.unsubscribe();
  return true;
};

/*
*
*/
export const login = async ({ effects, state, actions }, variables) => {
  try {
    const res = await axios.post('/login', variables, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res, 'res');
    if (res?.data?.error_description === 'Invalid user credentials') {
      actions.alert.showError({message: 'Invalid user'});
      return false;
    }
    if (res?.data?.access_token) {
      state.access_token = res?.data?.access_token

      let resDetails = await axios.get(`/user/${variables?.username}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        access_token: res?.data?.access_token
      });
      console.log(resDetails);
      state.currentUser = resDetails.data[0];
      actions.setStoredAuthToken({...res?.data, ...state.currentUser});
      await actions.email.getAllFolders();
      return state.currentUser;
    }
  } catch (e) {
    console.log(e)
    await actions.removeStoredAuthToken();
    state.errors = e.response.errors;
  }
}

export const loginWithToken = async({actions, state}) => {
  try {
    const res = await actions.getStoredAuthToken();
    console.log(res, 'res');
    if (res?.refresh_token) {
      const response = await axios.post('/token', { refreshToken: res?.refresh_token }, {access_token: state.access_token});
      console.log(response, 'response');
      state.access_token = response?.data?.access_token
      let resDetails = await axios.get(`/user/${res?.userName}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        access_token: state.access_token
      });
      state.currentUser = resDetails?.data[0];
      actions.setStoredAuthToken({...response?.data, ...resDetails?.data[0]});
      await actions.email.getAllFolders();
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

export const setBottomTabs = ({state}, bottomTabs) => {
  state.bottomTabs = bottomTabs;
  console.log(state.bottomTabs, 'state.bottomTabs')
}
