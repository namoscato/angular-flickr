namespace amo.flickrAlbum {
    'use strict';

    export interface IFlickrPhotoDirectiveBindings {
        height?: number;
        photo: IFlickrPhoto;
        size: string;
        width?: number;
    }

    /**
     * @ngdoc directive
     * @module amo.flickrAlbum
     * @name amoFlickrPhoto
     */
    export class FlickrPhotoDirective implements ng.IDirective {
        bindToController: boolean = true;
        controller: string = 'AmoFlickrPhotoController';
        controllerAs: string = 'flickrPhoto';
        restrict: string = 'E';
        replace: boolean = true;
        scope: Object = {
            height: '=',
            photo: '=',
            size: '@',
            width: '='
        };
        templateUrl: string = 'flickr-album/photo/flickr-photo.html';

        /**
         * @name amoFlickrPhoto#instance
         * @description Returns a new directive instance
         * @returns {Object}
         */
        static instance(): ng.IDirective {
            return new FlickrPhotoDirective();
        }
    }

    angular
        .module('amo.flickrAlbum')
        .directive('amoFlickrPhoto', FlickrPhotoDirective.instance);
}
