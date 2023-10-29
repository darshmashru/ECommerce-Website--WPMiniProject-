async function fetchData(requestData) {
    try {
        const response = await fetch('/cart-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            displayData(data);
        } else {
            console.error('Failed to retrieve data');
        }
    } catch (error) {
        console.error(error);
        console.error(error.message);
        console.error(error.stack);
    }
}
function displayData(data) {
    data.forEach(item => {
        console.log(item)
    });
}

//item variable contains all data for cart

window.addEventListener('load', async () => {
    try {
        const cartResponse = await fetch('/cart.json');
        if (cartResponse.ok) {
            const requestData = await cartResponse.json();
            fetchData(requestData);
        } else {
            console.error('Failed to load cart.json');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
