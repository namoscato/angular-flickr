namespace amo.flickrAlbum {
    'use strict';

    /**
     * @ngdoc directive
     * @module amo.flickrAlbum
     * @name amoFlickrAlbumList
     */
    export class FlickrAlbumListDirective implements ng.IDirective {
        bindToController: boolean = true;
        controller: string = 'AmoFlickrAlbumListController';
        controllerAs: string = 'flickrAlbumList';
        replace: boolean = true;
        restrict: string = 'E';
        templateUrl: string = 'flickr-album/album-list/flickr-album-list.html';

        /**
         * @name amoFlickrAlbumList#instance
         * @description Returns a new directive instance
         * @returns {Object}
         */
        static instance(): ng.IDirective {
            return new FlickrAlbumListDirective();
        }
    }

    angular
        .module('amo.flickrAlbum')
        .directive('amoFlickrAlbumList', FlickrAlbumListDirective.instance);
}
