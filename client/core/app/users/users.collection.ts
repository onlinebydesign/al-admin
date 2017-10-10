import * as _ from 'lodash';
import { User } from "./user.model";
import * as Collection from 'ampersand-rest-collection';


export const UsersCollection = Collection.extend({
    model: User,
    url: function() {
        return 'api/users?filter=' + JSON.stringify(this.filter);
    },
    ajaxConfig: () => {
        let accessToken = _.defaultTo(JSON.parse(localStorage.getItem('accessToken')), {});
        return {
            headers: {
                'Authorization': accessToken.id
            }
        };
    }
});