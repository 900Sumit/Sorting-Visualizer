// Global Variables
let array = [];
let sorting = false;
let currentAlgorithm = '';
let currentLanguage = 'javascript';
let speed = 50;
let stopFlag = false;
let currentLine = -1;

// Initialize
window.onload = function () {
    generateRandomArray();
};

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        sun.style.display = 'none';
        moon.style.display = 'inline';
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        sun.style.display = 'inline';
        moon.style.display = 'none';
    }
}

// Generate Random Array
function generateRandomArray() {
    const size = parseInt(document.getElementById('arraySize').value);
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 400) + 10);
    }
    renderArray();
    hideAlgorithmInfo();
}

// Create Array from User Input
function createArrayFromInput() {
    const input = document.getElementById('userInput').value;
    const values = input.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v) && v > 0);

    if (values.length > 0) {
        array = values;
        renderArray();
        hideAlgorithmInfo();
    } else {
        alert('Please enter valid numbers separated by commas');
    }
}

// Render Array Visualization
function renderArray(comparing = [], swapping = [], sorted = []) {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';

    const maxValue = Math.max(...array);

    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${(value / (maxValue + 10)) * 100}%`;
        bar.style.width = `${100 / array.length}%`;

        // Set bar color based on state
        if (sorted.includes(index)) {
            bar.classList.add('sorted');
        } else if (swapping.includes(index)) {
            bar.classList.add('swapping');
        } else if (comparing.includes(index)) {
            bar.classList.add('comparing');
        } else {
            bar.classList.add('unsorted');
        }

        // Add value and index
        const valueSpan = document.createElement('span');
        valueSpan.className = 'bar-value';
        valueSpan.textContent = value;

        const indexSpan = document.createElement('span');
        indexSpan.className = 'bar-index';
        indexSpan.textContent = index;

        bar.appendChild(valueSpan);
        bar.appendChild(indexSpan);

        container.appendChild(bar);
    });
}

// Update Speed
function updateSpeed(value) {
    speed = parseInt(value);
    document.getElementById('speedValue').textContent = value;
}

// Get Delay based on speed
function getDelay() {
    return (101 - speed) * 5;
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Show Algorithm Info
function showAlgorithmInfo(algoKey) {
    const info = algorithmsData[algoKey];
    document.getElementById('algoInfo').style.display = 'block';
    document.getElementById('algoTitle').textContent = info.name;
    document.getElementById('algoDescription').textContent = info.description;
    document.getElementById('algoHowItWorks').textContent = info.howItWorks;
    document.getElementById('bestCase').textContent = info.bestCase;
    document.getElementById('avgCase').textContent = info.avgCase;
    document.getElementById('worstCase').textContent = info.worstCase;
    document.getElementById('spaceCase').textContent = info.spaceCase;
    document.getElementById('stableCase').textContent = info.stable;

    updateCodeDisplay();
}

// Hide Algorithm Info
function hideAlgorithmInfo() {
    document.getElementById('algoInfo').style.display = 'none';
    currentAlgorithm = '';
}

// Select Language
function selectLanguage(lang) {
    currentLanguage = lang;

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    updateCodeDisplay();
}

// Update Code Display
function updateCodeDisplay() {
    if (!currentAlgorithm) return;

    const info = algorithmsData[currentAlgorithm];
    const code = info.code[currentLanguage];

    // Update icon and title
    const icons = {
        javascript: '<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#F19E39"><path d="M274-360q-15 0-24.5-9.5T240-394v-66h48v52h84v-192h48v206q0 15-9.5 24.5T386-360H274Zm240 0q-15 0-24.5-9.5T480-394v-46h48v32h104v-53H514q-14 0-24-10t-10-24v-71q0-15 9.5-24.5T514-600h132q15 0 24.5 9.5T680-566v46h-48v-32H528v53h118q14 0 24 10t10 24v71q0 15-9.5 24.5T646-360H514Z" /></svg>',
        python: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48"><path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path></svg>',
        cpp: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48"><path fill="#00549d" fill-rule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clip-rule="evenodd"></path><path fill="#0086d4" fill-rule="evenodd" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14 s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z" clip-rule="evenodd"></path><path fill="#0075c0" fill-rule="evenodd" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M31 21H33V27H31zM38 21H40V27H38z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M29 23H35V25H29zM36 23H42V25H36z" clip-rule="evenodd"></path></svg>',
        java: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48"><path fill="#F44336" d="M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z"></path><path fill="#F44336" d="M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z"></path><g><path fill="#1565C0" d="M32.084 25.055c1.754-.394 3.233.723 3.233 2.01 0 2.901-4.021 5.643-4.021 5.643s6.225-.742 6.225-5.505C37.521 24.053 34.464 23.266 32.084 25.055zM29.129 27.395c0 0 1.941-1.383 2.458-1.902-4.763 1.011-15.638 1.147-15.638.269 0-.809 3.507-1.638 3.507-1.638s-7.773-.112-7.773 2.181C11.683 28.695 21.858 28.866 29.129 27.395z"></path><path fill="#1565C0" d="M27.935,29.571c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z"></path><path fill="#1565C0" d="M18.686,32.739c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z"></path><path fill="#1565C0" d="M36.281,36.632c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z"></path><path fill="#1565C0" d="M39,38.604c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z"></path></g></svg>'
    };

    const titles = {
        javascript: 'JavaScript Implementation',
        python: 'Python Implementation',
        cpp: 'C++ Implementation',
        java: 'Java Implementation'
    };

    document.getElementById('codeIcon').innerHTML = icons[currentLanguage];
    document.getElementById('codeTitle').textContent = titles[currentLanguage];

    // Render code with line numbers
    const lines = code.split('\n');
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = '';

    lines.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        if (currentLine === index + 1) {
            lineDiv.classList.add('highlight');
        }

        const lineNumber = document.createElement('span');
        lineNumber.className = 'line-number';
        lineNumber.textContent = index + 1;

        const lineCode = document.createElement('span');
        lineCode.textContent = line;

        lineDiv.appendChild(lineNumber);
        lineDiv.appendChild(lineCode);
        codeBlock.appendChild(lineDiv);
    });
}

// Highlight Code Line
function highlightLine(lineNum) {
    currentLine = lineNum;
    updateCodeDisplay();

    if (lineNum > 0) {
        document.getElementById('currentLineIndicator').style.display = 'block';
        document.getElementById('currentLineNumber').textContent = lineNum;
    } else {
        document.getElementById('currentLineIndicator').style.display = 'none';
    }
}

// Disable/Enable Controls
function setControlsState(disabled) {
    document.getElementById('userInput').disabled = disabled;
    document.getElementById('arraySize').disabled = disabled;
    document.querySelectorAll('.btn-algo').forEach(btn => btn.disabled = disabled);
    document.querySelectorAll('.btn-green, .btn-blue').forEach(btn => btn.disabled = disabled);

    if (disabled) {
        document.getElementById('stopBtn').style.display = 'inline-block';
    } else {
        document.getElementById('stopBtn').style.display = 'none';
    }
}

// Start Sorting
async function startSort(algoKey) {
    if (sorting) return;

    sorting = true;
    stopFlag = false;
    currentAlgorithm = algoKey;
    setControlsState(true);
    showAlgorithmInfo(algoKey);

    // Mark active algorithm button
    document.querySelectorAll('.btn-algo').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    switch (algoKey) {
        case 'bubble': await bubbleSort(); break;
        case 'selection': await selectionSort(); break;
        case 'insertion': await insertionSort(); break;
        case 'merge': await mergeSort(); break;
        case 'quick': await quickSort(); break;
        case 'heap': await heapSort(); break;
    }

    sorting = false;
    setControlsState(false);
    highlightLine(-1);
}

// Stop Sorting
function stopSort() {
    stopFlag = true;
    sorting = false;
    setControlsState(false);
    highlightLine(-1);
}

// BUBBLE SORT
async function bubbleSort() {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (stopFlag) return;

            highlightLine(4);
            renderArray([j, j + 1], [], []);
            await sleep(getDelay());

            if (array[j] > array[j + 1]) {
                highlightLine(5);
                renderArray([], [j, j + 1], []);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await sleep(getDelay());
            }

            renderArray([], [], []);
        }

        const sorted = [];
        for (let k = n - i - 1; k < n; k++) sorted.push(k);
        renderArray([], [], sorted);
    }

    renderArray([], [], array.map((_, i) => i));
    highlightLine(-1);
}

// SELECTION SORT
async function selectionSort() {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            if (stopFlag) return;

            highlightLine(4);
            renderArray([minIdx, j], [], Array.from({ length: i }, (_, k) => k));
            await sleep(getDelay());

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            highlightLine(6);
            renderArray([], [i, minIdx], Array.from({ length: i }, (_, k) => k));
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            await sleep(getDelay());
        }

        renderArray([], [], Array.from({ length: i + 1 }, (_, k) => k));
    }

    renderArray([], [], array.map((_, i) => i));
    highlightLine(-1);
}

// INSERTION SORT
async function insertionSort() {
    const n = array.length;

    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;

        if (stopFlag) return;

        highlightLine(2);
        renderArray([i], [], Array.from({ length: i }, (_, k) => k));
        await sleep(getDelay());

        while (j >= 0 && array[j] > key) {
            if (stopFlag) return;

            highlightLine(4);
            renderArray([], [j, j + 1], Array.from({ length: i }, (_, k) => k));
            array[j + 1] = array[j];
            await sleep(getDelay());
            j--;
        }

        array[j + 1] = key;
        renderArray([], [], Array.from({ length: i + 1 }, (_, k) => k));
    }

    renderArray([], [], array.map((_, i) => i));
    highlightLine(-1);
}

// MERGE SORT
async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
    renderArray([], [], array.map((_, i) => i));
    highlightLine(-1);
}

async function mergeSortHelper(left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(left, mid);
        await mergeSortHelper(mid + 1, right);
        await merge(left, mid, right);
    }
}

async function merge(left, mid, right) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (stopFlag) return;

        highlightLine(9);
        renderArray([left + i, mid + 1 + j], [], []);
        await sleep(getDelay());

        if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            i++;
        } else {
            array[k] = rightArr[j];
            j++;
        }
        k++;
        renderArray([], [], []);
    }

    while (i < leftArr.length) {
        if (stopFlag) return;
        array[k] = leftArr[i];
        i++;
        k++;
        await sleep(getDelay());
    }

    while (j < rightArr.length) {
        if (stopFlag) return;
        array[k] = rightArr[j];
        j++;
        k++;
        await sleep(getDelay());
    }
}

// QUICK SORT
async function quickSort() {
    await quickSortHelper(0, array.length - 1);
    renderArray([], [], array.map((_, i) => i));
    highlightLine(-1);
}

async function quickSortHelper(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (stopFlag) return;

        highlightLine(11);
        renderArray([j, high], [], []);
        await sleep(getDelay());

        if (array[j] < pivot) {
            i++;
            highlightLine(13);
            renderArray([], [i, j], []);
            [array[i], array[j]] = [array[j], array[i]];
            await sleep(getDelay());
        }
    }

    highlightLine(16);
    renderArray([], [i + 1, high], []);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    await sleep(getDelay());

    return i + 1;
}

// HEAP SORT
async function heapSort() {
    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        if (stopFlag) return;

        highlightLine(6);
        renderArray([], [0, i], Array.from({ length: n - i - 1 }, (_, k) => n - k - 1));
        [array[0], array[i]] = [array[i], array[0]];
        await sleep(getDelay());

        await heapify(i, 0);
    }

    renderArray([], [], array.map((_, i) => i));
    highlightLine(-1);
}

async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
        highlightLine(12);
        renderArray([largest, left], [], []);
        await sleep(getDelay());
        if (array[left] > array[largest]) largest = left;
    }

    if (right < n) {
        highlightLine(13);
        renderArray([largest, right], [], []);
        await sleep(getDelay());
        if (array[right] > array[largest]) largest = right;
    }

    if (largest !== i) {
        highlightLine(15);
        renderArray([], [i, largest], []);
        [array[i], array[largest]] = [array[largest], array[i]];
        await sleep(getDelay());
        await heapify(n, largest);
    }
}