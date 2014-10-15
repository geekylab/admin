angular.module('clientApp').directive('checkboxupdate', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            element.bind("click", function () {
                alert('johna');
            });
        }
    };
});