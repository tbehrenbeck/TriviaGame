// You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// The scenario is similar for wrong answers and time-outs.

// If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.

// If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',


    questions: {
      q1: 'What causes Phoebe to drop the lottery tickets?',
      q2: 'What does Monica receive from her father?',
      q3: 'How many times has Ross been divorced?',
      q4: 'Where does Chandler tell Janice he is been relocated?',
      q5: 'What dessert did Rachel try to make for Thanksgiving?',
      q6: 'What causes Chandler to be a "strong, confident woman?',
      q7: 'What type of bed does Monica accidentally get from the Mattress King?',
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


    