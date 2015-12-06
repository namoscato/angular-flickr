namespace amo.flickrAlbum {
    'use strict';

    interface IImageStyle {
        left?: string
    }

    /**
     * @ngdoc controller
     * @module amo.flickrAlbum
     * @name AmoImageController
     */
    export class ImageController implements IImageDirectiveBindings {
        computedHeight: number;
        computedWidth: number;
        height: number;
        imageHeight: string;
        imageSource: string;
        imageStyle: IImageStyle = {};
        imageWidth: string;
        width: number;

        /**
         * @ngInject
         */
        constructor($scope: ng.IScope) {
            let width: number;

            $scope.$watchGroup([
                'image.imageSource',
                'image.width',
                'image.height'
            ], (values: Array<number|IFlickrPhoto>) => {
                this.computedHeight = null;
                this.computedWidth = null;

                if (angular.isUndefined(values[0]) ||
                    angular.isUndefined(values[1]) && angular.isUndefined(values[2])) {
                    return;
                }

                if (angular.isUndefined(this.height)) { // Only width is defined
                    this.setWidth(this.width);
                } else if (angular.isUndefined(this.width)) { // Only height is defined
                    this.setHeight(this.height);
                } if (this.getComputedWidth() > this.width) { // Both are defined, landscape
                    this.setWidth(this.width);
                } else { // Both are defined, portrait
                    this.setHeight(this.height);
                }
            });
        }

        private getComputedWidth(): number {
            return this.height / Number(this.imageHeight) * Number(this.imageWidth)
        }

        private setLeftOffset(offset?: number): void {
            if (angular.isUndefined(offset)) {
                offset = (this.width - this.getComputedWidth()) / 2;
            }

            this.imageStyle.left = offset + 'px';
        }

        private setHeight(height: number) {
            this.computedHeight = height;
            this.computedWidth = null;
            this.setLeftOffset();
        }

        private setWidth(width: number) {
            this.computedHeight = null;
            this.computedWidth = width;
            this.setLeftOffset(0);
        }
    }

    angular
        .module('amo.flickrAlbum')
        .controller('AmoImageController', ImageController);
}
