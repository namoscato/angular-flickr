namespace amo.flickr.album {
    'use strict';

    /**
     * @ngdoc run
     * @module amo.flickr.album
     * @name RunBlock
     * @requires amoFlickrEventService
     */
    class RunBlock {

        /**
         * @ngInject
         */
        constructor(amoFlickrEventService: Object) { }
    }

    /**
     * @ngdoc module
     * @module amo.flickr.album
     * @name amo.flickr.album
     */
    angular.module('amo.flickr.album', ['amo.flickr.core']).run(RunBlock);
}
