(function (angular) {

    var isLocal = (window.location.host.indexOf('9000') !== -1);

    if (false) {
        var EVENTS_URL          = 'https://127.0.0.1:8080/api/1/services/event/events.json';
        var CREATE_EVENT_URL    = 'http://127.0.0.1:8080/api/1/services/calendar/create-event.json';
        var UPDATE_EVENT_URL    = 'http://127.0.0.1:8080/api/1/services/calendar/update-event.json';
        var DELETE_EVENT_URL    = 'http://127.0.0.1:8080/api/1/services/calendar/delete-event.json';
        var DEPARTMENTS_URL     = 'http://127.0.0.1:8080/api/1/services/departments/departments.json';
        var SEARCH_URL          = 'http://127.0.0.1:8080/api/1/services/search.json';
    } else {
        var EVENTS_URL          = '/api/1/services/event/events.json';
        //var EVENTS_URL          = '/static-assets/api/data.json';
        var CREATE_EVENT_URL    = '/static-assets/api/data.json';
        var UPDATE_EVENT_URL    = '/static-assets/api/data.json';
        var DELETE_EVENT_URL    = '/static-assets/api/data.json';
        var DEPARTMENTS_URL     = '/static-assets/api/departments.json';
        var SEARCH_URL          = '/static-assets/api/data.json';
    }

    function CalendarCtrl($scope, $state, $http, fullCalendarEventParserFilter, eventCleanerFilter) {

        var isFetching = false;
        var DATE_FORMAT = 'MM-DD-YYYY HH:mm';
        var moment = window.moment;
        var ui = $scope.$parent.ui || {
                fromDate: new Date(),
                toDate: moment().add(5, 'weeks').toDate()
            };

        /*
         * View models
         * */
        $scope.$state       = $state;
        $scope.ui           = ui;
        $scope.event        = null;
        $scope.events       = $scope.$parent.events || [];
        $scope.weeks        = null;
        $scope.views        = VIEWS;
        $scope.view         = getCurrentView();
        $scope.departments  = fetchDepartments();
        $scope.eventSources = [eventFetcher, $scope.events];
        $scope.uiConfig     = {
            calendar: {
                height: 450,
                editable: true,
                header: false,
                defaultView: $scope.view.value,
                dayClick: dayClicked,
                eventDrop: eventDrop,
                eventResize: eventResize,
                eventClick: eventClick,
                eventRender: eventRender
            }
        };
        $scope.multiMode    = (!$state.params.id || $state.params.id.split(',').length > 1);

        /*
         * View methods
         * */

        $scope.cancelEventForm  = cancelEventForm;
        $scope.deleteEvent      = deleteEvent;
        $scope.dayClicked       = dayClicked;
        $scope.eventClick       = eventClick;
        $scope.changeView       = changeView;
        $scope.getEventStyle    = getEventStyle;
        $scope.getRowStyle      = getRowStyle;
        $scope.printWeekHeader  = printWeekHeader;
        $scope.prettyDate       = prettyDate;
        $scope.toggleDepartment = toggleDepartment;
        $scope.prev             = prev;
        $scope.today            = today;
        $scope.next             = next;
        $scope.showFC           = showFC;
        $scope.dateFromString   = timeFromString;
        $scope.saveEvent        = saveEvent;
        $scope.duration         = duration;
        $scope.formatDate       = formatDate;

        $scope.$watch('ui.fromDate', weeks);
        $scope.$watch('ui.toDate', weeks);

        $scope.$on('$stateChangeSuccess', function (event, toState) {
            updateCurrentView();
            eventForm('close');
        });

        $(window).resize(function () {
            $scope.$apply();
        });

        fetchEvents();
        fetchTitles();

        function duration(seconds) {
            return moment.duration(seconds, 'seconds').asMinutes() + ' minutes';
        }

        function formatDate(date) {
            return moment(date).format('MMMM D, YYYY');
        }

        function cancelEventForm() {
            eventForm('close');
        }

        function changeView(view) {

            var fcVisibleBefore = showFC(),
                showFullCalendar;

            $scope.view      = view;
            showFullCalendar = showFC();

            if (showFullCalendar) {
                $scope.uiConfig.calendar.defaultView = view.value;
                getCalendar().fullCalendar('changeView', view.value);
            } else {
                if (fcVisibleBefore) {
                    var data = eventCleanerFilter($scope.events);
                    setEvents(data);
                }
            }

        }

        function dayClicked(date, allDay, jsEvent, view) {

            var $elem = $(jsEvent.currentTarget);
            var event = getNewEvent(date, allDay);

            event.departmentId = $elem.siblings('th:first').data('departmentId') || event.departmentId;
            setActiveEvent(event);

            eventForm('open', $elem);

        }

        function deleteEvent() {
            var event = getActiveEvent();
            eventForm('close');
            $http.get(DELETE_EVENT_URL, { params: { id: event.id } })
                .success(function () {
                    // fetchEvents();
                    //-------temp fetchevents-------//
                    $scope.events.forEach((e,i) => {
                        if (e.id === event.id) {
                            $scope.events.splice(i, 1);
                        }
                    })
                 });
        }

        function eventRender(event, element) {
            element.addClass(event.departmentId + '-department');
        }

        function eventForm(operation, $elem) {
            var $pop = $('#eventForm');
            if (!operation) {
                return $pop;
            } else if (operation === 'open') {
                var position = $elem.offset();
                $pop.css({
                    top: position.top + ($elem.height() / 2),
                    left: position.left + ($elem.width() / 2) - ($pop.width() / 2)
                });
                setTimeout(function () {
                    $pop.show();
                });
            } else if (operation === 'close') {
                setActiveEvent(null);
                $pop.hide();
            }
        }

        function eventDrop(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
            saveEvent( cleanEvent(event) );
        }

        function eventResize(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
            saveEvent( cleanEvent(event) );
        }

        function eventClick(event, jsEvent) {

            var e = {};
            angular.extend(e, event);

            e.startDate = moment(event.start).format(DATE_FORMAT);
            e.endDate   = moment(event.end).format(DATE_FORMAT);

            if (typeof event.start === 'object') {
                e.start = event.start.getTime();
                e.end   = event.end.getTime();
            }

            setActiveEvent(e);
            eventForm('open', $(jsEvent.currentTarget));

        }

        function eventFetcher(start, end, callback) {
            fetchEvents(start, end, callback);
        }

        function fetchEvents(start, end, fcCallback) {
            if (!isFetching) {

                return $http.get(EVENTS_URL, {
                    params: {start: start, end: end, contentId: $state.params.id}
                }).success(function (data) {

                    if (showFC()) {
                        data = fullCalendarEventParserFilter(data);
                    }

                    $scope.$parent.asset = null;
                    if (data.length) {
                        setEvents(data);
                        if ($state.params.id) {
                            $scope.$parent.asset = data[0].content;
                        }
                    }

                    isFetching = false;

                });

            }
        }

        function fetchTitles() {
            return $http.get(SEARCH_URL).success(function (data) {
                $scope.titles = data;
            });
        }

        function fetchDepartments() {
            $http.get(DEPARTMENTS_URL)
                .success(function (data) {
                    $scope.departments = data;
                });
        }

        function getCurrentView() {
            for (var i = 0; i < VIEWS.length; ++i) {
                if ($state.current.name === VIEWS[i].sref) {
                    return VIEWS[i];
                }
            }
        }

        function updateCurrentView() {
            $scope.view = getCurrentView();
        }

        function getActiveEvent() {
            return $scope.event || $scope.$parent.event;
        }

        function getNewEvent(date, allDay) {

            (arguments.length === 0) && (date = new Date());
            (arguments.length === 1) && (allDay = false);

            var start = moment(date);
            var end = moment(date).add(1, 'hours');

            return {
                title: 'New Event',
                startDate: start.format(DATE_FORMAT),
                endDate: end.format(DATE_FORMAT),
                start: start.toDate().getTime(),
                end: end.toDate().getTime(),
                allDay: allDay,
                dirty: true,
                contact: '',
                contentId: '/site/components/titles/1af8bb45-c511-87ac-b362-5f356b5af8a5.xml',
                departmentId: 'strategy'
            };
        }

        function getDateObject(date) {
            switch (typeof date) {
                case'string':
                    return new Date(parseInt(date));
                case'number':
                    return new Date(date);
                case 'undefined':
                    return new Date();
                default:
                    return date;
            }
        }

        function getWeekStart(date) {
            date = new Date(date);
            date = getDateObject(date);
            date.setHours(date.getDay() * 24 * -1, 0, 0, 0);
            return date.getTime();
        }

        function getWeekEnd(date) {
            date = getDateObject(date);
            date.setHours(((6 - date.getDay()) * 24) + 23, 59, 59, 0);
            return date.getTime();
        }

        function getWeekPercentage(time) {

            var date = new Date(time);
            var day = date.getDay();
            var hoursWithinDay = date.getHours() + (date.getMinutes() / 60)
            var result = ((((day * 24) + hoursWithinDay) * 100) / 168) / 100;

            return result;

        }

        function getCalendar() {
            return $('[calendar="milestones"]');
        }

        function getEventStyle(event, eventIndex, deptIndex) {
            var top,
                left,
                width,
                style = {},
                eventHeight = $scope.multiMode ? 90 : 25;

            try {
                var evtStartTime            = moment(event.start).format('MM/DD/YYYY'),
                    evtEndTime              = event.end,
                    firstWeekStartTime      = $scope.weeks[0].start,
                    lastWeekEndTime         = $scope.weeks[$scope.weeks.length-1].end,
                    evtStartWeekStartTime   = getWeekStart(evtStartTime),
                    evtEndWeekStartTime     = getWeekStart(evtEndTime),
                    evtStartsBefore         = (evtStartWeekStartTime < firstWeekStartTime),
                    evtEndsAfter            = (evtEndTime > lastWeekEndTime),
                    $departmentElem         = $('[data-department-id="'+event.departmentId+'"]');
                    top = $departmentElem.position().top + (eventIndex * eventHeight) + 5;

                if (evtStartsBefore) {
                    evtStartWeekStartTime = firstWeekStartTime;
                }

                if (evtEndsAfter) {
                    evtEndWeekStartTime = $scope.weeks[$scope.weeks.length - 1].start;
                }

                var $start = $('[data-week-start="'+evtStartWeekStartTime+'"]');
                var startWeekPosition = $start.position();
                var startWeekStartPercentage = getWeekPercentage(evtStartTime);
                var startWeekCellWidth = $start.width();
                left = evtStartsBefore
                    ? (startWeekPosition.left)
                    : (startWeekPosition.left + (startWeekCellWidth * startWeekStartPercentage)) + 1;

                var $end = (evtStartWeekStartTime === evtEndWeekStartTime)
                    ? ($start)
                    : $('[data-week-start="'+evtStartWeekStartTime+'"]');
                var endWeekPosition = ($start === $end) ? startWeekPosition : $end.position();
                var endWeekEndPercentage = getWeekPercentage(evtEndTime);
                var endWeekCellWidth = startWeekCellWidth; // Width should be the same for all cells
                var endWeekEndPosition = endWeekPosition.left + endWeekCellWidth;
                width = (evtEndsAfter
                    ? (endWeekEndPosition - left)
                    : (endWeekEndPosition - left) - (endWeekCellWidth * (1 - endWeekEndPercentage))) + 2;

                style.top   = (top + 'px');
                style.left  = (startWeekPosition.left + 'px');
                style.width = ($start.width() - 10);
                style.marginLeft = "6px";
                style.marginBottom = "5px";
                style.display = !startWeekPosition.left ? "block" : "block";

                if (event.background) {
                    style.background = event.background;
                }

                if (evtStartsBefore) {
                    style.borderTopLeftRadius = 0;
                    style.borderBottomLeftRadius = 0;
                }

                if (evtEndsAfter) {
                    style.borderTopRightRadius = 0;
                    style.borderBottomRightRadius = 0;
                }

            } catch (ex) {
                console.log(ex);
            } finally {
                return style;
            }

        }

        function getRowHeight(department) {
            var height = (getEventsByDepartment(department).length) * ($scope.multiMode ? 90 : 25) + 30;
            return height > 45 ? height : 45;
        }

        function getEventsByDepartment(department) {
            var departmentEvents = [];
            angular.forEach($scope.events, function (event) {
                if (event.departmentId === department.id) {
                    departmentEvents.push(event);
                }
            });
            return departmentEvents;
        }

        function getRowStyle(department) {
            return { height: getRowHeight(department) };
        }

        function getTimeWindowPeriod() {
            var start = getWeekStart(ui.fromDate);
            var end = getWeekEnd(ui.toDate);
            var result = end - start;
            var duration = moment.duration(result, 'milliseconds');
            return Math.ceil(duration.asWeeks());
        }

        function prev() {
            if (showFC()) {
                getCalendar().fullCalendar('prev');
            } else {
                var numOfWeeks = getTimeWindowPeriod();
                var start = moment(ui.fromDate).subtract(numOfWeeks, 'weeks');
                var end = moment(ui.toDate).subtract(numOfWeeks, 'weeks');

                ui.fromDate = start.toDate();
                ui.toDate = end.toDate();
            }
        }

        function printWeekHeader(week) {
            var format = 'MM/DD';
            return moment(week.start).format(format) + ' - ' + moment(week.end).format(format);
        }

        function prettyDate(date) {
            return moment(date).format('MMM DD, YYYY');
        }

        function next() {
            if (showFC()) {
                getCalendar().fullCalendar('next');
            } else {

                var numOfWeeks = getTimeWindowPeriod();
                var start = moment(ui.fromDate).add(numOfWeeks, 'weeks');
                var end = moment(ui.toDate).add(numOfWeeks, 'weeks');

                ui.fromDate = start.toDate();
                ui.toDate = end.toDate();

            }
        }
        function returnMaxID(events) {
            let maxId = 0;
            events.forEach(event => {
                maxId = maxId > event.id ? maxId : event.id;
            });
            return maxId + 1;
        }
        function saveEvent(event) {
            (!event) && (event = getActiveEvent());

            var url = (event.id)
                ? UPDATE_EVENT_URL
                : CREATE_EVENT_URL;

            eventForm('close');
            $http.get(url, { params: event })
                .success(function (response) {
                    if (event.id) {
                        for (var i = 0, $e; i < $scope.events.length; ++i) {
                            $e = $scope.events[i];
                            if ($e.id == event.id) {
                                if (showFC()) {
                                    $e.start = new Date(event.start);
                                    $e.end   = new Date(event.end);
                                } else {
                                    $e.start = event.start;
                                    $e.end   = event.end;
                                }
                                angular.forEach(EVENT_PROPERTIES, function (prop) {
                                    $e[prop] = event[prop]
                                });
                                break;
                            }
                        }
                    } else {
                        event.id = returnMaxID($scope.events);
                        if (showFC()) {
                            var e = fullCalendarEventParserFilter([event]);
                            $scope.events.push(e[0]);
                        } else {
                            $scope.events.push(event);
                        }
                    }
                    setTimeout(function () {
                        $scope.$apply();
                    }, 1000)
                });

        }

        function setActiveEvent(event) {
            $scope.$parent.event = event;
        }

        function setEvents(data) {
            (!data) && (data = []);
            $scope.events.length = 0;
            data.map(function (e) {
                $scope.events.push(e);
            });
        }

        function showFC() {
            return ($scope.view.value in {
                'month':true,
                'agendaWeek':true,
                'agendaDay':true
            });
        }

        function today() {
            if (showFC()) {
                getCalendar().fullCalendar('today');
            } else {

                var numOfWeeks = getTimeWindowPeriod();
                var end = moment().add(numOfWeeks - 1, 'weeks');

                ui.fromDate = new Date();
                ui.toDate = end.toDate();

            }
        }

        function timeFromString(string) {
            if (isNaN(new Date(string).getTime())) {

                var date = new Date();
                var pieces = string.split(' ');
                var datePieces = pieces[0].split('-');
                var hours = pieces[1].split(':');

                hours[0] = parseInt(hours[0]);
                hours[1] = hours[1].toLowerCase().replace('am', '');

                if (hours[1].indexOf('pm') !== -1) {
                    hours[1] = parseInt(hours[1].replace('pm', '').replace(/\s/g, '')) + 12;
                }

                date.setYear(datePieces[2]);
                date.setMonth(datePieces[0]-1);
                date.setDate(datePieces[1]);
                date.setHours(hours[0], hours[1], 0, 0);

                return date.getTime();

            } else {
                return new Date(string).getTime();
            }
        }

        function toggleDepartment(department) {
            department.active = !department.active;
        }

        function weeks() {

            fetchEvents();

            var weeks = [],
                oneWeek = 604800000,
                currentWeekStartTime = getWeekStart(),
                startWeekTime = getWeekStart(ui.fromDate),
                endWeekTime = getWeekStart(ui.toDate),
                start = startWeekTime;

            while(endWeekTime >= start) {
                weeks.push({
                    start: start,
                    end: getWeekEnd(start),
                    active: currentWeekStartTime === start
                });
                start += oneWeek;
            }

            return ($scope.weeks = weeks);

        }

    }

    function fullCalendarEventParser(events) {

        var result = [];

        angular.forEach(events, function (event) {
            var e = {};

            e.start  = new Date(event.start);
            e.end    = new Date(event.end);
            e.allDay = (typeof event.allDay === 'boolean') ? event.allDay : false;
            e.color  = event.background || '';
            angular.forEach(EVENT_PROPERTIES, function (prop) {
                e[prop] = event[prop];
            });

            (event.content) && (e.content = event.content);

            result.push(e);
        });

        return result;

    }

    function cleanEvent(event) {
        var e = {
            start: event.start.getTime(),
            end: event.end.getTime(),
            background: event.color || '',
            allDay: (typeof event.allDay === 'boolean') ? event.allDay : false
        };
        angular.forEach(EVENT_PROPERTIES, function (prop) {
            e[prop] = event[prop];
        });
        (event.content) && (e.content = event.content);
        return e;
    }

    function eventCleaner(events) {

        var result = [];

        angular.forEach(events, function (event) {
            var e = cleanEvent(event)
            result.push(e);
        });

        return result;

    }

    var EVENT_PROPERTIES = [
        'id','title','description','contentId',
        'departmentId','allDay','contact','background'
    ];

    var VIEWS = [
        {
            "label": "Calendar View",
            "sref": "calendar.weekly"
        },
        {
            "label": "Agenda View",
            "sref": "calendar.agenda"
        },
        {
            "label": "Month View",
            "sref": "calendar.monthly",
            "value": "month"
        },
        {
            "label": "Day View",
            "sref": "calendar.daily",
            "value": "agendaDay"
        }
    ];


    var dependencies = ['ui.router','ui.calendar','ui.bootstrap'];
    if (!isLocal) dependencies.push('MACControllers');

    angular.module('mac.calendar', dependencies)
        .controller('CalendarCtrl', CalendarCtrl)
        .filter('fullCalendarEventParser', function() {
            return fullCalendarEventParser;
        })
        .filter('eventCleaner', function () {
            return eventCleaner;
        })
        .filter('contained', function() {
            return function(events, weeks) {

                if (!weeks.length) return [];

                var start = weeks[0].start,
                    end = weeks[weeks.length - 1].end,
                    result = [];

                angular.forEach(events, function (event) {
                    if ( !(event.start > end || event.end < start) ) {
                        result.push(event);
                    }
                });

                return result;

            };
        })
        .directive("popoverHtmlUnsafePopup", function () {
            return {
                restrict: "EA",
                replace: true,
                scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
                templateUrl: "/static-assets/app/calendar/template/popover/popover-html-unsafe-popup.html"
            };
        })
        .directive("popoverHtmlUnsafe", [ "$tooltip", function ($tooltip) {
            return $tooltip("popoverHtmlUnsafe", "popover", "click");
        }])
        .config(function($urlRouterProvider, $stateProvider){
            $urlRouterProvider.otherwise('/weekly');
            $stateProvider
                .state('calendar', {
                    url: '/?id',
                    templateUrl: '/static-assets/app/calendar/templates/calendar-skeleton.html',
                    controller: 'CalendarCtrl',
                    params:  { id: {value: null, dynamic: true} }
                })
                .state('calendar.weekly', {
                    url: 'weekly?from&to',
                    templateUrl: '/static-assets/app/calendar/templates/weekly-view.html',
                    controller: 'CalendarCtrl',
                    params: {
                        id: {value: null},
                        from: {value: '12-30-2018'},
                        to: {value: '1-30-2019'}
                    }
                })
                .state('calendar.agenda', {
                    url: 'agenda',
                    templateUrl: '/static-assets/app/calendar/templates/agenda-view.html',
                    controller: 'CalendarCtrl'
                })
                .state('calendar.monthly', {
                    url: 'monthly',
                    templateUrl: '/static-assets/app/calendar/templates/fc-view.html',
                    controller: 'CalendarCtrl'
                })
                .state('calendar.week', {
                    url: 'week',
                    templateUrl: '/static-assets/app/calendar/templates/fc-view.html',
                    controller: 'CalendarCtrl'
                })
                .state('calendar.daily', {
                    url: 'daily',
                    templateUrl: '/static-assets/app/calendar/templates/fc-view.html',
                    controller: 'CalendarCtrl'
                });
        });

})(angular);
