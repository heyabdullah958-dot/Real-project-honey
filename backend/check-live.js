// Check if the "manuka" / mgo 1999 product actually appears in the rendered products list
fetch('https://amazingnatures.com.au/products').then(r => r.text()).then(html => {
  // Check for test product
  const hasManuka = html.includes('manuka');
  const hasMgo1999 = html.includes('mgo 1999') || html.includes('mgo-1999');
  const hasMgo2999 = html.includes('2999');
  
  console.log('Contains "manuka":', hasManuka);
  console.log('Contains "mgo 1999":', hasMgo1999);
  console.log('Contains "2999":', hasMgo2999);
  
  // Count product cards
  const cardCount = (html.match(/product-card/gi) || []).length;
  console.log('Product card mentions:', cardCount);
  
  // Extract any product name near h2/h3 tags
  const productNames = [...html.matchAll(/<h[23][^>]*>([^<]+)<\/h[23]>/gi)];
  console.log('\nProduct headings found:');
  productNames.forEach(m => console.log(' -', m[1].trim()));
}).catch(e => console.error(e.message));
