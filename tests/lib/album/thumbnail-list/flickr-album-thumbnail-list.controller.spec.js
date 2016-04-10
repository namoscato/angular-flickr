describe('AmoFlickrAlbumThumbnailListController', function() {
    var result,
        target;

    var elementSpy,
        scopeSpy;

    var elementItemSpy;

    beforeEach(module('amo.flickr.album'));

    beforeEach(inject(function($controller) {
        elementSpy = jasmine.createSpyObj('$element', [
            'animate',
            'scrollLeft'
        ]);

        elementItemSpy = jasmine.createSpyObj('$element[0]', ['getBoundingClientRect']);
        elementSpy[0] = elementItemSpy;

        scopeSpy = jasmine.createSpyObj('$scope', ['$on']);

        target = $controller('AmoFlickrAlbumThumbnailListController', {
            $element: elementSpy,
            $scope: scopeSpy
        });
    }));

    describe('When loading an album thumbnail list', function() {
        beforeEach(function() {
            target.$onInit();
        });

        beforeEach(function() {
            elementItemSpy.getBoundingClientRect.and.returnValue({
                left: 0,
                right: 100
            });

            elementSpy.scrollLeft.and.returnValue(50);
        });

        it('should listen for thumbnail active events', function() {
            expect(scopeSpy.$on).toHaveBeenCalledWith(
                'amo.flickr.thumbnailActive',
                jasmine.any(Function)
            );
        });

        describe('and active thumbnail is in view', function() {
            beforeEach(function() {
                scopeSpy.$on.calls.argsFor(0)[1](
                    {},
                    {
                        offsetLeft: 10,
                        offsetRight: 90
                    }
                );
            });

            it('should not do anything', function() {
                expect(elementSpy.animate).not.toHaveBeenCalled();
            });
        });

        describe('and active thumbnail is off to the left', function() {
            beforeEach(function() {
                scopeSpy.$on.calls.argsFor(0)[1](
                    {},
                    {
                        offsetLeft: -5,
                        offsetRight: 20,
                        positionLeft: -10
                    }
                );
            });

            it('should center image', function() {
                expect(elementSpy.animate).toHaveBeenCalledWith(
                    {
                        scrollLeft: 2.5
                    },
                    400
                );
            });
        });

        describe('and active thumbnail is off to the right', function() {
            beforeEach(function() {
                scopeSpy.$on.calls.argsFor(0)[1](
                    {},
                    {
                        offsetLeft: 85,
                        offsetRight: 102,
                        positionLeft: 90
                    }
                );
            });

            it('should center image', function() {
                expect(elementSpy.animate).toHaveBeenCalledWith(
                    {
                        scrollLeft: 98.5
                    },
                    400
                );
            });
        });
    });
});
