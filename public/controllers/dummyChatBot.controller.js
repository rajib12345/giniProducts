var app = angular.module("myApp", []);
// custom directive to make the html as safe
app.filter('unsafe', function($sce) {
return function(val) {
    return $sce.trustAsHtml(val);
  };
});
app.directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      setTimeout(function(){
        $('#geckoChatContainer').mCustomScrollbar("scrollTo","bottom");

      }, 500)
      // scope.$emit('LastElem');
    }

  };
});
app.directive('myMainDirective', function() {
  return function(scope, element, attrs) {
  };
});
app.controller("geckoControleller", ["$scope", function($scope){
    console.log("calling gecko controller.js file...");

    var client = io.connect();
    $scope.test = "test";
    $scope.chatContainer = [];
    $scope.currentQuery = '';
    $scope.currentUser = '';
    $scope.questionAnswerSession = [];
    $scope.questionBankContainer = [];
    $scope.passcodeStatus = false;
    $scope.realQuestionBank = [];
    $scope.questionAnswerResult = [];
    $scope.answeredIds = [];
    $scope.customizedQuestionBank = [];
    $scope.scheduleDate = '';
    $scope.questionChangeInterval = 10000;
    $scope.skipQuestionFlag = 0;
    $scope.currentQuestionIndex = '';
    $scope.passcodeInfo = {};
    $scope.query = '';
    $scope.showExamTimer = false;
    $scope.showZeroTimer = false;
    $scope.finalSubmitStatus = 0;
    $scope.totalExamTime = '';
    $scope.modalAreaHidden = '';

    //--------- timer section ----------
    $scope.startTimerHr = '';
    $scope.startTimerMnt = '';
    $scope.startTimerSec = '';
    var finalSubmitStatus = 0;
    $scope.acceptTestFlag = 0;
    $scope.acceptTestResponseFlag = 0;
    $scope.pevJobAspectsFlag = 0;
    $scope.companyJoiningExpFlag = 0;
    $scope.queryMsgDisableStatus = true;
    // $scope.queryMsgStatusFlag = 0;
    var userInitialQuestionAnsResult = {};


    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
          if(fn && (typeof(fn) === 'function')) {
            fn();
          }
        } else {
          this.$apply(fn);
        }
    };

    var processAfterAcceptTest = function(){
        var chatObject = {};
        // $scope.queryMsg = '';
        $scope.acceptTestFlag = 0;
        $scope.acceptTestResponseFlag = 1;
        var output = '';

        userInitialQuestionAnsResult["What makes you think you are better suited than they are?"] = $scope.queryMsg;
        $scope.queryMsg = '';
        if($scope.passcodeInfo.interview_level === 'fresher'){
            output = 'Did you find the Job description suitable to your skills?';
        }else{
            output = 'Very well. Does the Job Description look similar to what you had in your previous organization?';
        }
        userInitialQuestionAnsResult[output] = $scope.currentQuery;
        chatObject["input"] = $scope.currentQuery;
        chatObject["output"] = output;
        $scope.chatContainer.push(chatObject);

    };
    var processAfterAcceptTestResponse = function(){
        var chatObject = {};
        var output = '';
        userInitialQuestionAnsResult["Did you find the Job description suitable to your skills?"] = $scope.queryMsg;

        if($scope.passcodeInfo.interview_level === 'fresher'){
            output = 'Do you have any previous experience of training or apprenticeship?';
        }else{
            output = 'So what aspects were different in your previous job?';
        }

        chatObject["input"] = $scope.currentQuery;
        chatObject["output"] = output;
        $scope.chatContainer.push(chatObject);
        $scope.queryMsg = '';
        $scope.acceptTestResponseFlag = 0;
        $scope.pevJobAspectsFlag = 1;
    };
    var processPrevJobAspectsResponse = function(){
        var chatObject = {};
        userInitialQuestionAnsResult["Do you have any previous experience of training or apprenticeship?"] = $scope.queryMsg;

        chatObject["input"] = $scope.currentQuery;
        chatObject["output"] = 'If you make it to the top in the evaluation, how keen would you be to join us?';

        $scope.chatContainer.push(chatObject);
        $scope.queryMsg = '';
        $scope.pevJobAspectsFlag = 0;
        $scope.companyJoiningExpFlag = 1;
    };
    var processCompanyJoiningExpressionResponse = function(){
        $("#queryMsg").attr("disabled", true);
        var chatObject = {};
        var output = '';
        userInitialQuestionAnsResult["If you make it to the top in the evaluation, how keen would you be to join us?"] = $scope.queryMsg;

        chatObject["input"] = $scope.currentQuery;
        output += '<em style="color: #f2bf4e; font-weight: 600; font-size:18px; ">That\'s promising! Coming back to your evaluation, let\'s start with the aptitude round. Please note you will have 20 mins to complete this to qualify for the next rounds.  I would advise you to read the questions carefully before you choose to answer. <br> If you do not know an answer you can just type skip and we will move on to the next question. <br> Wish you all the best.</em><br>';
        output += '<br><button type="button" class="btn btn-block" id="start" style="border-top: 1px solid #555;" onclick="startInterview(this.id)">Start</button>';
        chatObject["output"] = output;
        $scope.chatContainer.push(chatObject);
        $scope.queryMsg = '';
        $scope.companyJoiningExpFlag = 0;

    };
    window.startInterview = function(id){
      $scope.$apply(function(){
        //$scope.queryMsgStatusFlag = 1;
        //document.getElementById(queryMsg).disabled = true;
        console.log("\n\n ----------------------------------------\n\n");
        console.log("initial question ans: ", JSON.stringify(userInitialQuestionAnsResult));
        console.log("\n\n ----------------------------------------\n\n");

        $scope.queryMsgDisableStatus = true;
        document.getElementById("start").disabled = true;
        document.getElementById("cancelTest").disabled = true;
        var chatObject = {};
        var btnval = document.getElementById(id).value;
        chatObject["input"] = btnval;
        chatObject["output"] = '';
        $scope.chatContainer.push(chatObject);
        client.emit('start-interview',{passcodeInfo : $scope.passcodeInfo});
      });

    }

    $scope.sendMsgByEnter = function(keyEvent, queryMsg){
          if(queryMsg === undefined){
              return;
          }

          $scope.currentQuery = queryMsg;
          console.log("accept test flag: ", $scope.acceptTestFlag);
          // if(queryMsg === ' ' || queryMsg === undefined){


            if (keyEvent.which === 13){

                  queryMsg = queryMsg.replace(/\s\s+/g, ' ');
                  if(queryMsg === '' || queryMsg === undefined){
                    console.log("querymsg : ", queryMsg);
                    var chatObject = {};
                    chatObject["input"] = '';
                    chatObject["output"] = 'I am sorry that is a little out of my league.<br> Can you please give response in proper format.';
                    $scope.chatContainer.push(chatObject);
                  }else{
                    if($scope.acceptTestFlag === 1){
                        $scope.safeApply(processAfterAcceptTest);
                    }else if($scope.acceptTestResponseFlag === 1){
                        $scope.safeApply(processAfterAcceptTestResponse);
                    }else if($scope.pevJobAspectsFlag === 1){
                        $scope.safeApply(processPrevJobAspectsResponse);
                    }else if($scope.companyJoiningExpFlag === 1){
                      $scope.safeApply(processCompanyJoiningExpressionResponse);
                    }else{
                      console.log("-------------- emeting event query-msg -------------");
                      $scope.queryMsg = '';
                      client.emit('query-msg', {queryMsg: queryMsg});
                    }
                  }

              }

    }


    $scope.sendPasscodeByEnter = function(keyEvent, passcode){
      if (keyEvent.which === 13){
          $scope.checkPasscode(passcode);
        }
    }

    $scope.sendMsg = function(queryMsg){
        if(queryMsg === undefined){
            return;
        }
        console.log("query : ", queryMsg);
        queryMsg = queryMsg.replace(/\s\s+/g, ' ');
        $scope.queryMsg = '';
        $scope.query = queryMsg;
        $scope.currentQuery = queryMsg;
        if(queryMsg === '' || queryMsg === undefined){
          var chatObject = {};
          chatObject["input"] = '';
          chatObject["output"] = 'I am sorry that is a little out of my league.<br> Can you please give response in proper format.';
          $scope.chatContainer.push(chatObject);
        }else{
          if($scope.acceptTestFlag === 1){
              $scope.safeApply(processAfterAcceptTest);
          }else if($scope.acceptTestResponseFlag === 1){
              $scope.safeApply(processAfterAcceptTestResponse);
          }else if($scope.pevJobAspectsFlag === 1){
              $scope.safeApply(processPrevJobAspectsResponse);
          }else if($scope.companyJoiningExpFlag === 1){
              $scope.safeApply(processCompanyJoiningExpressionResponse);
          }else{
              console.log("-------------- emeting event query-msg -------------");
              $scope.queryMsg = '';
              client.emit('query-msg', {queryMsg: queryMsg});
          }
        }


    }

    // functionality to validate the passcode
    $scope.checkPasscode = function(passcode){
        if(passcode === undefined || passcode === ''){

        }else{
          console.log("passcode: ", passcode);
          client.emit('validate-passcode', {passcode: passcode});
          $scope.passcode = '';
        }
    }

    // process GREETING RESPONSE EVENT
    client.on('greeting-response', function(data){
      $scope.$apply(function(){
        var chatObject = {};
        var output = data.onGreetingMsg.returnMsg;

        chatObject["input"] = $scope.currentQuery;
        chatObject["output"] = output;
        $scope.chatContainer.push(chatObject);
      })

    });



    client.on('user-job-expression-response', function(data){
        //console.log("job exp evet result: ", data);
        $scope.$apply(function(){
            var chatObject = {};
            var output = data.returnMsg;

            chatObject["input"] = $scope.currentQuery;
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
        })
    })

    client.on('user-expression-to-company-response', function(data){
        //console.log("job exp evet result: ", data);
        $scope.$apply(function(){
            var chatObject = {};
            var output = data.returnMsg;

            chatObject["input"] = $scope.currentQuery;
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
            client.emit('start-interview',{passcodeInfo : $scope.passcodeInfo});
        })
    })

    client.on('user-work-experience-response', function(data){
        //console.log("job exp evet result: ", data);
        $scope.$apply(function(){
            var chatObject = {};
            var output = data.returnMsg;

            chatObject["input"] = $scope.currentQuery;
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
        })
    })

    client.on('default-gecko-response', function(data){
        //console.log("job exp evet result: ", data);
        $scope.$apply(function(){
            var chatObject = {};
            var output = data.returnMsg;

            chatObject["input"] = $scope.currentQuery;
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
        })
    })

    client.on('user-share-experience', function(data){
        //console.log("job exp evet result: ", data);
        $scope.$apply(function(){
            var chatObject = {};
            var output = data.returnMsg;

            chatObject["input"] = $scope.currentQuery;
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
        })
    })


    client.on('generate-salary-information', function(data){
        $scope.$apply(function(){
            var chatObject = {};
            var output = data.returnMsg;

            chatObject["input"] = $scope.currentQuery;
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
        })
    })

    $scope.count = function() {
        // console.log("calling the counter function");
         var startTime = document.getElementById('hms').innerHTML;
        //  console.log("start time: ",startTime);
         var pieces = startTime.split(" ");
         var time = new Date();
         time.setHours(pieces[0]);
         time.setMinutes(pieces[1]);
         time.setSeconds(pieces[2]);
         var timedif = new Date(time.valueOf() - 1000);
         var newtime = timedif.toTimeString().split(" ")[0];
         newtime = newtime.replace(/:/g, " ");
        //  console.log("new time: ", newtime);
         document.getElementById('hms').innerHTML=newtime;
         setTimeout($scope.count, 1000);
  }

    $scope.questionTimerSection = function(){
      console.log("calling the question timer section ");
      // var startTime = document.getElementById('questionTimer').value;
      // var startTime = '00:02:00';
      var startTime = $("#questionTimer").val();
      console.log("starttime: ", startTime);
      var pieces = startTime.split(":");
      var time = new Date();
      time.setHours(pieces[0]);
      time.setMinutes(pieces[1]);
      time.setSeconds(pieces[2]);
      var timedif = new Date(time.valueOf() - 1000);
      var newtime = timedif.toTimeString().split(" ")[0];
      // document.getElementById('questionTimer').innerHTML=newtime;
      $("#questionTimer").val(newtime);
      setTimeout($scope.questionTimerSection, 1000);
  }

  client.on('generate-question-bank', function(data){
        console.log("----------------  GENERATE QUESTION BANK SECTION  -----------------\n\n");
        var counter = 10000;
        var tmpMyFun = 0;
        var interval = 0;
        $scope.clickSubmitAnswerFlag = 0;
        $scope.clickSkipQuestionFlag = 0;
        $scope.trackAutoGenerateQuestions = [];

        $scope.trackSkipQuestions = [];
        $scope.totalQuestion = data.totalQuestion;
        $scope.totalInterviewTime = data.totalTime;
        $scope.questionBankContainer = data.formattedQuestionBank;
        $scope.realQuestionBank = data.realQuestionBank;
        $scope.currentQuestionIndex = 0;
        var tempCategoryPosition = {};
        var keyIndex = 0;
        var start = 0;
        var prevLength = '';
        for(var key in $scope.realQuestionBank ) {
          if(keyIndex === 0){
            tempCategoryPosition[key] = 0;
            prevLength = $scope.realQuestionBank[key].length;
            keyIndex++;
          }else{
            start = start + prevLength;
            tempCategoryPosition[key] = start;
            prevLength = $scope.realQuestionBank[key].length;
          }

        }
        console.log("--------------------\n");
          console.log("tempCategoryPosition: ", tempCategoryPosition);
        console.log("--------------------\n");

        //----------------------------- showing the first question -----------------------------------------
        //console.log("formatted question bank: ", $scope.questionBankContainer);
        var questionIndex = 0;
        $scope.$apply(function(data){

          console.log("---------------- showing the first question ---------------");
          console.log("current question bank length: ", $scope.realQuestionBank );
          console.log("current question index: ",questionIndex);
          // var firstCatOfQuesBank = $scope.questionBankContainer[Object.keys($scope.questionBankContainer)[0]];
          // console.log("first category of question: ",firstCatOfQuesBank );

          $scope.showExamTimer = true;
          // -----  TIMER SECTION  ---------
          console.log("total no of question: ", $scope.totalQuestion);
          // $scope.totalExamTime = $scope.totalQuestion * 60000;
          // $scope.totalExamTime = $scope.totalQuestion * 30000;
          $scope.totalExamTime = $scope.totalInterviewTime * 60 * 1000;

          var mnt = ( $scope.totalExamTime / 1000 ) / 60;
          var sec = ( $scope.totalExamTime / 1000 ) % 60;
          $scope.startTimerHr = 0;
          $scope.startTimerMnt = mnt;
          $scope.startTimerSec = sec;
          // -----  TIMER SECTION  ---------
          $scope.count();


          // $scope.questionTimerSection(); //  implementing the question timer section

        })
        //------------------------------------------------------------------------------------------

         window.highlightQuestionCategory = function(output){
            console.log(" ================= highlightQuestionCategory ====================");
            var chatObject = {};
            chatObject["input"] = '';
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
        }

        var keyIndex = 0;
        window.showingSingleQuestion = function(){
            $scope.$apply(function(){
              console.log("-----------calling showingSingleQuestion--------");
              console.log("current question index: ",questionIndex);
              console.log("question bank container: ",$scope.questionBankContainer.length);

              if(questionIndex < $scope.totalQuestion ){

                for(var key in tempCategoryPosition){
                    if(questionIndex === tempCategoryPosition[key]){

                        var chatObject = {};
                        var output = '';
                        if(keyIndex === 0){
                            keyIndex++;
                            output = '<em style="color: #f2bf4e; font-weight: 600; font-size:18px; ">Start with aptitude questions.</em>';
                        }else if(keyIndex === 1){
                            output = '<em style="color: #f2bf4e; font-weight: 600; font-size:18px;">We are done with your aptitude test and would like to move on to the technical round. You have 20 mins to complete all questions. Let\'s start.</em>';
                            keyIndex++;
                        }else{
                            output = '<em style="color: #f2bf4e; font-weight: 600; font-size:18px;">We are at the last lap of your test. This is the psychometric test round. You will be given multiple choice questions and you will have just once chance to chose an answer. Please remember once you chose an answer I will directly move to the next question. No backsies, so think before you make a choice.</em>';
                            keyIndex++;
                        }
                        clearTimeout(interval);
                        setTimeout(highlightQuestionCategory(output), 5000)
                        // chatObject["input"] = '';
                        // chatObject["output"] = output;
                        // $scope.chatContainer.push(chatObject);

                          // clearTimeout(interval);
                          // interval = setTimeout(function(){
                          //   console.log("----------------  running the highlight section --------------");
                          //   chatObject["input"] = '';
                          //   chatObject["output"] = output;
                          //   $scope.chatContainer.push(chatObject);
                          // }, 5000)



                    }
                }
                //-------  question timer section ----------------
                // $scope.questionTimerSection();
                //---------------------------23-12-2016 ---------------------
                // if(($scope.clickSkipQuestionFlag === 0) && ($scope.clickSkipQuestionFlag === 0) && (questionIndex > 0)){
                //     console.log("\n\n=============  tracking the auto generate section  ==============\n\n");
                //     var tmpIndex = 0;
                //     for(var key in $scope.realQuestionBank) {
                //       var questionByCategory = $scope.realQuestionBank[key];
                //       for(var i=0; i<questionByCategory.length; i++ ){
                //           var id = questionByCategory[i].id;
                //           if( tmpIndex === questionIndex ){
                //                 // var questionAnsObject = {};
                //                 // questionAnsObject["id"] = id;
                //                 // questionAnsObject["answer"] = ' ';
                //                 // questionAnsObject["correct_answer"] = questionByCategory[i].correct_answer;
                //                 // $scope.questionAnswerResult.push(questionAnsObject);
                //                 var skipQuestionObject = {};
                //                 skipQuestionObject["qIndex"] = questionIndex;
                //                 skipQuestionObject["qId"] = id;
                //
                //                 $scope.trackSkipQuestions.push(skipQuestionObject);
                //                 $scope.trackAutoGenerateQuestions.push(id);
                //                 console.log("trackAutoGenerateQuestions : ", $scope.trackAutoGenerateQuestions);
                //           }
                //           tmpIndex++;
                //       }
                //
                //     }
                //
                // }
                // ----------------------- 23-12-2016 ------------------------------------------------------------

                console.log("current question index: ",questionIndex);
                var chatObject = {};
                var output = $scope.questionBankContainer[questionIndex];
                chatObject["input"] = '';
                chatObject["output"] = output;
                questionIndex++;
                $scope.chatContainer.push(chatObject);
                //----- 23-12-16-------------
                $scope.clickSkipQuestionFlag = 0;
                $scope.clickSkipQuestionFlag = 0;
                //-------------------------------


                console.log("interval: ", interval);
                clearTimeout(interval);
                interval = setTimeout(showingSingleQuestion, 60000);

              }else{
                console.log("show the final submit button...");
                if($scope.finalSubmitStatus !== 1){
                  $scope.finalSubmitStatus = 1;
                  clearTimeout(interval);
                    var showFinalSubmitBtn = '';
                    var chatObject = {};

                    // showFinalSubmitBtn += '1 minute left to Final submit<br>';
                    showFinalSubmitBtn += '<button type="button" class="btn btn-block" id="finalSubmitAnswerSheet" style="border: 0;" onclick="finalSubmitAnswerSheet(this.id)"  >Final submit</button>';
                    chatObject["input"] = '';
                    chatObject["output"] = showFinalSubmitBtn;
                    $scope.chatContainer.push(chatObject);

                }


              }

            })

        }


          window.skipQuestion= function (questionId){
            $scope.$apply(function(){
                $scope.clickSkipQuestionFlag = 1;
                console.log("------ calling skip question function --------");
                console.log("question id: ", questionId);
                $scope.skipQuestionFlag = 1;
                clearTimeout(interval);
                console.log("timer cancelled..");
                console.log("interval: ", interval);
                // diseabled the previous skip button

                    $(".skip").attr("disabled", true);
                //----------------------------------

                // ------------------- modify the question answer sheet when skipping the question -------------------------------
                for(var key in $scope.realQuestionBank) {
                  var questionByCategory = $scope.realQuestionBank[key];
                  for(var i=0; i<questionByCategory.length; i++ ){
                      var id = questionByCategory[i].id;
                      if( questionId === id ){
                        var questionAnsObject = {};
                        questionAnsObject["id"] = questionId;
                        questionAnsObject["answer"] = ' ';
                        questionAnsObject["correct_answer"] = questionByCategory[i].correct_answer;
                        $scope.questionAnswerResult.push(questionAnsObject);
                        var skipQuestionObject = {};
                        skipQuestionObject["qIndex"] = questionIndex;
                        skipQuestionObject["qId"] = questionId;

                        $scope.trackSkipQuestions.push(skipQuestionObject); // track the skip question functionality

                      }
                  }

                }
                //-----------------------------------------------------------------------------
                interval = setTimeout(showingSingleQuestion, 000);
            })
          }

          interval = setTimeout(showingSingleQuestion, 000);

        //---------------------------------------------------------------------------------------

        window.submitAnswer = function (name){
              console.log("btn id: ", name);
              $scope.$apply(function(){
                  $scope.clickSubmitAnswerFlag = 1;
                  var currentQIndex = questionIndex - 1;
                  console.log("calling function submit answer");
                  console.log(" current question index: ", currentQIndex);
                  //document.getElementById(name).disabled = true;
                  document.getElementById(name).disabled = true;
                  var radioButtons = document.getElementsByName(name);
                  for (var x = 0; x < radioButtons.length; x ++) {
                        var questionAnsObject = {};
                        var mathchedIdFlag = 0;
                        var autoGenerateQuestionStatus = 0;
                        if (radioButtons[x].checked) {

                          //----------------------------  CHECK FOR THE ANSWER ALTERATION  WITHOUT SKIPPING THE NEXT QUESTION  -------------------------------------------------


                          for(var i=0; i< $scope.questionAnswerResult.length; i++ ){
                             if(name === $scope.questionAnswerResult[i].id){
                                  console.log("==================calling the answered question again=============");
                                  console.log("matched flag value: ", mathchedIdFlag);
                                  $scope.questionAnswerResult[i].answer = radioButtons[x].value;
                                  // mathchedIdFlag = 1;
                                  // autoGenerateQuestionStatus = 1;
                                  //-------------  updating showing the skipped questions  ----------------
                                  for(var i=0; i<$scope.trackSkipQuestions.length; i++){
                                      if(name === $scope.trackSkipQuestions[i].qId){
                                          $scope.trackSkipQuestions.splice(i,1)
                                      }
                                  }
                                  //-----------------------------------------------------------------------
                                  return;
                             }

                           }
                  //=======================================================================================================
                          //  if(autoGenerateQuestionStatus === 0){
                          //    console.log("autoGenerateQuestionStatus : ", autoGenerateQuestionStatus);
                          //    // this portion is for answering the question which is not submitted not even skipped,
                          //    // skip to next question when timer for every question is finished.
                          //    for(var key in $scope.realQuestionBank) {
                          //      var questionByCategory = $scope.realQuestionBank[key];
                          //      for(var i=0; i<questionByCategory.length; i++ ){
                          //          var id = questionByCategory[i].id;
                          //          if( name === id ){
                          //            questionAnsObject["id"] = name;
                          //            questionAnsObject["answer"] = radioButtons[x].value;
                          //            questionAnsObject["correct_answer"] = questionByCategory[i].correct_answer;
                          //            $scope.questionAnswerResult.push(questionAnsObject);
                          //            return ;
                          //          }
                          //      }
                           //
                          //    }
                           //
                          //  }
                  //---------------------------------------------------------------------------------------------------------


                           // diseabled the previous skip button-------------------------------

                           $(".skip").attr("disabled", true);
                           //------------------------------------------------------------------

                          //--------------------------------------------------------------------------------------------
                         document.getElementById(name).disabled = false;
                         console.log("checked btn id: ",radioButtons[x].id);
                         console.log("checked btn value: ",radioButtons[x].value);
                         console.log("questionAnswerResult length: ", $scope.questionAnswerResult.length);
                         if($scope.questionAnswerResult.length > 0){
                           if(mathchedIdFlag === 0){
                             for(var key in $scope.realQuestionBank) {
                               var questionByCategory = $scope.realQuestionBank[key];
                               for(var i=0; i<questionByCategory.length; i++ ){
                                   var id = questionByCategory[i].id;
                                   if( name === id ){
                                     questionAnsObject["id"] = name;
                                     questionAnsObject["answer"] = radioButtons[x].value;
                                     questionAnsObject["correct_answer"] = questionByCategory[i].correct_answer;
                                     $scope.questionAnswerResult.push(questionAnsObject);

                                   }
                               }

                             }
                           }

                         }else{

                             for(var key in $scope.realQuestionBank) {
                               var questionByCategory = $scope.realQuestionBank[key];
                               for(var i=0; i<questionByCategory.length; i++ ){
                                   var id = questionByCategory[i].id;
                                   if( name === id ){
                                     questionAnsObject["id"] = name;
                                     questionAnsObject["answer"] = radioButtons[x].value;
                                     questionAnsObject["correct_answer"] = questionByCategory[i].correct_answer;
                                     $scope.questionAnswerResult.push(questionAnsObject);

                                   }
                               }

                             }

                         }


                       }
                   }
                   document.getElementById(name).disabled = true;
                   console.log("question ans result: ", $scope.questionAnswerResult);
                //----------------------  skip the question when submit the answer -----------------------

                   clearTimeout(interval);
                   interval = setTimeout(showingSingleQuestion, 0000);

                //----------------------------------------------------------------------------------------

                })

        }
        // ---------------- functionality for completing the exam --------------------
        var totalExamTime = setTimeout(function(){

            console.log("final submit event calling...");
            $scope.$apply(function(data){
              if($scope.finalSubmitStatus === 0){

                $scope.showExamTimer = false;
                $scope.showZeroTimer = true;
                $scope.queryMsgDisableStatus = true;
                $scope.finalSubmitStatus = 1;
                // ------------  send final answer sheet result automatically -----------------------------------
                //-----------  modify the final answer sheet -----------------


                $('#automaticFinalAnswerSheetSubmit').modal('show');
                var realQuestionBankIndex = 0;
                for(var key in $scope.realQuestionBank) {
                  var questionByCategory = $scope.realQuestionBank[key];
                  for(var i=0; i<questionByCategory.length; i++ ){
                      var id = questionByCategory[i].id;
                      if($scope.answeredIds.indexOf(id) === -1){
                          var defaultAnswerObject = {};
                          defaultAnswerObject["id"] = id;
                          defaultAnswerObject["correct_answer"] = questionByCategory[i].correct_answer;
                          defaultAnswerObject["answer"] = ' ';
                          $scope.questionAnswerResult.push(defaultAnswerObject);
                      }else{
                          $scope.questionAnswerResult[realQuestionBankIndex].correct_answer = questionByCategory[i].correct_answer;
                      }
                      realQuestionBankIndex++;
                  }

                }
                console.log("final answer sheet : ", $scope.questionAnswerResult);
                var finalQuestionAnswerSheet = {};
                finalQuestionAnswerSheet["answers"] = $scope.questionAnswerResult;
                finalQuestionAnswerSheet["schedule_id"] = $scope.passcodeInfo.schedule_id;



                //-----------------------------------------------------------
                // var btnval = document.getElementById("finalSubmitAnswerSheet").value;
                var btnval = "Final submit";
                $(".skip").attr("disabled", true);
                client.emit('immediate-action-after-complete-exam', {finalResult: finalQuestionAnswerSheet, btnValue: btnval});

                //-----------------------------------------------------------------------------------------------
              }

            })
        }, $scope.totalExamTime); // i minute interval time for demo purpose

        // -----  START NOTIFY TIMER BEFORE THE FINAL SUBMIT -----

        var notifyTimerSpan = $scope.totalExamTime - 300000;
        $scope.notifyTimer = setTimeout(function(){

            $scope.$apply(function(data){

                  $('#notifyTimer').modal('show');
            })
        }, notifyTimerSpan);

        // -----  END NOTIFY TIMER BEFORE THE FINAL SUBMIT -----

        //-----------------------------------------------------------------------------

  })// end of event generate-question-bank


    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    client.on('passcode-status', function(data){
      console.log("passcode status: ", data);
      $scope.$apply(function(){
        if(data.passcodeStatus === 'yes'){
          console.log("cancelling the modal section ");

          // document.getElementById('accessPasscodeModal').style.display='none';
          $('#accessPasscodeModal').modal('hide');
          // $('#accessPasscodeModal').hide();
          $('.modal-backdrop').hide();
          $scope.passcodeStatus = false;
          $scope.modalAreaHidden = 'modal';
          $scope.passcodeInfo = data.passcodeInfo;
          var n = $scope.passcodeInfo.name.indexOf(" ");
          if(n === -1){
            $scope.currentUser = capitalize($scope.passcodeInfo.name);

          }else{
            var tmpUser = $scope.passcodeInfo.name.split(" ");
            $scope.currentUser = capitalize(tmpUser[0]);
          }
          var tmpMsg = '';
          var chatObject = {};
          tmpMsg += '<div>Hi, <strong><i> '+$scope.currentUser+' </i></strong>';
          tmpMsg += '<div>The human folks have set me up here so that I can take you through your selection process. <br> You will have 30mins to complete this conversation. <br> I will take you through questions one after the other. <br> Shall we proceed?</div>';
          tmpMsg += '  <br><button type="button" class="btn btn-block" id="acceptTest" value="Okay" onclick="acceptTest(this.id)">Okay</button>';
          tmpMsg += '  <button type="button" class="btn btn-block"  id="cancelTest" value="Cancel" onclick="cancelTest(this.id)">Cancel</button> </div>';
          // document.getElementById("queryMsg").disabled = true;
          chatObject["input"] = queryMsg;
          chatObject["output"] = tmpMsg;
          $scope.chatContainer.push(chatObject);
          console.log("in send msg chat object: ", $scope.chatContainer);

        }else{
          $scope.passcodeStatus = true;
          // document.getElementById('accessPasscodeModal').style.display='none';

        }
      })
    })


    client.on('interview-completion-response', function(data){
      console.log("-------- calling interview-completion-response -------");
      // console.log("returnmsg: ", data.returnMsg);
      // console.log("btn value: ", data.btnValue);
      $scope.$apply(function(){
        $scope.trackSkipQuestions = []; // epmty the track skipped questions array to hide the section
        var chatObject = {};
        chatObject["input"] = data.btnValue;
        chatObject["output"] = data.returnMsg;
        $scope.chatContainer.push(chatObject);
        console.log("chat container: ", $scope.chatContainer);
      })
    })


    client.on('generate-work-benefits', function(data){
      console.log("-------- calling generate-work-benefits response -------");
      $scope.$apply(function(){
        var chatObject = {};
        chatObject["input"] = '';
        chatObject["output"] = data.returnMsg;
        $scope.chatContainer.push(chatObject);
        console.log("chat container: ", $scope.chatContainer);
      })
    })

    client.on('show-company-benefit-by-name', function(data){
      console.log("-------- calling show-company-benefit-by-name response -------");
      $scope.$apply(function(){
        var chatObject = {};
        chatObject["input"] = '';
        chatObject["output"] = data.returnMsg;
        $scope.chatContainer.push(chatObject);
        console.log("chat container: ", $scope.chatContainer);
      })
    })

    client.on('generate-negetive-expression-response', function(data){
      $scope.$apply(function(){
        var chatObject = {};
        chatObject["input"] = $scope.currentQuery;
        chatObject["output"] = data.returnMsg;
        $scope.chatContainer.push(chatObject);
        console.log("chat container: ", $scope.chatContainer);
      })
    })

    client.on('generate-feedback-expression-response', function(data){
      $scope.$apply(function(){
        var chatObject = {};
        chatObject["input"] = "No";
        chatObject["output"] = data.returnMsg;
        $scope.chatContainer.push(chatObject);
        console.log("chat container: ", $scope.chatContainer);
      })
    })


    client.on('exceed-reschedule-limit', function(data){
      $scope.$apply(function(){
        var chatObject = {};
        var output = data.returnMsg;
        output += '<br><br>Please let me know your experience. Your feedback will help me improve.<br>';
        output += '<p class="radio" onclick="enableFeedBackBtn()"><input id="feedback1" class="w3-radio feedback-options" type="radio" name="geckofeedback" value="Very Helpful" ><label for="feedback1" class="w3-validate">Very Helpful</label></p>';
        output += '<p class="radio" onclick="enableFeedBackBtn()"><input id="feedback2" class="w3-radio feedback-options" type="radio" name="geckofeedback" value="Averege" ><label for="feedback2" class="w3-validate">Averege</label></p>';
        output += '<p class="radio" onclick="enableFeedBackBtn()"><input id="feedback3" class="w3-radio feedback-options" type="radio" name="geckofeedback" value="Too Bad" ><label for="feedback3" class="w3-validate">Too Bad</label></p>';
        output += '<br><button type="button" class="btn btn-block"  id="geckofeedback"  onclick="geckoFeedback(this.id)" disabled = true > Submit feedback </button>';
        chatObject["input"] = '';
        chatObject["output"] = output;
        $scope.chatContainer.push(chatObject);
      })
    })


    client.on('sucess-reschedule-interview-date', function(data){
      $scope.$apply(function(){
        var chatObject = {};
        chatObject["input"] = 'Reschedule interview';
        chatObject["output"] = $scope.rescheduleDateResponse;
        $scope.chatContainer.push(chatObject);
      })
    })
    //-------------------------------JAVASCRIPT SPECIFIC DYNAMIC FUNCTIANALITY SECTION -------------------------------------

    // functionality for accepting the test

    window.acceptTest = function(id){
      $scope.$apply(function(){
        //------------  diseable [ okey ] button -------------
            $("#acceptTest").attr("disabled", true);
            $("#cancelTest").attr("disabled", true);

        //-----------------------------------------------------------
          var chatObject = {};
          $scope.acceptTestFlag = 1;
          $scope.queryMsgDisableStatus = false;
          var btnval = document.getElementById(id).value;
          // document.getElementById(id).disabled = true;
          var output = 'Before we begin, I would like to ask you a few questions. <br> We have many candidates applying for this opening of “'+$scope.passcodeInfo.position_name+'” . <br> What makes you think you are better suited than they are?';
          chatObject["input"] = btnval;
          chatObject["output"] = output;
          $scope.chatContainer.push(chatObject);
      })
    }


    window.acceptTestAfterMystake = function(id){
      $scope.$apply(function(){
          var chatObject = {};
          $scope.acceptTestFlag = 1;
          $scope.queryMsgDisableStatus = false;

          $("#acceptTestAfterMystake").attr("disabled", true);


          var btnval = document.getElementById(id).value;
          var output = 'Before we begin, I would like to ask you a few questions. <br> We have many candidates applying for this opening of “'+$scope.passcodeInfo.position_name+'” . <br> What makes you think you are better suited than they are?';
          chatObject["input"] = btnval;
          chatObject["output"] = output;
          $scope.chatContainer.push(chatObject);
      })
    }



    window.finalSubmitAnswerSheet = function(id){
      $scope.$apply(function(){
          finalSubmitStatus = 1;
          $scope.showExamTimer = false;
          document.getElementById("finalSubmitAnswerSheet").disabled = true;
          $scope.queryMsgDisableStatus = true;
          //------------------- ACTION WHEN CLICKING THE FINAL SUBMIT BUTTON ------------------------------
            $(".skip").attr("disabled", true); // diseabled all the skip button
            $(".multiple-choise-options").attr("disabled", true); // diseabled all the radio button
            $(".submit-answer").attr("disabled", true);
            clearInterval($scope.notifyTimer); // stop the notify timer modal section
          //----------------------------------------------------------
          // ---- show the zero timer section --------
          $scope.showExamTimer = false;
          $scope.showZeroTimer = true;
          //------------------------------------------
          //-----------  modify the final answer sheet -----------------

          console.log("before processing skipquestions ids : ", $scope.trackSkipQuestions);
          console.log("brfore processing final answer sheet : ", $scope.questionAnswerResult);
          // var realQuestionBankIndex = 0;
          // for(var key in $scope.realQuestionBank) {
          //   var questionByCategory = $scope.realQuestionBank[key];
          //   for(var i=0; i<questionByCategory.length; i++ ){
          //       var id = questionByCategory[i].id;
          //       if($scope.answeredIds.indexOf(id) === -1){
          //           var defaultAnswerObject = {};
          //           defaultAnswerObject["id"] = id;
          //           defaultAnswerObject["correct_answer"] = questionByCategory[i].correct_answer;
          //           defaultAnswerObject["answer"] = ' ';
          //           $scope.questionAnswerResult.push(defaultAnswerObject);
          //       }else{
          //           $scope.questionAnswerResult[realQuestionBankIndex].correct_answer = questionByCategory[i].correct_answer;
          //       }
          //       realQuestionBankIndex++;
          //   }
          //
          // }

          var finalQuestionAnswerSheet = {};
          finalQuestionAnswerSheet["answers"] = $scope.questionAnswerResult;
          finalQuestionAnswerSheet["schedule_id"] = $scope.passcodeInfo.schedule_id;
          finalQuestionAnswerSheet["initial_questions"] = userInitialQuestionAnsResult;
          //-----------------------------------------------------------
          var btnval = document.getElementById("finalSubmitAnswerSheet").value;
          client.emit('immediate-action-after-complete-exam', {finalResult: finalQuestionAnswerSheet, btnValue: btnval});

      })
    }

    window.enableAnsSubmitButton = function(btnId){
        console.log("--------------  calling enableAnsSubmitButton  ------------");
        console.log("btnId: ",btnId);
        console.log("finalSubmitStatus: ", finalSubmitStatus);
        if(finalSubmitStatus === 1){
          document.getElementById(btnId).disabled = true;
        }else{
          document.getElementById(btnId).disabled = false;
        }

    }

    window.cancelTest = function (id){
          $scope.$apply(function(){
              //------------  diseable [ okey ] button -------------
                  $("#acceptTest").attr("disabled", true);
                  $("#cancelTest").attr("disabled", true);

              //-----------------------------------------------------------
              var chatObject = {};
              var btnval = document.getElementById(id).value;
              var output = 'Uhoh. May I know what went wrong ? <br> I could help you reschedule your meeting with me. <br>';
              output += ' <br><button type="button" class="btn btn-block"  id="rescheduleTest" onclick="rescheduleTest(this.id)">Reschedule interview</button>';
              output += ' <button type="button" class="btn btn-block"  id="cancelInterview" onclick="cancelInterview(this.id)" >Cancel interview</button> ';
              output += ' <button type="button" class="btn btn-block"  id="cancelByMystake" onclick="cancelByMystake(this.id)" > I cancelled by mistake</button> ';

              chatObject["input"] = btnval;
              chatObject["output"] = output;
              $scope.chatContainer.push(chatObject);
          })
    }
    window.cancelByMystake = function(id){
      $scope.$apply(function(){
          //------------  diseable [ okey ] button -------------
              $("#acceptTest").attr("disabled", true);
              // $("#cancelTest").attr("disabled", false);
              $("#cancelInterview").attr("disabled", true);
              $("#cancelByMystake").attr("disabled", true);
              $("#rescheduleTest").attr("disabled", true);
          //-----------------------------------------------------------
          var chatObject = {};
          var output = '';
          output += '<div>Hi, <strong><i> '+$scope.currentUser+' </i></strong>';
          output += '<div>The human folks have set me up here so that I can take you through your selection process. <br> You will have 30mins to complete this conversation. <br> I will take you through questions one after the other. <br> Shall we proceed?</div>';
          output += '  <br><button type="button" class="btn btn-block" id="acceptTestAfterMystake" value="Okay" onclick="acceptTestAfterMystake(this.id)">Okay</button>';
          chatObject["input"] = ' I cancelled by mistake';
          chatObject["output"] = output;
          $scope.chatContainer.push(chatObject);
      })
    }


    $scope.currentWorkBenefitArr = [];

    window.showWorkBenefits = function(){
      $scope.$apply(function(){
        console.log("calling showWorkBenefits --------");

        var ans = document.getElementsByName("companyBenefit");
        for(var i=0; i<ans.length; i++){
           if(ans[i].checked){
             $(".companybenefit").attr("disabled", true);
              var result = ans[i].value;
              console.log("selected work benefit: ", result);
              $scope.currentWorkBenefitArr.push(result);

              client.emit("query-company-benefit-by-name", { result: result });

          }
        }
      })
    }
    window.showFurtherWorkBenefits = function(){
      console.log("----------  calling function showFurtherWorkBenefits  ----------");
      $scope.$apply(function(){
        var ans = document.getElementsByName("showFurtherCompanyBenefit");
        var workBenefitName = '';
        for(var i=0; i<ans.length; i++){
           if(ans[i].checked === true){
              var result = ans[i].value;
              workBenefitName = result;
              console.log("selected work benefit: ", result);
              console.log("current work benefit arr: ",$scope.currentWorkBenefitArr);

              // add the further work benefit option in an array
              if($scope.currentWorkBenefitArr.length === 0){
                  $scope.currentWorkBenefitArr.push(result);
                  client.emit("query-company-benefit-by-name", { result: result })

              }else{
                  if($scope.currentWorkBenefitArr.indexOf(result) === -1){
                      $scope.currentWorkBenefitArr.push(result);
                      client.emit("query-company-benefit-by-name", { result: result })

                  }
              }

          }
        }


      })
    }

    window.arrayDiff = function(fixedArr, dynamicArr){
      var resultArr = [];
      var array3 = fixedArr.filter(function(obj) { return dynamicArr.indexOf(obj) == -1; });
      return array3;
    }
    $scope.dynamicIndex = 10;
    window.showFurtherCompanyBenefitOptionYes = function(){
      $scope.$apply(function(){
        console.log("=========== showFurtherCompanyBenefitOption ===========");
        var workBenefitOptions = ['On-the-job Benefits','Leave Benefits','Awards for Excellence','Relocation Support','Life@ Web Spiders','Financial Benefits'];
        var chatObject = {};
        var returnMsg = '';
        // ----------------- diseable sectipon ---------------------
          $(".furtherBenefitOption").attr("disabled", true); // diseable the further benefit Yes button
          $(".furtherBenefitOption").attr("disabled", true);  // diseable the further benefit No button
          $(".company-benefit").attr("disabled", true);  // diseable the company benefit radio options
        //--------------------------------------------------------------------------------------------------
        console.log("current work benefit: ", $scope.currentWorkBenefitArr);
        var resultArr = arrayDiff(workBenefitOptions, $scope.currentWorkBenefitArr);
        console.log("after diff result arr: ", resultArr);
        if(resultArr.length === 1){
            console.log("resultArr : ", resultArr);
            client.emit("show-last-work-benefit", {data : resultArr[0]});
        }else{
                  returnMsg += 'Please choose a <strong><i>Work Benefit </i></strong>category.<br>';

          for(var i=0; i< resultArr.length; i++){
                  returnMsg += '<p class="radio company-benefit" onclick="showFurtherWorkBenefits()" ><input  id="workbenefit'+($scope.dynamicIndex+i)+'" class="w3-radio" type="radio" name="showFurtherCompanyBenefit"';
                  returnMsg += 'value="'+resultArr[i]+'">';
                  returnMsg += '<label for= "workbenefit'+($scope.dynamicIndex+i)+'"  class="w3-validate">'+resultArr[i]+'</label></p>';
          }
        }


        $(".furtherBenefitOptionYes").attr("disabled", true);

        if(resultArr.length === 0){
            client.emit("gecko-benefit", { });
        }else{
          chatObject["input"] = 'Yes';
          chatObject["output"] = returnMsg;
          $scope.dynamicIndex = $scope.dynamicIndex +10;
          $scope.chatContainer.push(chatObject);
        }

      })
    }

    window.showFurtherCompanyBenefitOptionNo = function(){
        $scope.$apply(function(){
            $(".furtherBenefitOption").attr("disabled", true); // diseable the further benefit Yes button
            $(".furtherBenefitOption").attr("disabled", true);  // diseable the further benefit No button
            $(".company-benefit").attr("disabled", true);  // diseable the company benefit radio options
            client.emit("gecko-benefit", { });
        })
    }


    window.rescheduleTest = function (id){
      $scope.$apply(function(){
        //------------  diseable [ okey ] button -------------
        $("#acceptTest").attr("disabled", true);
        $("#cancelTest").attr("disabled", true);
        $("#cancelByMystake").attr("disabled", true);
        $("#cancelInterview").attr("disabled", true);
        $("#rescheduleTest").attr("disabled", true);

        //-----------------------------------------------------------
        var chatObject = {};
        var btnval = document.getElementById(id).value;
        var output = 'You can choose a schedule that best suits your needs. <br> ';
        output += '<div class="form-group date-picker" style="width: 270px;">'+
                    '<div class="input-group date" id="dateTimePicker">'+
                          '<input id="date" type="text" class="form-control" data-date-format="MM/DD/YYYY" />'+
                          '<span class="input-group-addon">'+
                            '<span id="" class="glyphicon glyphicon-calendar"></span>'+
                          '</span>'+
                    '</div>'+
                  '</div>';

        output += '<div><button type="button" class="btn btn-block"  id="rescheduleInterview" onclick="rescheduleInterview(this.id)" disabled=true>Reschedule interview</button></div>'

        chatObject["input"] = btnval;
        chatObject["output"] = output;
        $scope.chatContainer.push(chatObject);
        //
        // setTimeout(function(){
        //   $scope.$apply(function(){
        //       // console.log("sucessfull checking the set time out ");
        //       var chatObject = {};
        //       var output = $scope.currentUser+', please respond so that I can reschedule.<br>';
        //
        //       chatObject["input"] = '';
        //       chatObject["output"] = output;
        //       $scope.chatContainer.push(chatObject);
        //   })
        // }, 10000);

        // setTimeout(function(){
        //   $scope.$apply(function(){
        //       // console.log("sucessfull checking the set time out ");
        //       var chatObject = {};
        //       var output = 'I seem to have lost you there.  <br> I am cancelling this interview.<br>';
        //
        //       chatObject["input"] = '';
        //       chatObject["output"] = output;
        //       $scope.chatContainer.push(chatObject);
        //   })
        // }, 10000);

      })

    }


    window.cancelInterview = function (id){
      console.log("on clicking CANCEL THE INTERVIEW  the test ");
      $scope.$apply(function(){
          //------------  diseable [ okey, cancel, cancel interview, reschedule interview ] button -------------
          $("#acceptTest").attr("disabled", true);
          $("#cancelTest").attr("disabled", true);
          $("#cancelInterview").attr("disabled", true);
          $("#rescheduleTest").attr("disabled", true);
          $("#cancelByMystake").attr("disabled", true);

          //-----------------------------------------------------------
          var chatObject = {};
          var btnval = document.getElementById(id).value;
          var output = '<p>Sure, <strong><i>'+$scope.currentUser+'</i></strong> I am cancelling this interview.</p>';
          output += '<br>Please let me know your experience. Your feedback will help me improve.<br>';
          output += '<p class="radio" onclick="enableFeedBackBtn()"><input id="feedback1" class="w3-radio feedback-options" type="radio" name="geckofeedback" value="Very Helpful" ><label for="feedback1" class="w3-validate">Very Helpful</label></p>';
          output += '<p class="radio" onclick="enableFeedBackBtn()"><input id="feedback2" class="w3-radio feedback-options" type="radio" name="geckofeedback" value="Averege" ><label for="feedback2" class="w3-validate">Averege</label></p>';
          output += '<p class="radio" onclick="enableFeedBackBtn()"><input id="feedback3" class="w3-radio feedback-options" type="radio" name="geckofeedback" value="Too Bad" ><label for="feedback3" class="w3-validate">Too Bad</label></p>';
          output += '<br><button type="button" class="btn btn-block"  id="geckofeedback"  onclick="geckoFeedback(this.id)" disabled = true > Submit feedback </button>';
          chatObject["input"] = btnval;
          chatObject["output"] = output;
          $scope.chatContainer.push(chatObject);

      })
    }

    window.formatSelectedRescheduleDate = function(date){
      console.log("----------  formatSelectedRescheduleDate  -------------");
      $scope.$apply(function(){
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(date !== undefined){
          console.log("date: ", date);
          console.log("type of date: ", typeof(date));

          $("#rescheduleInterview").attr("disabled", false);

          var dateComponent = date.split(" ");
          var formattedDate = dateComponent[0].split("/");
          $scope.formattedDate = formattedDate;
          console.log("your interview at: ", month[formattedDate[0]-1] +", "+formattedDate[1]+" "+formattedDate[2]);
          $scope.rescheduleDateResponse = '<br><p>Hi, <span><strong><i>'+$scope.currentUser+' </i></strong> </span> your Interview has been rescheduled at '+ month[formattedDate[0]-1]+', '+formattedDate[1]+', '+formattedDate[2]+'</p>';
        }
      });
    }

    window.rescheduleInterview = function (id){
      $scope.$apply(function(){
        //------------  diseable [ okey, cancel, cancel interview, reschedule interview ] button -------------
          $("#acceptTest").attr("disabled", true);
          $("#cancelTest").attr("disabled", true);
          $("#cancelInterview").attr("disabled", true);
          $("#rescheduleTest").attr("disabled", true);
          $("#rescheduleInterview").attr("disabled", true);
          $("#date").attr("disabled", true);


        //-----------------------------------------------------------

          var emailDate = $scope.formattedDate[2]+'-'+$scope.formattedDate[0]+'-'+$scope.formattedDate[1];
          var emailRescheduleObject = {
              "name" : $scope.passcodeInfo.name,
              "email" : $scope.passcodeInfo.email,
              "position_id" : $scope.passcodeInfo.position_id,
              "schedule_id" : $scope.passcodeInfo.schedule_id,
              "reschedule_datetime" : emailDate+' 00:00:00'
          }
          console.log("emailRescheduleObject: ", emailRescheduleObject);
          client.emit("send-email-reschedule-date", {emailRescheduleObject : emailRescheduleObject});

      })
    }

    var geckoFeedBackStatus = 0;
    window.enableFeedBackBtn =function(){
      $scope.$apply(function(){
        if(geckoFeedBackStatus === 1){
              $("#geckofeedback").attr("disabled", true);
        }else{
              $("#geckofeedback").attr("disabled", false);
        }

      });
    }
    window.geckoFeedback = function(name){
        console.log("calling feedback function ");
        console.log("name: ", name);
        $scope.$apply(function(){
          geckoFeedBackStatus = 1;
          $(".gecko-feedback").attr("disabled", true);
          $("#send").attr("disabled", true);
          var ans = document.getElementsByName(name);
          document.getElementById(name).disabled = true;
          $(".feedback-options").attr("disabled", true);

          var chatObject = {};
          for(var i=0; i<ans.length; i++){
             if(ans[i].checked){
                var result = ans[i].value;
                if(result === 'Very Helpful'){
                    chatObject["input"] = "Submit feedback";
                    chatObject["output"] = "Thank you. <br> <br>That made my day. <br>";
                    $scope.chatContainer.push(chatObject);
                }else if(result === 'Averege'){
                    chatObject["input"] = "Submit feedback";
                    chatObject["output"] = "Thank you. <br> <br>The human folks are still teaching me. I'll get better in time. <br>";
                    $scope.chatContainer.push(chatObject);
                }else if(result === 'Too Bad'){
                    chatObject["input"] = "Submit feedback";
                    chatObject["output"] = "Thank you. <br> <br> I am sorry you had a bad experience. I'll let the human folks know about it.<br>";
                    $scope.chatContainer.push(chatObject);
                }
            }
          }

        })
    }



    //-----------------------------------------------------------------------------------------------------


}])