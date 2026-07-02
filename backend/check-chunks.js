// Search the actual JS bundle for the API URL
const chunks = [
  '/_next/static/chunks/06qiroe-o1ktp.js',
  '/_next/static/chunks/0n1bpogj.il~n.js',
  '/_next/static/chunks/10u3y4bw1ayzs.js',
];

const baseUrl = 'https://amazingnatures.com.au';

async function searchChunks() {
  // Fetch all chunks and search for localhost or backend URL
  const allChunks = [
    '/_next/static/chunks/06qiroe-o1ktp.js',
    '/_next/static/chunks/0n1bpogj.il~n.js',
    '/_next/static/chunks/10u3y4bw1ayzs.js',
    '/_next/static/chunks/0pqt~8bl3ukh4.js',
    '/_next/static/chunks/0i0jjj_la_hzf.js',
    '/_next/static/chunks/0z-w~x_50ib1n.js',
    '/_next/static/chunks/0d3shmwh5_nmn.js',
    '/_next/static/chunks/0x7quhx7b_5qm.js',
    '/_next/static/chunks/0str0r5nyr70c.js',
    '/_next/static/chunks/0vo8eotiw_l4h.js',
    '/_next/static/chunks/17c5o2ywcr~au.js',
    '/_next/static/chunks/03~yq9q893hmn.js',
    '/_next/static/chunks/0yb2wil16uz6h.js',
  ];

  for (const chunk of allChunks) {
    try {
      const res = await fetch(baseUrl + chunk);
      const text = await res.text();
      if (text.includes('localhost:5000') || text.includes('amazing-natures-backend') || text.includes('api/auth/login')) {
        console.log('\n✅ FOUND in chunk:', chunk);
        // Extract surrounding context
        const idx = text.indexOf('localhost:5000');
        const idx2 = text.indexOf('amazing-natures-backend');
        const idx3 = text.indexOf('api/auth/login');
        if (idx !== -1) console.log('  localhost context:', text.substring(Math.max(0,idx-50), idx+60));
        if (idx2 !== -1) console.log('  backend context:', text.substring(Math.max(0,idx2-50), idx2+80));
        if (idx3 !== -1) console.log('  login context:', text.substring(Math.max(0,idx3-100), idx3+50));
      }
    } catch(e) {
      console.log('Error fetching', chunk, e.message);
    }
  }
  console.log('\nDone searching all chunks.');
}

searchChunks();
