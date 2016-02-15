namespace amo.flickr.album {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickr.album
     * @name AmoFlickrAlbumController
     * @requires $element
     * @requires $scope
     * @requires amoFlickrApiService
     * @requires amoFlickrConfiguration
     */
    export class FlickrAlbumController implements IFlickrAlbumDirectiveBindings {
        albumId: string;
        album: amo.flickr.core.IFlickrAlbum;
        currentPhotoIndex: number = -1;
        photoHeight: number;
        photoWidth: number;
        thumbnailSize: number;
        userId: string;

        /**
         * @ngInject
         */
        constructor(
            private $element: JQuery,
            private $scope: ng.IScope,
            amoFlickrApiService: amo.flickr.core.IFlickrApiService,
            private amoFlickrConfiguration: amo.flickr.core.IFlickrConfiguration) {

            this.setPhotoSize();
            this.thumbnailSize = amoFlickrConfiguration.thumbnailSize;

            $scope.$on('amo.flickr.windowResize', () => {
                this.$scope.$apply(() => this.setPhotoSize());
            });

            $scope.$on('amo.flickr.navigateNext', () => {
                this.$scope.$apply(() => this.navigateNextPhoto());
            });

            $scope.$on('amo.flickr.navigatePrevious', () => {
                this.$scope.$apply(() => this.navigatePreviousPhoto());
            });

            $scope.$watch('flickrAlbum.albumId', (albumId: string) => {
                if (!albumId) { return; }

                amoFlickrApiService.fetchAlbum(albumId, this.userId).then((album) => {
                    this.currentPhotoIndex = album.photo.length > 0 ? 0 : -1;
                    this.album = album;
                });
            });
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#getCurrentPhoto
         * @description Determines whether or not the specified photo is active
         * @param {Object} photo
         * @returns {Boolean}
         */
        getCurrentPhoto(): amo.flickr.core.IFlickrPhoto {
            if (angular.isUndefined(this.album)) { return null; }

            return this.album.photo[this.currentPhotoIndex];
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#isPhotoActive
         * @description Determines whether or not the specified photo is active
         * @param {Object} photo
         * @returns {Boolean}
         */
        isPhotoActive(photo: amo.flickr.core.IFlickrPhoto): boolean {
            if (this.currentPhotoIndex < 0) { return false; }

            return this.getCurrentPhoto().id === photo.id;
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#navigateNextPhoto
         * @description Navigates to the next photo
         */
        navigateNextPhoto() {
            if (angular.isDefined(this.album) && this.currentPhotoIndex >= this.album.photo.length - 1) {
                return;
            }

            this.currentPhotoIndex++;
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#navigatePreviousPhoto
         * @description Navigates to the previous photo
         */
        navigatePreviousPhoto() {
            if (this.currentPhotoIndex <= 0) { return; }

            this.currentPhotoIndex--;
        }

        /**
         * @ngdoc method
         * @name AmoFlickrAlbumController#setPhotoIndex
         * @description Sets the current photo index
         * @param {Number} index
         */
        setPhotoIndex(index: number) {
            this.currentPhotoIndex = index;
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
        .module('amo.flickr.album')
        .controller('AmoFlickrAlbumController', FlickrAlbumController);
}
