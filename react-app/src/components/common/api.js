import axios from 'axios';

export default {
  Api(server) {
    return {
      private: (token) => {
        const url = server + 'home/private';
        return axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
      },
      public: () => {
        const url = server + 'home/public';
        return axios.get(url)
      },
      signin: (email, password) => {
        const url = server + 'users/signin';
        return axios.post(url, { Email: email, Password: password })
      },
      signup: (email, password) => {
        const url = server + 'users/signup';
        return axios.post(url, { Email: email, Password: password })
      },
      confirmation: (id, guid) => {
        const url = server + 'users/confirm?id=' + id + '&guid=' + guid
        return axios.get(url)
      }
    }
  }
};