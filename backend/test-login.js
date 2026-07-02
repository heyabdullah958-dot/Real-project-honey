const testLogin = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'zeeshan.ahmed2691@gmail.com',
        password: 'password123'
      })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Login failed:', data);
    } else {
      console.log('Login successful:', data);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

testLogin();
