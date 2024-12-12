document.addEventListener('DOMContentLoaded', () => {
    // Open modal logic
    const buttons = {
      howToPlayBtn: document.getElementById('howToPlayBtn'),
      questionsBtn: document.getElementById('noQuestions'), // Assuming you want a button for questions
    };
  
    // Event listeners for opening modals
    buttons.howToPlayBtn.addEventListener('click', () => {
      const modal = document.getElementById('howToPlayModal');
      if (modal) modal.style.display = 'flex'; // Show modal
      console.log('How to Play Modal Opened');
    });
  
    buttons.questionsBtn.addEventListener('click', () => {
      const modal = document.getElementById('questionsModal');
      if (modal) modal.style.display = 'flex'; // Show modal
      console.log('Questions Modal Opened');
    });
  
    // Close modal logic
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('close')) {
        const modalId = event.target.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none'; // Hide modal
        console.log(`Closing modal: ${modalId}`);
      }
  
      // Close modal if clicked outside of modal content
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        console.log('Modal Closed by clicking outside');
      }
    });
  });
  