namespace amo.flickr.album {
    'use strict';

    /**
     * @ngdoc directive
     * @module amo.flickr.album
     * @name amoFlickrAlbumThumbnailList
     * @restrict A
     */
    export class FlickrAlbumThumbnailListDirective implements ng.IDirective {
        bindToController: boolean = true;
        controller: string = 'AmoFlickrAlbumThumbnailListController';
        restrict: string = 'A';

        /**
         * @name amoFlickrAlbumThumbnailList#instance
         * @description Returns a new directive instance
         * @returns {Object}
         */
        static instance(): ng.IDirective {
            return new FlickrAlbumThumbnailListDirective();
        }
    }

    angular
        .module('amo.flickr.album')
        .directive('amoFlickrAlbumThumbnailList', FlickrAlbumThumbnailListDirective.instance);
}
