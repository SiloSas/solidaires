angular.module('solidairesApp')
    .controller('topCtrl', function ($scope, $timeout, $rootScope, $location, articlesFactory, $filter) {
        $scope.news = [];
        /* resize elements */

        function calculContentHeight () {
            var containerHeight = window.innerHeight -
                document.getElementById('top').clientHeight;
            $timeout(function () {
                var waitTop = setInterval(function () {
                    if (containerHeight == window.innerHeight - document.getElementById('top').clientHeight) {
                        clearInterval(waitTop);
                    } else {
                        containerHeight = window.innerHeight - document.getElementById('top').clientHeight;
                    }
                    document.getElementsByClassName('general-contain')[0].style.height = containerHeight + 'px';
                    document.getElementsByClassName('container')[0].style.minHeight = containerHeight - 120 + 'px';
                }, 100);
            }, 200);
            if (window.innerWidth > 900) {
                $rootScope.window = 'large';
            } else if (window.innerWidth < 900  && window.innerWidth > 500) {
                $rootScope.window = 'medium';
            } else if (window.innerWidth < 500) {
                $rootScope.window = 'small';
            }
            console.log($rootScope.window)
        }
        angular.element(document).ready(function () {
            calculContentHeight()
        });
        window.onresize = function () {
            calculContentHeight()
        };
        /* news slider */
        var i = 0;
        function changeNews () {
            document.getElementById('newsContener').classList.remove('fadeOut');
            document.getElementById('newsContener').classList.add('fadeIn');
            $timeout(function () {
                $scope.$apply(function () {
                    console.log($scope.news[i])
                    console.log($scope.news)
                    $scope.newsActive = $scope.news[i];
                    $scope.init = true;
                })
            },0);

            if (i == $scope.news.length -1) {
                i = 0;
            } else {
                i++;
            }
            $timeout(function () {
                document.getElementById('newsContener').classList.remove('fadeIn');
            }, 1000);
            $timeout(function () {
                document.getElementById('newsContener').classList.add('fadeOut');
            }, 7000);
            $timeout(function() {
                changeNews()
            }, 8000)
        }
        articlesFactory.getArticles().then(function (articles) {
            articles = $filter('filter')(articles, 'news', 'category');
            for (var j = 0; j < articles.length; j++) {
                articles[j].content = articles[j].content.toString().replace(/<p>/g, '').replace(/<\/p>/g, '');
            }
            $timeout(function () {
                $scope.$apply(function () {
                    $scope.news = articles;
                    console.log($scope.news)
                    changeNews();
                })
            }, 0)
        });
        $scope.$on('$locationChangeStart', function() {
            document.getElementsByClassName('general-contain')[0].onscroll = '';
            document.getElementsByClassName('general-contain')[0].scrollTop = 0;
            if ($location.path() == '/rubrique/engager') {
                $scope.path = 'sengager';
            }else if ($location.path() == '/rubrique/innovationSociale') {
                $scope.path = 'innovationSociale';
            }else if ($location.path() == '/rubrique/questionsDeSens') {
                $scope.path = 'questionsDeSens';
            } else if ($location.path() == '/rubrique/debats') {
                $scope.path = 'debats';
            } else if ($location.path() == '/rubrique/PEPenmouvement') {
                $scope.path = 'PEPenmouvement';
            } else {
                $scope.path = '';
            }
        })
    });