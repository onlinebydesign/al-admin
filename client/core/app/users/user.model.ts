import * as Model from 'ampersand-model';
import * as _ from 'lodash';

export const UserModel = Model.extend({
  urlRoot: '/api/Users',
  props: {
    id: 'number',
    email: 'string',
    emailVerified: 'boolean',
    firstName: 'string',
    lastName: 'string',
    role: 'string',
    disabled: 'boolean'
  },
  extraProperties: 'allow',
  ajaxConfig: () => {
    const accessToken = _.defaultTo(JSON.parse(localStorage.getItem('accessToken')), {});
    return {
      headers: {
        'Authorization': accessToken.id
      }
    };
  }
});


export class User {
  id: number;
  email: string;
  emailVerified: boolean;
  firstName?: string;
  lastName?: string;
  role?: string;
  disabled?: any;

  save?: any;
  destroy?: any;
}

export const EmptyUser: User = {
  id: 0,
  email: '',
  emailVerified: false,
  role: 'user'
};
