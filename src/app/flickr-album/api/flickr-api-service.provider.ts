namespace amo.flickrAlbum {
    'use strict';

    let _apiKey: string,
        _userId: string;

    export interface IFlickrApiService {
        fetchAlbumList: (userId?: string) => ng.IPromise<Array<Object>>
    }

    /**
     * @ngInject
     * @ngdoc service
     * @module amo.flickrAlbum
     * @name amoFlickrApiService
     * @requires $http
     * @requires $q
     * @requires amoFlickrApiConfigurationFactory
     */
    function FlickrApiService(
        $http: ng.IHttpService,
        $q: ng.IQService,
        amoFlickrApiConfigurationFactory: amo.flickrAlbum.FlickrApiConfigurationFactory) {

        this.fetchAlbumList = fetchAlbumList;

        return this;

        /**
         * @name amoFlickrApiService#get
         * @param {String} method Namespaced method, excluding the "flickr" suffix
         * @param {Object} [config]
         * @returns {Promise}
         */
        function get(method: string, config?: ng.IRequestShortcutConfig) {
            if (angular.isUndefined(config)) { config = {}; }

            if (angular.isUndefined(config.params)) { config.params = {}; }

            angular.extend(config.params, {
                api_key: _apiKey,
                format: 'json',
                method: 'flickr.' + method,
                nojsoncallback: 1
            });

            return $http.get(amoFlickrApiConfigurationFactory.origin, config).then(function(result: any) {
                if (result.data.stat === 'fail') {
                    return $q.reject(result.data);
                }

                return result.data;
            });
        }

        /**
         * @ngdoc method
         * @name amoFlickrApiService#fetchAlbumList
         * @param {String} [userId]
         * @returns {Promise}
         */
        function fetchAlbumList(userId?: string) {
            if (angular.isUndefined(userId)) { userId = _userId; }

            return get('photosets.getList', {
                params: {
                    per_page: 100,
                    primary_photo_extras: 'url_m',
                    user_id: userId
                }
            }).then(function(data) {
                return data.photosets.photoset;
            });
        }
    }

    /**
     * @ngdoc provider
     * @module amo.flickrAlbum
     * @name amoFlickrApiServiceProvider
     */
    export class FlickrApiServiceProvider {

        /**
         * @ngInject
         * @ngdoc method
         * @name amoFlickrApiServiceProvider#$get
         */
        $get = FlickrApiService;

        /**
         * @ngdoc method
         * @name amoFlickrApiServiceProvider#setApiKey
         * @param {String} key API key
         */
        setApiKey(key: string): this {
            _apiKey = key;
            return this;
        }

        /**
         * @ngdoc method
         * @name amoFlickrApiServiceProvider#setUserId
         * @param {String} userId Flickr user ID
         */
        setUserId(userId: string): this {
            _userId = userId;
            return this;
        }
    }

    angular
        .module('amo.flickrAlbum')
        .provider('amoFlickrApiService', FlickrApiServiceProvider);
}
