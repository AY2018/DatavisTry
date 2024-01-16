document.addEventListener('DOMContentLoaded', function() {
    fetch('crime-rate-by-state-2024.csv')
        .then(response => response.text())
        .then(data => {
            populateStateSelect(data);
        })
        .catch(error => {
            console.error('Error fetching CSV:', error);
        });
});

function populateStateSelect(csvText) {
    const stateSelect = document.getElementById('stateSelect');
    const rows = csvText.split('\n');
    rows.forEach((row, index) => {
        if (index > 0) { // Skip header row
            const state = row.split(',')[0].replace(/"/g, '').trim();
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        }
    });
}

function displaySelectedStateCrimeRate() {
    const selectedState = document.getElementById('stateSelect').value;
    fetch('crime-rate-by-state-2024.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            let crimeRate = '';
            rows.forEach(row => {
                const columns = row.split(',').map(column => column.replace(/"/g, '').trim());
                if (columns[0].toLowerCase() === selectedState.toLowerCase()) {
                    crimeRate = columns[3]; // Assuming crime rate is the 4th column
                }
            });
            document.getElementById('output').innerText = `Crime Rate for ${selectedState}: ${crimeRate}`;
        })
        .catch(error => {
            console.error('Error fetching CSV:', error);
        });
}
