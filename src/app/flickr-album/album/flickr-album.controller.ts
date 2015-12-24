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
        currentPhotoIndex: number;
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

            $scope.$on('amo.flickr.navigateNext', () => {
                this.$scope.$apply(() => this.navigateNextPhoto());
            });

            $scope.$on('amo.flickr.navigatePrevious', () => {
                this.$scope.$apply(() => this.navigatePreviousPhoto());
            });

            $scope.$watch('flickrAlbum.albumId', (albumId: string) => {
                if (angular.isUndefined(albumId)) { return; }

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
        getCurrentPhoto(): IFlickrPhoto {
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
        isPhotoActive(photo: IFlickrPhoto): boolean {
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
        .module('amo.flickrAlbum')
        .controller('AmoFlickrAlbumController', FlickrAlbumController);
}
