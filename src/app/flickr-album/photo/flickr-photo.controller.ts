namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name AmoFlickrPhotoController
     * @requires $scope
     */
    export class FlickrPhotoController implements IFlickrPhotoDirectiveBindings {
        imageHeight: string;
        imageSource: string;
        imageWidth: string;
        photo: any;
        size: string;

        /**
         * @ngInject
         */
        constructor($scope: ng.IScope) {
            $scope.$watchGroup([
                'flickrPhoto.photo',
                'flickrPhoto.width',
                'flickrPhoto.height'
            ], (values: Array<number|IFlickrPhoto>) => {
                if (angular.isUndefined(values[0])) { return; }

                this.imageHeight = this.getPhotoValue('height');
                this.imageSource = this.getPhotoValue('url');
                this.imageWidth = this.getPhotoValue('width');
            });
        }

        /**
         * @name AmoFlickrPhotoController#getPhotoValue
         * @description Returns the value of the specified property based on the photo size
         * @param {String} property Photo property name
         * @returns {String}
         */
        private getPhotoValue(property: string): string {
            if (angular.isUndefined(this.photo)) { return null; }

            return this.photo[property + '_' + this.size];
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrPhotoController', FlickrPhotoController);
}
