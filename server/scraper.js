// Razorpay Vahan API Integration Example
// This script demonstrates how to call the Razorpay Identity API for vehicle verification.
// To use this, you will need a Razorpay account and your API Key ID and Secret.

const RAZORPAY_KEY_ID = 'YOUR_KEY_ID';
const RAZORPAY_KEY_SECRET = 'YOUR_KEY_SECRET';
const VEHICLE_NUMBER = 'HR26AR7790'; // Example

async function fetchVahanData() {
  console.log(`Calling Razorpay API for vehicle: ${VEHICLE_NUMBER}...`);
  
  try {
    // Razorpay uses Basic Auth (Key ID : Key Secret)
    const authHeader = 'Basic ' + Buffer.from(RAZORPAY_KEY_ID + ':' + RAZORPAY_KEY_SECRET).toString('base64');
    
    // Note: The endpoint URL below is an example based on typical Razorpay identity API structures.
    // You should check the Razorpay documentation for the exact Vahan verification endpoint.
    const response = await fetch('https://api.razorpay.com/v1/identities/vahan', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vehicle_number: VEHICLE_NUMBER
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('Success! Data received:');
      console.log(data);
    } else {
      console.error('API Error:', data.error || response.statusText);
    }
    
  } catch (error) {
    console.error('Failed to connect to Razorpay API:', error);
  }
}

fetchVahanData();
