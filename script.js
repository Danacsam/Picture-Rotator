/*

// script.js
const imageLoader = document.getElementById('imageLoader');
const puzzleContainer = document.getElementById('puzzleContainer');
const resetButton = document.getElementById('resetButton');

let pieces = [];
const pieceCount = 25; // 3x3 grid for simplicity

// Function to create puzzle pieces
function createPuzzle(imageURL) {
  puzzleContainer.innerHTML = ''; // Clear previous puzzle
  pieces = [];
  
  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.style.backgroundImage = `url(${imageURL})`;
    piece.style.backgroundSize = `${300}px ${300}px`;
    
    // Calculate position in the grid
    const x = (i % 5) * 100; // Grid columns
    const y = Math.floor(i / 5) * 100; // Grid rows
    piece.style.backgroundPosition = `-${x}px -${y}px`;

    // Randomize rotation
    const rotation = Math.floor(Math.random() * 4) * 90;
    piece.style.transform = `rotate(${rotation}deg)`;
    piece.dataset.correctRotation = 0; // Track solution

    // Add click-to-rotate functionality
    piece.addEventListener('click', () => {
      const currentRotation = parseInt(piece.style.transform.match(/-?\d+/)[0]);
      const newRotation = (currentRotation + 90) % 360;
      piece.style.transform = `rotate(${newRotation}deg)`;
      
      checkCompletion();
    });

    puzzleContainer.appendChild(piece);
    pieces.push(piece);
  }
}

// Completion Check
function checkCompletion() {
  const isSolved = pieces.every((piece) => piece.style.transform === 'rotate(0deg)');
  if (isSolved) {
    alert('Puzzle solved!');
  }
}

// Load image and create puzzle
imageLoader.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => createPuzzle(e.target.result);
    reader.readAsDataURL(file);
  }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
  pieces.forEach((piece) => {
    const randomRotation = Math.floor(Math.random() * 4) * 90;
    piece.style.transform = `rotate(${randomRotation}deg)`;
  });
});

*/

/* version 2

function createPuzzle(imageURL) {
  puzzleContainer.innerHTML = ''; // Clear previous puzzle
  pieces = [];

  // Dynamically set puzzle container size
  const gridSize = 5; // 5x5 grid
  const image = new Image(); // Create a temporary image to get dimensions
  image.src = imageURL;

  image.onload = () => {
    const pieceWidth = image.width / gridSize;
    const pieceHeight = image.height / gridSize;

    puzzleContainer.style.width = `${image.width}px`;
    puzzleContainer.style.height = `${image.height}px`;

    for (let i = 0; i < gridSize * gridSize; i++) {
      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
      piece.style.backgroundImage = `url(${imageURL})`;
      piece.style.backgroundSize = `${image.width}px ${image.height}px`; // Match original image size

      // Calculate position in the grid
      const x = (i % gridSize) * pieceWidth;
      const y = Math.floor(i / gridSize) * pieceHeight;
      piece.style.width = `${pieceWidth}px`;
      piece.style.height = `${pieceHeight}px`;
      piece.style.backgroundPosition = `-${x}px -${y}px`;

      // Randomize rotation
      const rotation = Math.floor(Math.random() * 4) * 90;
      piece.style.transform = `rotate(${rotation}deg)`;
      piece.dataset.correctRotation = 0; // Track solution

      // Add click-to-rotate functionality
      piece.addEventListener('click', () => {
        const currentRotation = parseInt(piece.style.transform.match(/-?\d+/)[0]);
        const newRotation = (currentRotation + 90) % 360;
        piece.style.transform = `rotate(${newRotation}deg)`;

        checkCompletion();
      });

      puzzleContainer.appendChild(piece);
      pieces.push(piece);
    }
  };
}

*/

const puzzleContainer = document.getElementById('puzzleContainer');
let pieces = [];

function createPuzzle(imageURL) {
  puzzleContainer.innerHTML = ''; // Clear previous puzzle
  pieces = [];

  // Dynamically set puzzle container size
  const gridSize = 5; // 5x5 grid
  const image = new Image(); // Create a temporary image to get dimensions
  image.src = imageURL;

  image.onload = () => {
    const pieceWidth = image.width / gridSize;
    const pieceHeight = image.height / gridSize;

    puzzleContainer.style.width = `${image.width}px`;
    puzzleContainer.style.height = `${image.height}px`;

    for (let i = 0; i < gridSize * gridSize; i++) {
      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
      piece.style.backgroundImage = `url(${imageURL})`;
      piece.style.backgroundSize = `${image.width}px ${image.height}px`; // Match original image size

      // Calculate position in the grid
      const x = (i % gridSize) * pieceWidth;
      const y = Math.floor(i / gridSize) * pieceHeight;
      piece.style.width = `${pieceWidth}px`;
      piece.style.height = `${pieceHeight}px`;
      piece.style.backgroundPosition = `-${x}px -${y}px`;

      // Randomize rotation
      const rotation = Math.floor(Math.random() * 4) * 90;
      piece.style.transform = `rotate(${rotation}deg)`;
      piece.dataset.correctRotation = 0; // Track solution

      // Add click-to-rotate functionality
      piece.addEventListener('click', () => {
        const currentRotation = parseInt(piece.style.transform.match(/-?\d+/)[0]);
        const newRotation = (currentRotation + 90) % 360;
        piece.style.transform = `rotate(${newRotation}deg)`;

        checkCompletion();
      });

      puzzleContainer.appendChild(piece);
      pieces.push(piece);
    }
  };
}

function checkCompletion() {
  const isSolved = pieces.every((piece) => {
    // Each piece is correct if it has 0deg rotation (no snapping)
    const rotation = parseInt(piece.style.transform.match(/-?\d+/)[0]);
    return rotation % 360 === 0; // Correct if multiple of 360
  });

  if (isSolved) {
    alert('Puzzle solved!');
  }
}

document.getElementById('imageLoader').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      createPuzzle(e.target.result); // Pass the image URL to the function
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
});

document.getElementById('resetButton').addEventListener('click', () => {
  if (pieces.length > 0) {
    createPuzzle(pieces[0].style.backgroundImage.slice(5, -2)); // Reload current puzzle
  }
});