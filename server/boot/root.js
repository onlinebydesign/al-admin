'use strict';

// module.exports = function(server) {
//   // Install a `/` route that returns server status
//   var router = server.loopback.Router();
//   router.get('/', server.loopback.status());
//   server.use(router);
// };

module.exports = function(app) {

  var Users = app.models.Users;

  Users.findOrCreate(
    {email: 'test@obdstudios.com'},
    {email: 'test@obdstudios.com', password: 'test', emailVerified: true},
    function (err, user, created) {
      console.log(err, user, created);
    }
  );
}
