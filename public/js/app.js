'use strict';

var app = angular.module('MyApp',['ui.router']);

app.config([
    '$stateProvider',
    function ($stateProvider){
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'templates/home.html'
            })
            .state('about',{
                url:'/about',
                templateUrl:'templates/about.html'
            })
            .state('contact',{
                url:'/contact',
                templateUrl:'templates/contact.html'
            })
            .state('postPage',{
                url:'/postpage',
                templateUrl:'templates/postpage.html',
                controller:'MyApp.PostPageController'
            });
    }
])
//creating post controller
app.controller('MyApp.PostPageController',[
    '$scope','$http',
    function($scope, $http){
        console.log('controller for posts created')
        $scope.post ={};
        $scope.postList =[];
        //create
        $scope.create = function (){
            console.log('creating post',$scope.post);

            //making server call
            $http ({
                url:'http://localhost:3000/posts',

                method:'POST',

                data:$scope.post
            })
            .success(function(response){
                console.log('thisis the response', response);
            })
            .error(function(response){
                console.error('this is the error', response);
            })
        }
        //read
        $scope.readAll = function(){
            console.log('updatepost');
            $http ({
                url:'http://localhost:3000/posts',

                method:'Get',

            })
            .success(function (response){
                console.log('thisis the response', response);
                $scope.postList = response;
            })
            .error(function (response){
                console.error('this is the error', response);
            })
        }
        //update
        $scope.updatePost = function(){
            console.log('update post working');
            $http ({
                url:'http://localhost:3000/posts/'+ $scope.post.id,
                method:'PUT',
                data:$scope.post
            })
            .success(function (response){
                console.log('thisis the response', response);

            })
            .error(function (response){
                console.error('this is the error', response);
            })
        }
        //delete
        $scope.deletePost = function(){
            console.log('delete post working');
            $http ({
                url:'http://localhost:3000/posts/'+                $scope.post.id,
                method:'DELETE',
                data:$scope.post
            })
            .success(function (response){
                console.log('thisis the response', response);

            })
            .error(function (response){
                console.error('this is the error', response);
            })
        }
    }
])
