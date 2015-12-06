namespace amo.flickrAlbum {
    'use strict';

    export interface IFlickrConfiguration {
        apiKey: string;
        thumbnailSize?: number;
        userId?: string;
    }

    let _configuration: IFlickrConfiguration = {
        apiKey: null,
        thumbnailSize: 100
    };


    /**
     * @ngdoc provider
     * @module amo.flickrAlbum
     * @name amoFlickrConfigurationProvider
     */
    export class FlickrConfigurationProvider {

        /**
         * @ngInject
         * @ngdoc factory
         * @name amoFlickrConfiguration#$get
         */
        $get() {
            return _configuration;
        };

        /**
         * @ngdoc method
         * @name amoFlickrConfigurationProvider#setApiKey
         * @param {String} key API key
         * @returns {Object}
         */
        setApiKey(key: string): this {
            _configuration.apiKey = key;
            return this;
        }

        /**
         * @ngdoc method
         * @name amoFlickrConfigurationProvider#setThumbnailSize
         * @param {String} thumbnailSize Thumbnail size
         * @returns {Object}
         */
        setThumbnailSize(thumbnailSize: number): this {
            _configuration.thumbnailSize = thumbnailSize;
            return this;
        }

        /**
         * @ngdoc method
         * @name amoFlickrConfigurationProvider#setUserId
         * @param {String} userId Flickr user ID
         * @returns {Object}
         */
        setUserId(userId: string): this {
            _configuration.userId = userId;
            return this;
        }
    }

    angular
        .module('amo.flickrAlbum')
        .provider('amoFlickrConfiguration', FlickrConfigurationProvider);
}
