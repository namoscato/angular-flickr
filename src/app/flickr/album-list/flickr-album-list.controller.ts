namespace amo.flickr.albumList {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickr.albumList
     * @name AmoFlickrAlbumListController
     * @requires amoFlickrApiService
     */
    export class FlickrAlbumListController implements IFlickrAlbumListDirectiveBindings {
        currentAlbumId: string;
        albums: Array<amo.flickr.core.IFlickrAlbum>;
        userId: string;

        /**
         * @ngInject
         */
        constructor(amoFlickrApiService: amo.flickr.core.IFlickrApiService) {
            amoFlickrApiService.fetchAlbumList(this.userId).then((albums) => {
                this.albums = albums;

                if (albums.length > 0) {
                    this.currentAlbumId = albums[0].id;
                }
            });
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumListController#isAlbumActive
         * @description Determines whether or not the specified album is active
         * @param {Object} album
         * @returns {Boolean}
         */
        isAlbumActive(album: amo.flickr.core.IFlickrAlbum): boolean {
            return this.currentAlbumId === album.id;
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumListController#setAlbum
         * @param {Object} album
         */
        setAlbum(album: amo.flickr.core.IFlickrAlbum) {
            this.currentAlbumId = album.id;
        }
    }

    angular
        .module('amo.flickr.albumList')
        .controller('AmoFlickrAlbumListController', FlickrAlbumListController);
}
