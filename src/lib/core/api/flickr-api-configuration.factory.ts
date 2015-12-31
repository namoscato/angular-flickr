namespace amo.flickr.core {
    'use strict';

    /**
     * @ngdoc factory
     * @module amo.flickr.core
     * @name amoFlickrApiConfigurationFactory
     */
    export class FlickrApiConfigurationFactory {

        constructor() {
            return this;
        }

        /**
         * @ngdoc property
         * @name amoFlickrApiConfigurationFactory#origin
         * @returns {String}
         */
        origin: string = 'https://api.flickr.com/services/rest/';
    }

    angular
        .module('amo.flickr.core')
        .factory('amoFlickrApiConfigurationFactory', FlickrApiConfigurationFactory);
}
