describe('amoFlickrEventService', function() {
    var target;

    var documentSpy,
        rootScopeSpy,
        windowSpy;

    var documentBodySpy;

    beforeEach(module('amo.flickr.album'));

    beforeEach(module(function($provide) {
        $provide.service('$document', function() {
            documentBodySpy = jasmine.createSpyObj('$document[0].body', ['addEventListener']);

            documentSpy = [
                {
                    body: documentBodySpy
                }
            ];

            return documentSpy;
        });

        $provide.service('$rootScope', function() {
            rootScopeSpy = jasmine.createSpyObj('$rootScope', ['$broadcast']);
            return rootScopeSpy;
        });

        $provide.service('$window', function() {
            windowSpy = jasmine.createSpyObj('$window', ['addEventListener']);
            return windowSpy;
        });
    }));

    beforeEach(inject(function(amoFlickrEventService) {
        target = amoFlickrEventService;
    }));

    describe('When initializing the Flickr event service', function() {
        it('should listen for window resize events', function() {
            expect(windowSpy.addEventListener).toHaveBeenCalledWith(
                'resize',
                jasmine.any(Function)
            );
        });

        it('should listen for keydown events', function() {
            expect(documentBodySpy.addEventListener).toHaveBeenCalledWith(
                'keydown',
                jasmine.any(Function)
            );
        });
    });

    describe('When the window resizes', function() {
        beforeEach(function() {
            windowSpy.addEventListener.calls.argsFor(0)[1]();
        });

        it('should broadcast window resize event', function() {
            expect(rootScopeSpy.$broadcast).toHaveBeenCalledWith('amo.flickr.windowResize');
        });
    });

    describe('When pressing down on the', function() {
        describe('left array key', function() {
            beforeEach(function() {
                documentBodySpy.addEventListener.calls.argsFor(0)[1]({
                    keyCode: 37
                });
            });

            it('should broadcast navigate previous event', function() {
                expect(rootScopeSpy.$broadcast).toHaveBeenCalledWith('amo.flickr.navigatePrevious');
            });
        });

        describe('up array key', function() {
            beforeEach(function() {
                documentBodySpy.addEventListener.calls.argsFor(0)[1]({
                    keyCode: 38
                });
            });

            it('should broadcast navigate previous event', function() {
                expect(rootScopeSpy.$broadcast).toHaveBeenCalledWith('amo.flickr.navigatePrevious');
            });
        });

        describe('right array key', function() {
            beforeEach(function() {
                documentBodySpy.addEventListener.calls.argsFor(0)[1]({
                    keyCode: 39
                });
            });

            it('should broadcast navigate previous event', function() {
                expect(rootScopeSpy.$broadcast).toHaveBeenCalledWith('amo.flickr.navigateNext');
            });
        });

        describe('down array key', function() {
            beforeEach(function() {
                documentBodySpy.addEventListener.calls.argsFor(0)[1]({
                    keyCode: 40
                });
            });

            it('should broadcast navigate previous event', function() {
                expect(rootScopeSpy.$broadcast).toHaveBeenCalledWith('amo.flickr.navigateNext');
            });
        });

        describe('some key', function() {
            beforeEach(function() {
                documentBodySpy.addEventListener.calls.argsFor(0)[1]({
                    keyCode: 36
                });

                documentBodySpy.addEventListener.calls.argsFor(0)[1]({
                    keyCode: 41
                });
            });

            it('should not broadcast any navigation event', function() {
                expect(rootScopeSpy.$broadcast).not.toHaveBeenCalled();
            });
        });
    });
});
