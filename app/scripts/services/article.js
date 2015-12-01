angular.module('solidairesApp').factory('articlesFactory', function ($q, $http, $sce, $filter) {
    var factory = {
        articles : false,
        refactorArticle: function (article) {
            var newArticle = {};
            newArticle.title = article.title;
            newArticle.header = $sce.trustAsHtml(article.content.substring(0, 300) + '...');
            newArticle.content = $sce.trustAsHtml(article.content);
            newArticle.date = article.date;
            newArticle.url = article.ID;
            newArticle.category = article.terms.category.map(function(category) {
                return category.name + ' ';
            }).join();
            if (article.featured_image !== undefined && article.featured_image !== null) {
                newArticle.img = article.featured_image.guid;
            }
            return newArticle
        },
        getArticles : function () {
            var deferred = $q.defer();
            if (factory.articles != false) {
                deferred.resolve(factory.articles);
            } else {
                $http.get('/wp-json/posts')
                    .success(function (data, status) {
                        factory.articles = data.map(factory.refactorArticle);
                        deferred.resolve(factory.articles);
                    }).error(function (data, status) {
                        deferred.reject('erreur');
                    });
            }
            return deferred.promise;
        }
    };
    return factory;
});