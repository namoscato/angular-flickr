namespace amo.flickr.albumList {
    'use strict';

    export interface IFlickrAlbumListDirectiveBindings {
        userId: string;
    }

    /**
     * @ngdoc directive
     * @module amo.flickr.albumList
     * @name amoFlickrAlbumList
     */
    export class FlickrAlbumListDirective implements ng.IDirective {
        bindToController: boolean = true;
        controller: string = 'AmoFlickrAlbumListController';
        controllerAs: string = 'flickrAlbumList';
        replace: boolean = true;
        restrict: string = 'E';
        scope: IFlickrAlbumListDirectiveBindings = {
            userId: '@'
        };
        templateUrl: string = 'flickr/album-list/flickr-album-list.html';

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
        .module('amo.flickr.albumList')
        .directive('amoFlickrAlbumList', FlickrAlbumListDirective.instance);
}