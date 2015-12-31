describe('AmoImageController', function() {
    var target;

    var scopeSpy,
        windowSpy;

    var windowImageSpy;

    beforeEach(module('amo.flickr.core'));

    beforeEach(inject(function($controller) {
        scopeSpy = jasmine.createSpyObj('$scope', [
            '$apply',
            '$watch',
            '$watchGroup',
        ]);

        windowSpy = jasmine.createSpyObj('$window', ['Image']);

        windowImageSpy = jasmine.createSpyObj('Image', ['onload']);
        windowSpy.Image.and.returnValue(windowImageSpy);

        target = $controller('AmoImageController', {
            $scope: scopeSpy,
            $window: windowSpy
        });
    }));

    describe('When initializing an image', function() {
        it('should watch for image source changes', function() {
            expect(scopeSpy.$watch).toHaveBeenCalledWith(
                'image.imageSource',
                jasmine.any(Function)
            );
        });

        it('should watch for image width and height changes', function() {
            expect(scopeSpy.$watchGroup).toHaveBeenCalledWith(
                [
                    'image.width',
                    'image.height',
                ],
                jasmine.any(Function)
            );
        });
    });

    describe('When the image source changes', function() {
        beforeEach(function() {
            spyOn(target, 'computeSize');

            target.imageSource = 'IMAGE SOURCE';
        });

        describe('with an undefined source', function() {
            beforeEach(function() {
                scopeSpy.$watch.calls.argsFor(0)[1]();
            });

            it('should do nothing', function() {
                expect(windowSpy.Image).not.toHaveBeenCalled();
            });
        });

        describe('without a thumbnail', function() {
            beforeEach(function() {
                scopeSpy.$watch.calls.argsFor(0)[1]({});
            });

            it('should reset image loaded state', function() {
                expect(target.isLoaded).toEqual(false);
            });

            it('should set image source', function() {
                expect(windowImageSpy.src).toEqual('IMAGE SOURCE');
            });

            describe('and the image loads', function() {
                beforeEach(function() {
                    windowImageSpy.onload();
                    scopeSpy.$apply.calls.argsFor(0)[0]();
                });

                it('should set image source', function() {
                    expect(target.source).toEqual('IMAGE SOURCE');
                });

                it('should set image loaded state', function() {
                    expect(target.isLoaded).toEqual(true);
                });

                it('should not load full size image', function() {
                    expect(windowSpy.Image.calls.count()).toEqual(1);
                });
            });

            it('should compute image size', function() {
                expect(target.computeSize).toHaveBeenCalled();
            });
        });

        describe('with a thumbnail', function() {
            beforeEach(function() {
                target.thumbnailSource = 'THUMBNAIL SOURCE';

                scopeSpy.$watch.calls.argsFor(0)[1]({});
            });

            it('should set image source', function() {
                expect(windowImageSpy.src).toEqual('THUMBNAIL SOURCE');
            });

            describe('and the thumbnail loads', function() {
                beforeEach(function() {
                    windowImageSpy.onload();
                    scopeSpy.$apply.calls.argsFor(0)[0]();

                    windowImageSpy.onload();
                    scopeSpy.$apply.calls.argsFor(1)[0]();
                });

                it('should load full size image', function() {
                    expect(windowSpy.Image.calls.count()).toEqual(2);
                });

                it('should set image source', function() {
                    expect(target.source).toEqual('IMAGE SOURCE');
                });
            });
        });
    });

    describe('When the image width or height changes', function() {
        beforeEach(function() {
            spyOn(target, 'computeSize');

            scopeSpy.$watchGroup.calls.argsFor(0)[1]();
        });

        it('should compute image size', function() {
            expect(target.computeSize).toHaveBeenCalled();
        });
    });

    /**
     * computeSize
     */
    
    describe('When computing the image size', function() {
        beforeEach(function() {
            target.imageWidth = 400;
            target.imageHeight = 200;
        });

        describe('and the width and height are undefined', function() {
            beforeEach(function() {
                target.computeSize();
            });

            it('should not compute the width and height', function() {
                expect(target.computedHeight).toEqual(null);
                expect(target.computedWidth).toEqual(null);
            });
        });

        describe('and the width is defined', function() {
            beforeEach(function() {
                target.width = 100;

                target.computeSize();
            });

            it('should set width', function() {
                expect(target.computedWidth).toEqual(100);
            });

            it('should compute height', function() {
                expect(target.computedHeight).toEqual(50);
            });

            it('should set left offset', function() {
                expect(target.imageStyle).toEqual({
                    left: '0px'
                });
            });
        });

        describe('and the height is defined', function() {
            beforeEach(function() {
                target.height = 100;

                target.computeSize();
            });

            it('should compute width', function() {
                expect(target.computedWidth).toEqual(200);
            });

            it('should set height', function() {
                expect(target.computedHeight).toEqual(100);
            });

            it('should set left offset', function() {
                expect(target.imageStyle).toEqual({
                    left: '0px'
                });
            });
        });

        describe('and the width and height are defined', function() {
            describe('and the image is landscape', function() {
                beforeEach(function() {
                    target.width = 100;
                    target.height = 100;

                    target.computeSize();
                });

                it('should set width', function() {
                    expect(target.computedWidth).toEqual(100);
                });

                it('should compute height', function() {
                    expect(target.computedHeight).toEqual(50);
                });

                it('should set left offset', function() {
                    expect(target.imageStyle).toEqual({
                        left: '0px'
                    });
                });
            });

            describe('and the image is portrait', function() {
                beforeEach(function() {
                    target.imageWidth = 200;
                    target.imageHeight = 400;

                    target.width = 100;
                    target.height = 100;

                    target.computeSize();
                });

                it('should set width', function() {
                    expect(target.computedWidth).toEqual(50);
                });

                it('should compute height', function() {
                    expect(target.computedHeight).toEqual(100);
                });

                it('should set left offset', function() {
                    expect(target.imageStyle).toEqual({
                        left: '25px'
                    });
                });
            });
        });
    });
});
