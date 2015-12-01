namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name AmoFlickrAlbumController
     * @requires $scope
     * @requires amoFlickrApiService
     */
    export class FlickrAlbumController implements IFlickrAlbumDirectiveBindings {
        albumId: string;
        album: Object;
        currentPhoto: Object;

        /**
         * @ngInject
         */
        constructor(
            $scope: ng.IScope,
            amoFlickrApiService: IFlickrApiService) {

            $scope.$watch('flickrAlbum.albumId', (albumId: string) => {
                if (angular.isUndefined(albumId)) { return; }

                amoFlickrApiService.fetchAlbum(albumId).then((album) => {
                    this.album = album;
                });
            });
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#setPhoto
         * @description Sets the current photo
         * @param {Object} photo
         */
        setPhoto(photo: Object) {
            this.currentPhoto = photo;
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrAlbumController', FlickrAlbumController);
}
