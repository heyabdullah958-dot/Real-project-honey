// Simulate exactly what the browser does
fetch('https://amazing-natures-backend.vercel.app/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://amazingnatures.com.au'
  },
  body: JSON.stringify({ email: 'zeeshan.ahmed2691@gmail.com', password: 'password123' })
}).then(r => {
  console.log('✅ Status:', r.status);
  console.log('✅ CORS allowed origin:', r.headers.get('access-control-allow-origin'));
  return r.json();
}).then(d => {
  console.log('✅ Success:', d.message);
  console.log('✅ Role:', d.data?.role);
  console.log('✅ Token (first 30):', d.accessToken?.substring(0, 30));
}).catch(e => console.error('❌ Error:', e.message));
