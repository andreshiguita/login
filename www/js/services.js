angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.service('LoginService', function($http, $q) {
    return {
        loginUser: function(dataObj) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            //Testing convertion
            var srtDataObject = JSON.stringify(dataObj);
            //var srtDataObject = "3089381924b12a45a19c37c3f53ec58bc9737798f5bc1fc35e7cea04f57c8e7093b413a6e09a2ee1f0cbd4dde415cf4a";
            console.log("vtw: " + srtDataObject);

            //
            var claveCifrado = "m0b1lt3ch2011pwdm0b1lt3ch2011pwd";
            var textoCifradoHexa = byteArrayToHex(rijndaelEncrypt(srtDataObject, claveCifrado, "ECB"));

            console.log("textoCifradoHexa", textoCifradoHexa);

            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

            //$http.post('http://echo.jsontest.com/conditions/frightful', ).then(function(resp) {
            $http.post('http://192.168.0.21:9380/ventamovil/ventaMovil', {"vtw":textoCifradoHexa,"usuario":"andres"})

            .then(function(resp) {
            //$http.post('http://echo.jsontest.com/conditions/frightful', "vtw="+srtDataObject).then(function(resp) {
            
              //$scope.conditions = resp.data.conditions;
              console.log("respuesta", resp.data)
              console.log("respuesta", resp.data.permisos)
              console.log("respuesta", resp.data.usuarios)
              deferred.resolve('Welcome ' + name + '!');
            }, function(err) {
              console.error('ERR', err);
              deferred.reject('Wrong credentials.');
              // err.status will contain the status code
            })

            /*
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            */

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
