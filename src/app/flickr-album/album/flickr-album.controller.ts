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
        album: IFlickrAlbum;
        currentPhoto: IFlickrPhoto;
        thumbnailSize: number;
        userId: string;

        /**
         * @ngInject
         */
        constructor(
            $element: ng.IAugmentedJQuery,
            $scope: ng.IScope,
            amoFlickrApiService: IFlickrApiService,
            amoFlickrConfiguration: IFlickrConfiguration) {

            this.thumbnailSize = amoFlickrConfiguration.thumbnailSize;

            $scope.$watch('flickrAlbum.albumId', (albumId: string) => {
                if (angular.isUndefined(albumId)) { return; }

                amoFlickrApiService.fetchAlbum(albumId, this.userId).then((album) => {
                    this.album = album;
                });
            });

            console.log($element[0].offsetHeight);
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#isPhotoActive
         * @description Determines whether or not the specified photo is active
         * @param {Object} photo
         * @returns {Boolean}
         */
        isPhotoActive(photo: IFlickrPhoto): boolean {
            if (angular.isUndefined(this.currentPhoto)) { return false; }

            return this.currentPhoto.id === photo.id;
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#setPhoto
         * @description Sets the current photo
         * @param {Object} photo
         */
        setPhoto(photo: IFlickrPhoto) {
            this.currentPhoto = photo;
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrAlbumController', FlickrAlbumController);
}
