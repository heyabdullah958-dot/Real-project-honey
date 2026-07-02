const url = 'https://amazingnatures.com.au/admin/login';
fetch(url).then(r => r.text()).then(html => {
  // Find all next JS chunk scripts
  const matches = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g)];
  console.log('JS Chunks found:', matches.length);
  matches.forEach(m => console.log(' ', m[1]));
  
  // Also check for any backend URL baked in
  if (html.includes('amazing-natures-backend')) {
    console.log('\n✅ Backend URL found in HTML');
  } else {
    console.log('\n❌ Backend URL NOT in HTML - checking chunks...');
  }
}).catch(e => console.error(e.message));
