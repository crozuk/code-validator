document.getElementById('validateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const productCode = document.getElementById('productCode').value;
    const resultDiv = document.getElementById('result');
    
    // Display loading icon
    resultDiv.innerHTML = '<div class="loading-icon"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    
    fetch('/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: productCode }),
    })
    .then(response => response.json())
    .then(data => {
        const messageClass = data.valid ? 'alert alert-success' : 'alert alert-danger';
        resultDiv.innerHTML = `<div class="${messageClass} result-message">${data.message}</div>`;
    });
    // When displaying the loading icon and message
    resultDiv.innerHTML = '<div class="loading-icon"><i class="fas fa-spinner fa-spin"></i><span class="loading-message">Loading...</span></div>';
});
