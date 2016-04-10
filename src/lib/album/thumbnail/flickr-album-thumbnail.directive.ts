namespace amo.flickr.album {
    'use strict';

    export interface IFlickrAlbumThumbnailDirectiveBindings {
        isPhotoActive: boolean;
        index: number;
        onClick: Function;
        photo: amo.flickr.core.IFlickrPhoto;
        thumbnailSize: number;
    }

    /**
     * @ngdoc directive
     * @module amo.flickr.album
     * @name amoFlickrAlbumThumbnail
     * @restrict A
     */
    export class FlickrAlbumThumbnailDirective implements ng.IDirective {
        bindToController: boolean = true;
        controller: string = 'AmoFlickrAlbumThumbnailController';
        controllerAs: string = 'albumThumbnail';
        restrict: string = 'A';
        replace: boolean = true;
        scope: Object = {
            isPhotoActive: '<',
            index: '@',
            onClick: '&',
            photo: '<amoFlickrAlbumThumbnail',
            thumbnailSize: '@'
        };
        templateUrl = 'flickr/album/thumbnail/flickr-album-thumbnail.html';

        /**
         * @name amoFlickrAlbumThumbnail#instance
         * @description Returns a new directive instance
         * @returns {Object}
         */
        static instance(): ng.IDirective {
            return new FlickrAlbumThumbnailDirective();
        }
    }

    angular
        .module('amo.flickr.album')
        .directive('amoFlickrAlbumThumbnail', FlickrAlbumThumbnailDirective.instance);
}
