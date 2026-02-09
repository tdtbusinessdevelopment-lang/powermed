import fetch from 'node-fetch';

const API_URL = 'http://localhost:5001/api/products';

async function testViewIncrement() {
    try {
        // 1. Get all products to find a valid ID
        console.log('Fetching products...');
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
        const products = await response.json();

        if (products.length === 0) {
            console.log('No products found to test.');
            return;
        }

        const testProduct = products[0];
        console.log(`Testing with product: ${testProduct.name} (ID: ${testProduct._id})`);
        console.log(`Initial views: ${testProduct.views || 0}`);

        // 2. Increment view
        console.log('Incrementing view...');
        const incResponse = await fetch(`${API_URL}/${testProduct._id}/view`, {
            method: 'POST',
        });

        if (!incResponse.ok) {
            const errText = await incResponse.text();
            throw new Error(`Failed to increment view: ${incResponse.status} ${incResponse.statusText} - ${errText}`);
        }

        const incData = await incResponse.json();
        console.log('Increment response:', incData);

        // 3. Verify update
        console.log('Verifying update...');
        const verifyResponse = await fetch(`${API_URL}/${testProduct._id}`);
        const verifyProduct = await verifyResponse.json();
        console.log(`New views: ${verifyProduct.views}`);

        if (verifyProduct.views > (testProduct.views || 0)) {
            console.log('SUCCESS: View count increased!');
        } else {
            console.log('FAILURE: View count did not increase.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testViewIncrement();
