namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name amoFlickrAlbumListController
     * @requires amoFlickrApiService
     */
    export class FlickrAlbumListController {

        /**
         * @ngInject
         */
        constructor(amoFlickrApiService: amo.flickrAlbum.IFlickrApiService) {
            amoFlickrApiService.fetchAlbumList().then((albums) => {
                this.albums = albums;
            });
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrAlbumListController', FlickrAlbumListController);
}
