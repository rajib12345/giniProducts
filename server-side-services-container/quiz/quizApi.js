//================================ start quiz api ====================================

        function getQuizDataByCategory(categoryId){
            return quizResponse;
        }

        function getNoImagewithDescTemplate(templateData, style){
          let defaultAlignMent = "center";
          // let finalAlignment = style.textAlign !== null ? style.textAlign : defaultAlignMent;
          let template = `
                  <div class="row" style="background-color: white; text-align: center; margin-right: 5px; color: grey; font-size: 13px; border-right: 1px solid whitesmoke;">
                      <div class="" style="">
                          `+templateData+`
                      </div>
                  </div>

          `;
          return template;
        }

        var blockIdCounter = 0;
        function getBlockTemplate(blockData, payload){
          let template = '';
          let blockId = 'block-'+blockIdCounter;
          if(typeof(blockData) === 'string' && blockData.includes("<br/>") && (blockData.length > 35)){
              blockData = blockData.replace("<br/>", " ");

              template = '<div id="'+blockId+'" class="one-line-ellipse-hscroll-bar" style="padding: 10px 20px;" onclick="onClickBlock(\'' + payload.value + '\', \'' + blockId + '\')">'+blockData+'</div>';
          }else{
            template = '<div id="'+blockId+'" class="" style="padding: 10px 20px; " onclick="onClickBlock(\'' + payload.value + '\', \'' + blockId + '\')">'+blockData+'</div>';
          }
          blockIdCounter++;
          return template;
        }

        function hScrollBar(data){
            let template = '';
            template = '<a href="#" style=" border: 1px solid whitesmoke;">'+data+'</a>';
            return template;
        }



        function scrollmenuBlock(templateData, quizIdCounter){
            return '<div id="block-'+quizIdCounter+'" class="scrollmenu">'+templateData+'</div>';
        }
        var quizIdCounter = 0;
        socket.on("fetch-quiz-api", () => {
            // generateQuizCat(dummyQuizCategory)
            let template = '';
            let tempTemplate = '';
            let finalTemplate = '';
            let finalQuizResponseTemplate = '';
            for (var i = 0; i < dummyQuizCategory.length; i++) {
                  // tempTemplate = '';
                  template = '';
                  template += getBlockTemplate(dummyQuizCategory[i].name, dummyQuizCategory[i]);
                  tempTemplate = getNoImagewithDescTemplate(template, null);
                  finalTemplate += hScrollBar(tempTemplate);
            }

            let addScrollmenuQuizCatTemplate = scrollmenuBlock(finalTemplate, quizIdCounter);
            // console.log("final template :: ", addScrollmenuQuizCatTemplate);
                let argList = [
                    {key : "category", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : null, style: "color: orange; font-size: 16px; text-align: center;"},
                    {key : "type", subkey: null, type: "block", prefixValue: ' Type ', postFixValue: '', style:''},
                    {key : "difficulty", subkey: null, type: "block", prefixValue: 'Difficulty', postFixValue: '', style:''},
                    {key : "question", subkey: null, type: "block", prefixValue: 'Question ', postFixValue: '', style: 'font-size: 16px; color: blue;'},
                    {key : "correct_answer", subkey: null, type: "radio", prefixValue: null, postFixValue: ''},
                    {key : "incorrect_answers", subkey: null, type: "radio", prefixValue: null, postFixValue: ''},
                ];

                let payload = {
                    data : quizResponse,
                    argList : argList,
                    style : {
                      imgPos : 'none',
                      textAlign : 'left',
                      hScroll: "yes",
                      backgroundColor : null,
                      height : null,
                      width : null,
                      padding: null,
                      fontSize: null,
                      defaults : {
                          backgroundColor : 'white',
                          textAlign : 'center',
                          height: 'auto',
                          width : '240px',
                          color: 'grey',
                          fontSize : '13px',
                          padding: '0px',
                          margin : '10px 10px',
                          borderRight : '1px solid whitesmoke'
                      }
                    },
                    emptySlide : 'yes'
                };

                let quizResponseTemplate = PLACES_SERVICE.image_desc_template(payload);
                let quizCorrectAnswers = [];
                quizResponse.forEach((item)=>{
                    quizCorrectAnswers.push(item.correct_answer);
                });
                quizResponseTemplate = scrollmenuBlock(quizResponseTemplate, );
                finalQuizResponseTemplate += addScrollmenuQuizCatTemplate;
                finalQuizResponseTemplate += quizResponseTemplate;


            socket.emit("quiz-api-template", {template : finalQuizResponseTemplate, quizCorrectAnswers : quizCorrectAnswers});

            socket.on("fetch-quiz-data-by-category", (data) => {
                console.log("quiz category :: ", data.data);
                let argList = [
                    {key : "category", subkey: null, type: "block"},
                    {key : "type", subkey: null, type: "block"},
                    {key : "difficulty", subkey: null, type: "block"},
                    {key : "question", subkey: null, type: "block"},
                ];

                let payload = {
                    data : quizResponse,
                    argList : argList,
                    style : {
                      imgPos : 'none',
                      textAlign : 'left',
                      hScroll: "yes"
                    }

                };
                let quizResponseByCat = getQuizDataByCategory(data.data);
                let quizResponseTemplate = PLACES_SERVICE.image_desc_template(payload);
                socket.emit("quiz-api-template", {template : quizResponseTemplate});

            })
        })

        //================================ end quiz api ====================================
