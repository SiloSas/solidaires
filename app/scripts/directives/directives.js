angular.module('solidairesApp').directive('ngArticles', function($timeout){
    return{
        restrict : 'C',
        templateUrl:'views/_articles.html',
        link : function (scope, element) {
            $timeout(function () {
                var newHeight = Math.round($(element).innerWidth() * 0.50);
                $(element).css('height', newHeight + 'px');
            }, 200);
        }
    }
});
angular.module('solidairesApp').directive('ngPub', function(){
    return{
        restrict : 'E',
        templateUrl:'views/_add.html',
        link : function (scope, element) {
            console.log($(element).innerHeight());
            var newHeight = (2*($(element).innerWidth() * 0.50));
            $(element).css('height', newHeight + 'px');
        }
    }
});
angular.module('solidairesApp').directive('parallaxBackground', function(){
    return{
        restrict : 'C',
        link : function (scope, element) {
            var newHeight = window.innerWidth * 0.296076980015;
            $(element).css('height', newHeight + 'px');
            //var comeBackFromBottom = false;
            document.getElementsByClassName('general-contain')[0].onscroll = function () {
                var share = document.getElementById('shareBtnsBottom');
                var shareTop = document.getElementById('shareBtnsTop');
                if (document.getElementsByClassName('general-contain')[0].scrollTop < newHeight -
                    document.getElementsByClassName('general-contain')[0].scrollTop / 8 &&
                    window.innerWidth > 900) {
                    document.getElementsByClassName('parallax-background')[0].style.marginTop =
                        (document.getElementsByClassName('general-contain')[0].scrollTop) -
                        (document.getElementsByClassName('general-contain')[0].scrollTop / 8) + 'px';
                }
                /*if (document.getElementsByClassName('general-contain')[0].scrollTop >=
                    document.getElementsByClassName('general-contain')[0].scrollHeight -
                    document.getElementsByClassName('general-contain')[0].clientHeight - 150
                    && comeBackFromBottom == false) {
                    shareTop.classList.add('fadeOut')
                    share.classList.add('fadeIn')
                    setTimeout(function () {
                        share.classList.remove('opacity0')
                        shareTop.classList.add('opacity0')
                        shareTop.classList.remove('fadeOut')
                        share.classList.remove('fadeIn')
                    }, 800)
                    comeBackFromBottom = true;
                } else if (comeBackFromBottom == true &&
                    document.getElementsByClassName('general-contain')[0].scrollTop <
                    document.getElementsByClassName('general-contain')[0].scrollHeight -
                    document.getElementsByClassName('general-contain')[0].clientHeight - 150 -share.clientHeight) {
                    share.classList.add('fadeOut')
                    shareTop.classList.add('fadeIn')
                    comeBackFromBottom = false;
                    setTimeout(function () {
                        shareTop.classList.remove('opacity0')
                        share.classList.add('opacity0')
                        share.classList.remove('fadeOut')
                        shareTop.classList.remove('fadeIn')
                    }, 800)
                }*/
            };
        }
    }
});
angular.module('solidairesApp').directive('parallaxContent', function(){
    return{
        restrict : 'C',
        link : function (scope, element) {
            var newHeight = window.innerWidth * 0.296076980015;
            $(element).css('margin-top', newHeight + 'px');
        }
    }
});
angular.module('solidairesApp').directive('uneContentContener', function(){
    return{
        restrict : 'C',
        link : function (scope, element) {
            var newHeight = window.innerWidth * 0.296076980015;
            $(element).css('min-height', newHeight + 'px');
        }
    }
});