namespace amo.flickr.core {
    'use strict';

    export interface IFlickrPhotoDirectiveBindings {
        height?: number;
        photo: IFlickrPhoto;
        size: string;
        thumbnailSize?: string,
        width?: number;
    }

    /**
     * @ngdoc directive
     * @module amo.flickr.core
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
            thumbnailSize: '@',
            width: '='
        };
        templateUrl: string = 'flickr/core/photo/flickr-photo.html';

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
        .module('amo.flickr.core')
        .directive('amoFlickrPhoto', FlickrPhotoDirective.instance);
}
