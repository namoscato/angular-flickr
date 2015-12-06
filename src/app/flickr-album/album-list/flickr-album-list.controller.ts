namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name AmoFlickrAlbumListController
     * @requires amoFlickrApiService
     */
    export class FlickrAlbumListController implements IFlickrAlbumListDirectiveBindings {
        currentAlbumId: string;
        albums: Array<IFlickrAlbum>;
        userId: string;

        /**
         * @ngInject
         */
        constructor(amoFlickrApiService: IFlickrApiService) {
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
        isAlbumActive(album: IFlickrAlbum): boolean {
            return this.currentAlbumId === album.id;
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumListController#setAlbum
         * @param {Object} album
         */
        setAlbum(album: IFlickrAlbum) {
            this.currentAlbumId = album.id;
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrAlbumListController', FlickrAlbumListController);
}
