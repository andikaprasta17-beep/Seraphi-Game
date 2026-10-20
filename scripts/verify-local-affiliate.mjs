import http from 'http';

const port = process.env.PORT || 3000;
http.get(`http://localhost:${port}/`, (res) => {
  console.log('HTTP Status:', res.statusCode);
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const hasUrlTangzu = data.includes('https://s.shopee.co.id/20wN4AbcBL');
    const hasUrlOnikuma = data.includes('https://s.shopee.co.id/9V26hRMsP2');
    const hasRel = data.includes('rel="sponsored nofollow noopener"');
    const hasTarget = data.includes('target="_blank"');
    const hasTangzuProduct = data.includes('TANGZU Xue Tao Gaming IEM');
    const hasOnikumaProduct = data.includes('ONIKUMA Gaming Bundle 3-in-1');
    const hasTangzuImg = data.includes('/images/gear/tangzu-xue-tao-iem.webp');
    const hasOnikumaImg = data.includes('/images/gear/onikuma-gaming-bundle-3in1.webp');
    const hasKeranjangKuning = data.includes('Keranjang Kuning');
    const hasDisclosure = data.includes('Keranjang Kuning') || data.includes('Seraphi Game dapat memperoleh komisi');

    console.log('=== HASIL VERIFIKASI HALAMAN UTAMA LOKAL ===');
    console.log('- Affiliate URL TANGZU (20wN4AbcBL):', hasUrlTangzu ? 'PASS ✓' : 'FAIL ✗');
    console.log('- Affiliate URL ONIKUMA (9V26hRMsP2):', hasUrlOnikuma ? 'PASS ✓' : 'FAIL ✗');
    console.log('- rel="sponsored nofollow noopener":', hasRel ? 'PASS ✓' : 'FAIL ✗');
    console.log('- target="_blank":', hasTarget ? 'PASS ✓' : 'FAIL ✗');
    console.log('- Nama produk TANGZU sesuai:', hasTangzuProduct ? 'PASS ✓' : 'FAIL ✗');
    console.log('- Nama produk ONIKUMA sesuai:', hasOnikumaProduct ? 'PASS ✓' : 'FAIL ✗');
    console.log('- Gambar produk TANGZU sesuai:', hasTangzuImg ? 'PASS ✓' : 'FAIL ✗');
    console.log('- Gambar produk ONIKUMA sesuai:', hasOnikumaImg ? 'PASS ✓' : 'FAIL ✗');
    console.log('- Keranjang Kuning Shopee:', hasKeranjangKuning ? 'PASS ✓' : 'FAIL ✗');
    console.log('- Keterangan komisi / transparansi:', hasDisclosure ? 'PASS ✓' : 'FAIL ✗');
  });
});
