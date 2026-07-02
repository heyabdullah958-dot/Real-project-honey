const testLogin = async (baseUrl) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'zeeshan.ahmed2691@gmail.com',
        password: 'password123'
      })
    });
    const data = await response.json();
    console.log(`[${baseUrl}] Status ${response.status}:`, data.message || data);
  } catch (error) {
    console.error(`[${baseUrl}] ERROR:`, error.message);
  }
};

// Test both URLs
testLogin('https://amazing-natures-backend.vercel.app');
testLogin('https://amazing-natures-backend-knu72r8vi.vercel.app');
