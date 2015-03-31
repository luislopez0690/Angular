var app = angular.module("OnlineUniversity", []);
app.controller("OnlineUniversityController",
    function ($scope, $http) {

    //  opens modal with form to add a course
    $scope.AddModal = function () {
        $scope.submitCourse = $scope.addCourse;
        if ($scope.form) {
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
        }
        var today = new Date();
        $scope.newCourse = { name: "", category: "", dateCreated: today, description: "" };
        $('#courseModal').modal('show');
    };

    // opens modal with populated fields
    $scope.EditModal = function (course, index) {
        $scope.submitCourse = $scope.editCourse;
        $scope.editIndex = index;
        course.dateCreated = new Date(course.dateCreated);
        $scope.newCourse = course;
        $('#courseModal').modal('show');
    };

    // updates course 
    $scope.editCourse = function (updatedCourse) {
        $('#courseModal').modal('hide');
        $http.put('/api/course/' + $scope.editIndex, updatedCourse).
		success(function (response) {
		    $scope.courses = response;
		});
    };

    // adds course to database
    $scope.addCourse = function (newCourse) {
        $('#courseModal').modal('hide');
        $http.post('/api/courses', newCourse).
		success(function (response) {
		    $scope.courses = response;
		});
    };

    // opens Delete modal
    $scope.DeleteModal = function (course, index) {
        $scope.removeIndex = index;
        $('#deleteModal').modal('show');
    };

    // removes course at index from database
    $scope.deleteCourse = function () {
        $http.delete('/api/course/' + $scope.removeIndex).
		success(function (response) {
		    $scope.courses = response;
		});
        $('#deleteModal').modal('hide');
    };

    // Initial rendering of courses
    $http.get("/api/courses")
    .success(function (response) {
        $scope.courses = response;
    });

    // formats dateCreated value to be more human-readable
    $scope.formatDate = function (date) {
        date = new Date(date);
        var month = dateFormat(date.getMonth() + 1);
        var day = dateFormat(date.getDate());
        return month + '/' + day + '/' + date.getFullYear();
    };

    // Pads single digit number with leading zeroes
    function dateFormat(n) {
        if (n >= 10)
            return n;
        else
            return "0" + n;
    }

});