document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('validateForm');
    const productCode = document.getElementById('productCode');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const validationMessage = document.getElementById('validationMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateProductCode();
    });

    function validateProductCode() {
        // Clear previous feedback
        productCode.classList.remove('is-valid', 'is-invalid');
        validationMessage.innerHTML = '';

        // Display loading state
        productCode.disabled = true;
        loadingSpinner.classList.remove('d-none');

        fetch('/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: productCode.value }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                productCode.classList.add('is-valid');
                validationMessage.innerHTML = '<div class="alert alert-success">Valid Code</div>';
            } else {
                productCode.classList.add('is-invalid');
                validationMessage.innerHTML = '<div class="alert alert-danger">Invalid code. Please try again.</div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            productCode.classList.add('is-invalid');
            validationMessage.innerHTML = '<div class="alert alert-danger">An error occurred. Please try again.</div>';
        })
        .finally(() => {
            productCode.disabled = false;
            loadingSpinner.classList.add('d-none');
        });
    }
});
