namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc factory
     * @module amo.flickrAlbum
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
        .module('amo.flickrAlbum')
        .factory('amoFlickrApiConfigurationFactory', FlickrApiConfigurationFactory);
}
