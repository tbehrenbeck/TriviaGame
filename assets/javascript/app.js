// You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// The scenario is similar for wrong answers and time-outs.

// If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.

// If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

  $(document).ready(function(){
    
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })

  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',


    questions: {
      q1: 'Which store did Rachel and Ross both buy the same apothecary table from?',
      q2: 'What does Monica receive from her father?',
      q3: 'How many times has Ross been divorced?',
      q4: 'Where does Chandler tell Janice he is moving to?',
      q5: 'What dessert did Rachel try to make for Thanksgiving?',
      q6: 'Which volume of encyclopedia did Joey buy?',
      q7: 'What type of bed does Monica accidentally recieve from the Mattress King?',
      q8: 'Where do Phoebe and Mike get married?',
      q9: 'Phoebe gets a tattoo. What is it?',
      q10: 'What is the giant poking device made from?'
    },
    options: {
      q1: ['Crate & Barrel', 'West Elm', 'Pottery Barn', 'Anthropologie'],
      q2: ['A Dollhouse', 'An Old Trophy', 'Family Videos', 'A Porsche'],
      q3: ['5', '2', '1', '3'],
      q4: ['Yemen', 'Russia', 'Kansas', 'Chicago'],
      q5: ['Souffle','Cookies','Cake','Trifle'],
      q6: ['J','V','Z','X'],
      q7: ['Race Car Bed', 'Water Bed', 'Princess Bed','Bunk Bed'],
      q8: ['In Central Perk', 'On The Street', 'On The Beach', 'In A Church'],
      q9: ['The World From Far Away', 'A Bird', 'A Coffee Mug', 'The Number 10'],
      q10: ['Pencils', 'Sticks From A Tree', 'Straws', 'Chopsticks'],
    },
    answers: {
      q1: 'Pottery Barn',
      q2: 'A Porsche',
      q3: '3',
      q4: 'Yemen',
      q5: 'Trifle',
      q6: 'V',
      q7: 'Race Car Bed',
      q8: 'On The Street',
      q9: 'The World From Far Away',
      q10: 'Chopsticks'
    },
    images: {
      q1: 'assets/images/TOWTApothecaryTable.png',
      q2: 'assets/images/TOWTApothecaryTable.png',
      q3: 'assets/images/TOWTApothecaryTable.png',
      q4: 'assets/images/TOWTApothecaryTable.png',
      q5:'assets/images/TOWTApothecaryTable.png',
      q6: 'assets/images/TOWTApothecaryTable.png',
      q7: 'assets/images/TOWTApothecaryTable.png',
      q8: 'assets/images/TOWTApothecaryTable.png',
      q9: 'assets/images/TOWTApothecaryTable.png',
      q10: 'assets/images/TOWTApothecaryTable.png',
    },

    startGame: function(){

      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      
      trivia.nextQuestion();
    },

    //display questions and answers 
    nextQuestion : function(){
      
      // set timer to 30 seconds each question
      trivia.timer = 10;
      $('#timer').text(trivia.timer);

      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // trivia options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-light btn-lg m-1">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
      
    // method to evaluate the option clicked
    guessChecker : function() {
      
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      var currentImage = Object.values(trivia.images)[trivia.currentSet];
  
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-light');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $('#results').html('<h3>Correct Answer!</h3>');
        $("#restuls").html("<img src=" + currentImage + "'>");
      }
    
      else{
        $(this).addClass('btn-danger').removeClass('btn-light');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h3>Better luck next time! The correct answer was: '+ currentAnswer + "." +'</h3>');
      }
      
    },

    guessResult : function(){
      
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }

  }