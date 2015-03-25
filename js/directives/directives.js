app.directive('navbar', function() {
	return {
		templateUrl: 'views/directives/navbar.html'
	};
});

app.directive('dragSource', ['$rootScope', 'uuid', function($rootScope, uuid) {
    var directive = {};

    directive.restrict = 'A';

    directive.link = function (scope, el, attrs) {
        el.attr("draggable", "true");
        var id = attrs.id;
        if (!attrs.id) {
            id = UuidService.new();
            el.attr("id", id);
        }

        el.get(0).addEventListener("dragstart", function (evt) {
            evt.dataTransfer.setData('text', id);
            $rootScope.$emit("DRAG-START");
        });

        el.get(0).addEventListener("dragend", function (evt) {
            $rootScope.$emit("DRAG-END");
        });
    };

    return directive;
}]);

app.directive('dropTarget', ['$rootScope', 'uuid', function($rootScope, uuid) {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function(scope, el, attrs, controller) {
            var id = attrs.id;
            if (!attrs.id) {
                id = uuid.new()
                angular.element(el).attr("id", id);
            }

            el.get(0).addEventListener("dragover", function(e) {
              if (e.preventDefault) {
                e.preventDefault();
              }

              e.dataTransfer.dropEffect = 'move';
              return false;
            });

            el.get(0).addEventListener("dragenter", function(e) {
              angular.element(e.target).addClass('drag-over');
            });

            el.get(0).addEventListener("dragleave", function(e) {
              angular.element(e.target).removeClass('drag-over');
            });

            el.get(0).addEventListener("drop", function(e) {
              if (e.preventDefault) {
                e.preventDefault();
              }

              if (e.stopPropogation) {
                e.stopPropogation();
              }
                angular.element(e.target).removeClass('drag-over');
                var data = e.dataTransfer.getData("text");

                scope.onDrop({dragEl: data, dropEl: id});
            });

            $rootScope.$on("LVL-DRAG-START", function() {
                var el = document.getElementById(id);
                angular.element(el).addClass("lvl-target");
            });

            $rootScope.$on("LVL-DRAG-END", function() {
                var el = document.getElementById(id);
                angular.element(el).removeClass("lvl-target");
                angular.element(el).removeClass("lvl-over");
            });
        }
    }
}]);