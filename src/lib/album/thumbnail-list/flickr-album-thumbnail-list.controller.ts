namespace amo.flickr.album {
    'use strict';

    /**
     * @ngdoc controller
     * @module amo.flickr.album
     * @name AmoFlickrAlbumThumbnailListController
     * @requires $element
     * @requires $scope
     */
    export class FlickrAlbumThumbnailListController {

        /**
         * @ngInject
         */
        constructor(
            private $element: JQuery,
            private $scope: ng.IScope) {
        }

        /**
         * @name AmoFlickrAlbumThumbnailListController#$onInit
         * @description Initializes the controller
         */
        private $onInit() {
            let element: Element = this.$element[0],
                parentBounds: ClientRect,
                parentWidth: number,
                width: number;

            this.$scope.$on('amo.flickr.thumbnailActive', (event: ng.IAngularEvent, bounds: IFlickrAlbumThumbnailActiveEvent) => {
                parentBounds = element.getBoundingClientRect();
                parentWidth = parentBounds.right - parentBounds.left;
                width = bounds.offsetRight - bounds.offsetLeft;

                if (bounds.offsetRight > parentBounds.right || bounds.offsetLeft < parentBounds.left) {
                    this.$element.animate({
                        scrollLeft: this.$element.scrollLeft() + bounds.positionLeft - ((parentWidth - width) / 2)
                    }, 400);
                }
            });
        }
    }

    angular
        .module('amo.flickr.album')
        .controller('AmoFlickrAlbumThumbnailListController', FlickrAlbumThumbnailListController);
}
