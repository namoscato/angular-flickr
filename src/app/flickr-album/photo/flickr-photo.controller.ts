namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name AmoFlickrPhotoController
     */
    export class FlickrPhotoController implements IFlickrPhotoDirectiveBindings {
        imageHeight: string = this.getPhotoValue('height');
        imageSource: string = this.getPhotoValue('url');
        imageWidth: string = this.getPhotoValue('width');
        photo: any;
        size: string;

        /**
         * @name AmoFlickrPhotoController#getPhotoValue
         * @description Returns the value of the specified property based on the photo size
         * @param {String} property Photo property name
         * @returns {String}
         */
        private getPhotoValue(property: string): string {
            return this.photo[property + '_' + this.size];
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoFlickrPhotoController', FlickrPhotoController);
}
