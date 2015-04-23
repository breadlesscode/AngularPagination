angular
	.module('mkuhneu.pagination', [])
	.directive('myPagination', [function () {
		return {
			restrict: 'E',
			scope: {
				data: '=',
				range: '='
			},
			link: function(scope, element, attrs) {
				// scope initialisation
				scope.totalElements = scope.data.total;
				scope.elementsPerPage = scope.data.per_page;
				scope.lastPage = scope.data.last_page;
				scope.currentPage = scope.data.current_page;
				// set pagination links
				scope.links = [];

				var generateLinks = function() {
					scope.links = [];
					var startPage, endPage, startOffset = 0, endOffset = 0;

					if(scope.currentPage + scope.range > scope.lastPage) {
						endPage = scope.lastPage;
						startOffset = scope.currentPage + scope.range - scope.lastPage;
					}
					else {
						endPage = (scope.currentPage + scope.range);
					}

					if(scope.currentPage - scope.range > 1) {
						startPage = (scope.currentPage - scope.range) - startOffset;
					}
					else {
						startPage = 1;
						endOffset = scope.range - scope.currentPage + 1;
						endPage+= endOffset;
					}

					for(var i = startPage; i <= endPage;i++) {
						if(i > 0 && i <= scope.lastPage) {
							scope.links.push(i);
						}
					}
				};

				generateLinks();

				scope.paginate = function ($event, page) {
					if(page > 0 && page <= scope.lastPage && page != scope.currentPage) {
						scope.currentPage = page;

						scope.$emit('pagination.changed', page);
						generateLinks();
					}
				};


			},
			template: '<div class="text-center"><strong>Setite {{ currentPage }} von {{ lastPage }} ({{elementsPerPage}} von {{totalElements}})</strong><br />' +
				'<ul ng-show="lastPage != 1" class="pagination">' +
					'<li ng-class="{\'disabled\': currentPage == 1}"><a ng-click="paginate($event, 1)">&laquo;</a></li>' +
					'<li ng-class="{\'disabled\': currentPage == 1}"><a ng-click="paginate($event, currentPage - 1)">&lsaquo;</a></li>' +
					'<li ng-repeat="link in links" ng-class="{\'active\': link == currentPage}">' +
					'	<a ng-bind="link" ng-click="paginate($event, link)"></a>' +
					'</li>' +
					'<li ng-class="{\'disabled\': currentPage == lastPage}"><a ng-click="paginate($event, currentPage + 1)">&rsaquo;</a></li>' +
					'<li ng-class="{\'disabled\': currentPage == lastPage}"><a ng-click="paginate($event, lastPage)">&raquo;</a></li>' +
				'</ul></div>'

		}
	}]);