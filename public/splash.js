angular.module('lycan').controller('splashCtrl', function($scope, $location) {

    setTimeout(() => {
        window.location.href = './auth.html'

    }, 12000);

});