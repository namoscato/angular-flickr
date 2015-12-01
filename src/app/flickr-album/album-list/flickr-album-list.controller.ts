namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name amoFlickrAlbumListController
     * @requires amoFlickrApiService
     */
    export class FlickrAlbumListController {
        currentAlbumId: string;
        albums: Array<Object>;

        /**
         * @ngInject
         */
        constructor(amoFlickrApiService: IFlickrApiService) {
            amoFlickrApiService.fetchAlbumList().then((albums) => {
                this.albums = albums;
            });
        }

        /**
         * @ngdoc method
         * @name amoFlickrAlbumListController#setAlbum
         * @param {Object} album
         */
        setAlbum(album: any) {
            this.currentAlbumId = album.id;
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrAlbumListController', FlickrAlbumListController);
}
