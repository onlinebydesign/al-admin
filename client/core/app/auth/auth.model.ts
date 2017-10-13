import * as Model from 'ampersand-model';

export const UserModel = Model.extend({
  url: 'http://localhost:3000/api/Users/1?access_token=' + localStorage.getItem('accessToken'),
  props: {
    id: 'number',
    name: 'string',
    email: 'string'
  },
  extraProperties: 'allow'
});


export class User {
  id: number;
  name: string;
  email: string;
}

export const EmptyUser: User = {
  id: 0,
  name: '',
  email: ''
};
