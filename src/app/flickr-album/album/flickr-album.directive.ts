namespace amo.flickrAlbum {
    'use strict';

    export interface IFlickrAlbumDirectiveBindings {
        albumId: string;
    }

    /**
     * @ngdoc directive
     * @module amo.flickrAlbum
     * @name amoFlickrAlbum
     */
    export class FlickrAlbumDirective implements ng.IDirective {
        bindToController: boolean = true;
        controller: string = 'AmoFlickrAlbumController';
        controllerAs: string = 'flickrAlbum';
        restrict: string = 'E';
        replace: boolean = true;
        scope: IFlickrAlbumDirectiveBindings = {
            albumId: '='
        };
        templateUrl: string = 'flickr-album/album/flickr-album.html';

        /**
         * @name amoFlickrAlbumList#instance
         * @description Returns a new directive instance
         * @returns {Object}
         */
        static instance(): ng.IDirective {
            return new FlickrAlbumDirective();
        }
    }

    angular
        .module('amo.flickrAlbum')
        .directive('amoFlickrAlbum', FlickrAlbumDirective.instance);
}
