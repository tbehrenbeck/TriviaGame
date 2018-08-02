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
      q1: 'What causes Phoebe to drop the bowl of lottery tickets?',
      q2: 'What does Monica receive from her father?',
      q3: 'How many times has Ross been divorced?',
      q4: 'Where does Chandler tell Janice he is moving to?',
      q5: 'What dessert did Rachel try to make for Thanksgiving?',
      q6: 'What causes Chandler to be a "strong, confident woman"?',
      q7: 'What type of bed does Monica accidentally recieve from the Mattress King?',
      q8: 'Where do Phoebe and Mike get married?',
    },
    options: {
      q1: ['Lightning', 'A Pigeon', 'Chandler', 'A Rat'],
      q2: ['A Dollhouse', 'An Old Trophy', 'Food', 'A Porsche'],
      q3: ['5', '2', '1', '3'],
      q4: ['Yemen', 'Russia', 'Kansas', 'Chicago'],
      q5: ['Souffle','Cookies','Cake','Trifle'],
      q6: ['Break-Up With Janice','Hanging Out With Rachel','A New Gold Bracelet','Hypnosis Tapes'],
      q7: ['Race Car Bed', 'Water Bed', 'Princess Bed','Bunk Bed'],
      q8: ['In Central Perk', 'On The Street', 'On The Beach', 'In A Church'],
    },
    answers: {
      q1: 'A Pigeon',
      q2: 'A Porsche',
      q3: '3',
      q4: 'Yemen',
      q5: 'Trifle',
      q6: 'Hypnosis Tapes',
      q7: 'Race Car Bed',
      q8: 'On The Street',
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
      trivia.timer = 30;
      $('#timer').text(trivia.timer);

      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // trivia options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg m-1">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
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
      
  
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
    
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },













  }