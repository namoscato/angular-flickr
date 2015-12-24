namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc service
     * @module amo.flickrAlbum
     * @name amoFlickrEventService
     * @requires $rootScope
     * @requires $window
     */
    export class FlickrEventService {

        /**
         * @ngInject
         */
        constructor(
            $document: ng.IDocumentService,
            $rootScope: ng.IRootScopeService,
            $window: ng.IWindowService) {
            $window.addEventListener('resize', function() {
                $rootScope.$broadcast('amo.flickr.windowResize');
            });

            (<any>$document[0]).body.addEventListener('keydown', function(e: JQueryKeyEventObject) {
                switch (e.keyCode) {
                    case 37:
                    case 38:
                        $rootScope.$broadcast('amo.flickr.navigatePrevious');
                        break;
                    case 39:
                    case 40:
                        $rootScope.$broadcast('amo.flickr.navigateNext');
                        break;
                    default:
                        break;
                }
            });
        }
    }

    angular
        .module('amo.flickrAlbum')
        .service('amoFlickrEventService', FlickrEventService);
}
