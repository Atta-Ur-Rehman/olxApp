/**
 * Created by AttaurRehman on 2/17/2016.
 */
/**
 * Created by ATTA-UR- on 15/02/2016.
 */

angular.module('Index', ['ngMaterial', 'firebase'])
    .controller('mainController', function($scope, $firebaseArray ) {

        var token = localStorage.getItem('CurrentEmail');
        if (token)
            $scope.isloggin = true;
        //$scope.postbutton = false;
        $scope.userEmailArray = [{
            email: ""
        }];
        $scope.currentUserEmail = '';
        $scope.urlData = new Firebase("https://checkmydata.firebaseio.com/addpost");
        $(function() {
            //========================================
            //Sign Up
            $("#loadersignup").hide();
            $("#createAccount").click(function(firebase) {
                $("#loadersignup").show();
                var userCreateEmail = $("#userCreateEmail").val();
                var userCreatepassword = $("#userCreatepassword").val();
                console.log(userCreateEmail, userCreatepassword);
                var ref = new Firebase("https://checkmydata.firebaseio.com/");
                ref.createUser({
                    email: userCreateEmail,
                    password: userCreatepassword
                }, function(error, userData) {
                    if (error) {
                        alert("Please Enter Correct Email Address");
                        console.log("Error creating user:", error);
                    } else {
                        alert('Account Created');
                        console.log("Successfully created user account with uid:", userData.uid);
                        window.location.href = '/signin';
                    }
                })
            });
            //======================================================

            $("#signUp").click(function() {
                window.location.href = '/signUp';
            })
            $("#Login").click(function() {
                alert("Hello")
                window.location.href = '/signin';
            })
            $("#createaccount").click(function() {
                //alert("Hello")
                window.location.href = '/signUp';
            })
            $scope.postMyData =  function(){
                window.location.href = '/addpost';
            }
            $("#homePage").click(function(){
                window.location.href = '/';
            })
            $("#title").keypress(function () {
                if(token){
                    console.log('good Work')
                }else{
                    alert("Please Login first");
                    window.location.href = '/'
                }
            })
            //=======================================================
            //Sign In
            $("#loader").hide();

            $("#login").click(function() {
                $("#loader").show();
                //$scope.loader = true;
                var email = $("#userEmail").val();
                var password = $("#userpassword").val();
                var ref = new Firebase("https://checkmydata.firebaseio.com/");
                ref.authWithPassword({
                    email: email,
                    password: password
                }, function(error, authData) {
                    if (error) {
                        alert("Please Enter Valid Email and Password");
                        console.log("Login Failed!", error);
                        $("#loader").hide();
                    } else {
                        $scope.isloggin = true;
                        $scope.currentUserEmail = [];
                        console.log("Authenticated successfully with payload:", authData);
                        //alert(authData.password.email);
                        console.log(authData.password.email);
                        localStorage.setItem('CurrentEmail', authData.token);
                        window.location.href = '/';
                    }
                });
            })
            //===========================================================
            //logout functionality
            $("#logout").click(function(){
                localStorage.clear();
                window.location.href = '/signin';
            })
            //===========================================================
            $("#postData").click(function(authData) {
                alert("Hello World");
                if (authData) {
                    debugger;
                    console.log("User " + authData.uid + " is logged in with " + authData.provider);
                } else {
                    console.log("User is logged out");
                }
            })
            //====================================================
            $scope.imgUrl = [];
            $("#blah").hide();

            function readURL(input) {
                $("#blah").show();
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        console.log(e.target.result)
                        $('#blah').attr('src', e.target.result);
                        $scope.imgUrl.push(e.target.result)
                    }
                    reader.readAsDataURL(input.files[0]);
                }
                //Hide select image button , Only One image use
                $("#imgInp").hide();
            }
            $("#imgInp").change(function() {
                readURL(this);
            });
            //===============================================================
            $scope.addpost = function(getpost) {
                var post = {
                    title: $("#title").val(),
                    description: $("#description").val(),
                    Amount: $("#Amount").val(),
                    number: $("#number").val(),
                    img: $scope.imgUrl.pop()
                }
                console.log(post);
                debugger;
                var postData = new Firebase("https://checkmydata.firebaseio.com/addpost");
                postData.push({
                    title: post.title,
                    description: post.description,
                    Amount: post.Amount,
                    number: post.number,
                    img: post.img
                }, function(err, doc) {
                    if (err)
                        console.log(err)
                })
                console.log("postData");
                console.log(postData);
                // fire ajax request from here and save it into mongodb
                //window.location.href = '/';
            }
            //======================================================================

            var getData = $firebaseArray($scope.urlData).$loaded().then(function(data) {

                console.log(data);
                $scope.ShowAllData = [];
                data.forEach(function(_currentData_) {
                    $scope.ShowAllData.push(_currentData_)
                })
                console.log("olx.ShowAllData");
                console.log($scope.ShowAllData);
            })
            //=========================================View=======================
            $scope.view = function(){
                alert('functionality in process');
            }
        })
    });
