namespace amo.flickr.core {
    'use strict';

    export interface IFlickrApiService {
        fetchAlbumList: (userId?: string) => ng.IPromise<Array<IFlickrAlbum>>;
        fetchAlbum: (albumId: string, userId?: string) => ng.IPromise<IFlickrAlbum>;
    }

    export interface IFlickrAlbum {
        id: string;
        photo: Array<IFlickrPhoto>;
    }

    export interface IFlickrPhoto {
        height_o: string;
        height_s: string;
        id: string;
        title: string;
        url_o: string;
        url_s: string;
        width_o: string;
        width_s: string;
    }

    /**
     * @ngdoc service
     * @module amo.flickr.core
     * @name amoFlickrApiService
     * @requires $http
     * @requires $q
     * @requires amoFlickrApiConfigurationFactory
     * @requires amoFlickrConfiguration
     */
    export class FlickrApiService {

        /**
         * @ngInject
         */
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private amoFlickrApiConfigurationFactory: FlickrApiConfigurationFactory,
            private amoFlickrConfiguration: IFlickrConfiguration) {
        }

        /**
         * @name amoFlickrApiService#get
         * @description Executes a Flickr GET request
         * @param {String} method Namespaced method, excluding the "flickr" suffix
         * @param {Object} [config]
         * @returns {Promise}
         */
        private get(method: string, config?: ng.IRequestShortcutConfig) {
            if (angular.isUndefined(config)) { config = {}; }

            if (angular.isUndefined(config.params)) { config.params = {}; }

            angular.extend(config.params, {
                api_key: this.amoFlickrConfiguration.apiKey,
                format: 'json',
                method: 'flickr.' + method,
                nojsoncallback: 1
            });

            return this.$http.get(this.amoFlickrApiConfigurationFactory.origin, config).then((result: any) => {
                if (result.data.stat === 'fail') {
                    return this.$q.reject(result.data);
                }

                return result.data;
            });
        }

        /**
         * @ngdoc method
         * @name amoFlickrApiService#fetchAlbum
         * @param {String} albumId
         * @param {String} [userId]
         * @returns {Promise}
         */
        fetchAlbum(albumId: string, userId?: string) {
            if (angular.isUndefined(userId)) { userId = this.amoFlickrConfiguration.userId; }

            return this.get('photosets.getPhotos', {
                params: {
                    extras: 'url_s,url_o',
                    photoset_id: albumId,
                    user_id: userId
                }
            }).then(function(data) {
                return data.photoset;
            });
        }

        /**
         * @ngdoc method
         * @name amoFlickrApiService#fetchAlbumList
         * @param {String} [userId]
         * @returns {Promise}
         */
        fetchAlbumList(userId?: string) {
            if (angular.isUndefined(userId)) { userId = this.amoFlickrConfiguration.userId; }

            return this.get('photosets.getList', {
                params: {
                    per_page: 100,
                    user_id: userId
                }
            }).then(function(data) {
                return data.photosets.photoset;
            });
        }
    }

    angular
        .module('amo.flickr.core')
        .service('amoFlickrApiService', FlickrApiService);
}
