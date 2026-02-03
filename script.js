// Animation states configuration
let currentState = 0;
const totalStates = 3;
const animationDuration = 2000; // 4 seconds per state

// Get all elements
const cards = {
    card1: document.getElementById('card1'),
    card2: document.getElementById('card2'),
    card3: document.getElementById('card3')
};

const statuses = {
    status1: document.querySelector('.section2-status1'),
    status2: document.querySelector('.section2-status2'),
    status3: document.querySelector('.section2-status3')
};

const audioWaveContainer = document.querySelector('.section2-audio-wave-container');

// Animation state machine
const states = [
    {
        activeCard: 'card1',
        activeStatus: 'status1'
    },
    {
        activeCard: 'card2',
        activeStatus: 'status2'
    },
    {
        activeCard: 'card3',
        activeStatus: 'status3'
    }
];

// Function to update the active state
function updateState(stateIndex) {
    const state = states[stateIndex];
    
    // Remove active class from all cards
    Object.values(cards).forEach(card => {
        card.classList.remove('section2-active');
    });
    
    // Remove active class from all status cards
    Object.values(statuses).forEach(status => {
        status.classList.remove('section2-active');
    });
    
    // Remove active class from audio wave container
    audioWaveContainer.classList.remove('section2-active');
    
    // Add active class to current card and status
    cards[state.activeCard].classList.add('section2-active');
    statuses[state.activeStatus].classList.add('section2-active');
    
    // Add active class to audio wave container only when status2 is active
    if (state.activeStatus === 'status2') {
        audioWaveContainer.classList.add('section2-active');
    }
}

// Function to cycle through states
function cycleStates() {
    updateState(currentState);
    currentState = (currentState + 1) % totalStates;
}

// Initialize first state
updateState(0);
currentState = 1;

// Start animation cycle
setInterval(cycleStates, animationDuration);

// Optional: Add hover pause functionality
let isPaused = false;
const mainContent = document.querySelector('.section2-main-content');

mainContent.addEventListener('mouseenter', () => {
    isPaused = true;
});

mainContent.addEventListener('mouseleave', () => {
    isPaused = false;
});

// Modified cycle function with pause support
let animationInterval = setInterval(() => {
    if (!isPaused) {
        cycleStates();
    }
}, animationDuration);