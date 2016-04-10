namespace amo.flickr.core {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickr.core
     * @name AmoFlickrPhotoController
     * @requires $scope
     */
    export class FlickrPhotoController implements IFlickrPhotoDirectiveBindings {
        imageHeight: string;
        imageSource: string;
        imageWidth: string;
        photo: any;
        size: string;
        thumbnailSize: string;
        thumbnailSource: string;

        /**
         * @ngInject
         */
        constructor(private $scope: ng.IScope) { }

        /**
         * @name AmoFlickrAlbumThumbnailController#$onInit
         * @description Initializes the controller
         */
        private $onInit() {
            this.$scope.$watchGroup([
                'flickrPhoto.photo',
                'flickrPhoto.width',
                'flickrPhoto.height'
            ], (values: Array<number|IFlickrPhoto>) => {
                if (angular.isUndefined(values[0]) || values[0] === null) { return; }

                this.imageHeight = this.getPhotoValue('height');
                this.imageSource = this.getPhotoValue('url');
                this.imageWidth = this.getPhotoValue('width');

                if (angular.isDefined(this.thumbnailSize)) {
                    this.thumbnailSource = this.getPhotoValue('url', this.thumbnailSize);
                }
            });
        }

        /**
         * @name AmoFlickrPhotoController#getPhotoValue
         * @description Returns the value of the specified property based on the photo size
         * @param {String} property Photo property name
         * @param {String} [size] Photo size
         * @returns {String}
         */
        private getPhotoValue(property: string, size?: string): string {
            if (angular.isUndefined(this.photo)) { return null; }

            if (angular.isUndefined(size)) { size = this.size; }

            return this.photo[property + '_' + size];
        }
    }

    angular
        .module('amo.flickr.core')
        .controller('AmoFlickrPhotoController', FlickrPhotoController);
}
