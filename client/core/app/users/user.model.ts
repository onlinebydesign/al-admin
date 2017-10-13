import * as Model from 'ampersand-model';

export const UserModel = Model.extend({
  urlRoot: '/api/Users',
  props: {
    id: 'number',
    email: 'string'
  },
  extraProperties: 'allow'
});


export class User {
  id: number;
  email: string;
  password?: string;
}

export const EmptyUser: User = {
  id: 0,
  email: ''
};
