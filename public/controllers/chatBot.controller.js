var app = angular.module("myapp", []);
// custom directive to make the html as safe

// app.filter('unsafe', function($sce) {
// return function(val) {
//     return $sce.trustAsHtml(val);
//   };
// });

app.controller("chatBotController", ["$scope", function($scope){
    console.log("calling gecko controller.js file...");
    //var client = io.connect();
    $scope.chatContainer = [];

    // $scope.safeApply = function(fn) {
    //     var phase = this.$root.$$phase;
    //     if(phase == '$apply' || phase == '$digest') {
    //       if(fn && (typeof(fn) === 'function')) {
    //         fn();
    //       }
    //     } else {
    //       this.$apply(fn);
    //     }
    // };

    

}])
