/**
 * <directive>
 * @name ${noteName}
 * @description ${noteDescription}
 * @date ${date}
 * @author ${noteAuthor}
 * @lastBy 
 * @html ${html}
 * @htmlUrl
 */
define([
    'angular'
], function(
    angular
    ) {
    return function(app, elem, attrs, scope) {
        app.directive('${directiveName}', [function() {
            return {
                restrict: '${restrict}',
                replace: true,
                scope: {
${scopesData}
                },
                link: function($scope,$element,$attrs) {
                    console.log('继承作用域：',$scope);
                },

                controller: function($scope,$element,$attrs) {
                    
                }
            };
        }]);
    };
});