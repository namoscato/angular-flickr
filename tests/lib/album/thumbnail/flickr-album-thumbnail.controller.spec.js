describe('AmoFlickrAlbumThumbnailController', function() {
    var result,
        target;

    var elementSpy,
        scopeSpy;

    var elementItemSpy;

    beforeEach(module('amo.flickr.album'));

    beforeEach(inject(function($controller) {
        elementSpy = jasmine.createSpyObj('$element', ['position']);
        elementSpy.position.and.returnValue({
            left: 'POSITION LEFT'
        });

        elementItemSpy = jasmine.createSpyObj('$element[0]', ['getBoundingClientRect']);
        elementItemSpy.getBoundingClientRect.and.returnValue({
            left: 'OFFSET LEFT',
            right: 'OFFSET RIGHT'
        });

        elementSpy[0] = elementItemSpy;

        scopeSpy = jasmine.createSpyObj('$scope', ['$emit']);

        target = $controller('AmoFlickrAlbumThumbnailController', {
            $element: elementSpy,
            $scope: scopeSpy
        });

        target.onClick = jasmine.createSpy('onClick');
    }));

    describe('When the thumbnail bindings change', function() {
        describe('and the photo becomes inactive', function() {
            beforeEach(function() {
                target.$onChanges({
                    isPhotoActive: {
                        currentValue: false
                    }
                });
            });

            it('should do nothing', function() {
                expect(scopeSpy.$emit).not.toHaveBeenCalled();
            });
        });

        describe('and the photo becomes active', function() {
            beforeEach(function() {
                target.$onChanges({
                    isPhotoActive: {
                        currentValue: true
                    }
                });
            });

            it('should emit event', function() {
                expect(scopeSpy.$emit).toHaveBeenCalledWith(
                    'amo.flickr.thumbnailActive',
                    {
                        offsetLeft: 'OFFSET LEFT',
                        offsetRight: 'OFFSET RIGHT',
                        positionLeft: 'POSITION LEFT'
                    }
                );
            });
        });
    });

    /**
     * setPhotoIndex
     */
    
    describe('When setting the photo index', function() {
        beforeEach(function() {
            target.index = 'INDEX';

            target.setPhotoIndex();
        });

        it('should set the photo index', function() {
            expect(target.onClick).toHaveBeenCalledWith({
                index: 'INDEX'
            });
        });
    });
});
