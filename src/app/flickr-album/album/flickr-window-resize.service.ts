namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc service
     * @module amo.flickrAlbum
     * @name amoFlickrWindowResizeService
     * @requires $rootScope
     * @requires $window
     */
    export class FlickrWindowResizeService {

        /**
         * @ngInject
         */
        constructor($rootScope: ng.IRootScopeService, $window: ng.IWindowService) {
            $window.addEventListener('resize', function() {
                $rootScope.$broadcast('amo.flickr.windowResize');
            });
        }
    }

    angular
        .module('amo.flickrAlbum')
        .service('amoFlickrWindowResizeService', FlickrWindowResizeService);
}
