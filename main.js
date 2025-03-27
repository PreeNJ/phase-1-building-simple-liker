// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  // Select the error modal (make sure the modal has the 'hidden' class added in your HTML)
  const modal = document.getElementById('modal');
  // (Optional) Ensure the modal is hidden on page load:
  modal.classList.add('hidden');

  // Select all like glyph elements (the hearts)
  const hearts = document.querySelectorAll('.like-glyph');

  // Add a click event listener to each heart
  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      // If the heart is already full, toggle it back to empty
      if (heart.innerText === FULL_HEART) {
        heart.innerText = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      } else {
        // Otherwise, simulate a server call to 'like' the post
        mimicServerCall()
          .then(() => {
            // On successful server response, change the heart to full and add the activated class (red color)
            heart.innerText = FULL_HEART;
            heart.classList.add('activated-heart');
          })
          .catch((error) => {
            // On server error, display the error modal with the error message
            modal.classList.remove('hidden');
            document.getElementById('modal-message').innerText = error;
            // Hide the modal again after 3 seconds
            setTimeout(() => {
              modal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
