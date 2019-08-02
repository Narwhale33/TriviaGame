$(document).ready(function() {
    // Event Listners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})
var trivia = {
    // Trivia 
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 10,
    timerOn: false,
    timerId: '',
    // Quesitons 
    questions: {
        q1: 'Which Marvel character has no super powers and relies on intellect',
        q2: 'Which Avengers movie is considered the worst one',
        q3: 'Which Marvel character is known for stealth and espionage',
        q4: 'What is the name of the villian in Spiderman Homecoming?',
        q5: 'Who was the first villian the Avengers faced?',
        q6: 'The color of the marvel logo is?',
        q7: 'What is the name of Dr. Strange robe?',
        q8: 'Which state is the Avenger\'s headquarter located?',
        q9: 'Which Marvel character is known for getting big, green, and mad',
        q10: 'Where did Thor get his magic hammer from in Infinity War movie?',
        q11: 'Who was chasing Winter Soldier in the beginning of Civil War movie?',
        q12: 'Who can beat Thanos all by themselves?',
        
    },
    options: {
        q1: ['Tony Stark', 'Bruce Banner', 'Hawkeye', 'Thor'],
        q2: ['Avengers', 'Avengers Endgame', 'Avengers Infinity War', 'Avengers Age of Ultron'],
        q3: ['Ghost', 'Black Widow', 'Captain Marvel', 'Hawkeye'],
        q4: ['Iron Monger', 'Dr. Octopus', 'Vulture', 'Lizard'],
        q5: ['The Leader', 'Mad Hatter', 'Thanos', 'Loki'],
        q6: ['Red', 'White', 'Blue', 'Red and White'],
        q7: ['Purple king robe', 'Cloak of Levitation', 'Hugh Hefner robe', 'Cloak of Marvel'],
        q8: ['Narland', 'Wakanda', 'New York', 'Washington DC'],
        q9: ['Black Panther', 'Hulk', 'Dr. Strange', 'Vision'],
        q10: ['His father Odin', 'Asgard', 'Nidavellir', 'Iron mans house'],
        q11: ['Black Panther', 'Captain America', 'War Machine', 'Scarlet Witch'],
        q12: ['Scarlet Witch', 'Hulk', 'Doctor Strange', 'Iron man'], 

    },
        
    answers: {
        q1: 'Tony Stark',
        q2: 'Avengers Age of Ultron',
        q3: 'Black Widow',
        q4: 'Vulture',
        q5: 'Loki',
        q6: 'Red and White',
        q7: 'Cloak of Levitation',
        q8: 'New York',
        q9: 'Hulk',
        q10: 'Nidavellir',
        q11: 'Black Panther',
        q12: 'Scarlet Witch',
    },
    
    // Trivia 
    // Method 
    startGame: function() {
        // Restarting game 
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);
        // Shows game section
        $('#game').show();
        // Empty last results
        $('#results').html('');
        // Show timer
        $('#timer').text(trivia.timer);
        // Remove start button
        $('#start').hide();
        $('#remaining-time').show();
        // Ask first question
        trivia.nextQuestion();
    },
    // Method 
    nextQuestion : function() {
        
    // Set timer to 10 seconds for each question
    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    // To prevent time speed up
    if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    // Gets all the question then indexes the current questions
    var questionContent = Object.values(trivia.questions)
    [trivia.currentSet];
    $('#question').text(questionContent);
    // An array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)
    [trivia.currentSet];
    // Creates all the trivia guess options in the html
    $.each(questionOptions, function(index, key) {
        $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })
    },
    // Method to decrement the counter and count unanswered if the timer runs out
    timerRunning : function() {
        // If timer still has time left and there are still questions left to ask
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
            $('#timer').text(trivia.timer);
            trivia.timer--;
                if(trivia.timer === 4){
                    $('#timer').addClass('last-seconds');
                }
        }
        // The time has run out and increment unaswered questions, run result
        else if(trivia.timer === -1) {
            trivia.unanswered++;
            trivia.resut = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of Time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        // If all the questions have been shown end the game, show results
        else if(trivia.currentSet === Object.keys(trivia.questions).length) {
        // Adds result of game (correct, incorrect, unanswered) to the page
        $('#results')
            .html('<h3>Thank you for playing!</h3>' +
            '<p>Correct: ' + trivia.correct + '</p>' +
            '<p>Incorrect: ' + trivia.incorrect + '</p>' +
            '<p>Unanswered: ' + trivia.unanswered + '</p>' +
            '<p>Please play again!</p>');
            // Hide game section
            $('#game').hide();
            // Show the start button to begin a new game
            $('#start').show();
        }
    },
    // method to evaluate the option clicked
    guessChecker : function() {
    // Timer ID for gameResult setTimeout
    var resultId;
    // The answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)
    [trivia.currentSet];
    // If the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer) {
    // Turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Correct Answer!</h3>');
    }
    // Else the user picked the wrong option, increment incorrect
    else{
        // Turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer + '</h3>');
        }
    },
    // Method to remove previous question results and options
    guessResult : function() {
        
        // increment to next question set
        trivia.currentSet++;
        // remove the options and results
        $('.option').remove();
        $('#results h3').remove();
        // begin next question
        trivia.nextQuestion();
    }
}