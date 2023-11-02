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
        } else {
            console.error('Failed to retrieve data');
        }
    } catch (error) {
        console.error(error);
        console.error(error.message);
        console.error(error.stack);
    }
}

//item variable contains all data for cart

let objectIDToDelete = "ok";

// Event listener for button clicks
document.addEventListener('maincartloaded', () => {
    const anchors = document.querySelectorAll('a[id]');
    document.querySelectorAll('a[id]').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            objectIDToDelete = button.id
            fetch('/remove-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ objectID: objectIDToDelete }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Failed to delete entry:', error);
            });
        });
    });
});

document.addEventListener('minicartloaded', () => {
    const anchors = document.querySelectorAll('a[id]');
    document.querySelectorAll('a[id]').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            objectIDToDelete = button.id
            fetch('/remove-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ objectID: objectIDToDelete }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Failed to delete entry:', error);
            });
        });
    });
});

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
