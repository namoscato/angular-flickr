namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc run
     * @module amo.flickrAlbum
     * @name RunBlock
     * @requires amoFlickrWindowResizeService
     */
    export class RunBlock {

        /**
         * @ngInject
         */
        constructor(amoFlickrWindowResizeService: Object) {}
    }

    /**
     * @ngdoc module
     * @module amo.flickrAlbum
     * @name amo.flickrAlbum
     */
    angular.module('amo.flickrAlbum', []).run(RunBlock);
}
