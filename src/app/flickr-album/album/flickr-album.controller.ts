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
        photoHeight: number;
        photoWidth: number;
        thumbnailSize: number;
        userId: string;

        /**
         * @ngInject
         */
        constructor(
            private $element: ng.IAugmentedJQuery,
            private $scope: ng.IScope,
            amoFlickrApiService: IFlickrApiService,
            private amoFlickrConfiguration: IFlickrConfiguration) {

            this.setPhotoSize();
            this.thumbnailSize = amoFlickrConfiguration.thumbnailSize;

            $scope.$on('amo.flickr.windowResize', () => {
                this.$scope.$apply(() => {
                    this.setPhotoSize();
                });
            });

            $scope.$watch('flickrAlbum.albumId', (albumId: string) => {
                if (angular.isUndefined(albumId)) { return; }

                amoFlickrApiService.fetchAlbum(albumId, this.userId).then((album) => {
                    this.currentPhoto = album.photo.length > 0 ? album.photo[0] : null;
                    this.album = album;
                });
            });
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

        /**
         * @name AmoFlickrAlbumController#setPhotoSize
         * @description Sets the photo size
         */
        private setPhotoSize() {
            this.photoHeight = this.$element[0].offsetHeight - this.amoFlickrConfiguration.thumbnailSize - 2;
            this.photoWidth = this.$element[0].offsetWidth;
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrAlbumController', FlickrAlbumController);
}
