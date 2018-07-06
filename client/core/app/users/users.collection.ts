import * as Collection from 'ampersand-rest-collection';
import * as _ from 'lodash';

import { AlUserModel } from 'al-core';

export const UsersCollection = Collection.extend({
    model: AlUserModel,
    url: function() {
        if (this.queryFilter) {
            return 'api/user?filter=' + JSON.stringify(this.queryFilter);
        }
        return 'api/user';
    },
    ajaxConfig: () => {
        const accessToken = _.defaultTo(JSON.parse(localStorage.getItem('accessToken')), {});
        return {
            headers: {
                'Authorization': accessToken.id
            }
        };
    }
});
