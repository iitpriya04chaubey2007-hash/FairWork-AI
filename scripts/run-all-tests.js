// Cross-platform test runner for FairWork AI
const { spawnSync } = require('child_process');

console.log('====================================================');
console.log('   FAIRWORK AI - AUTOMATED TEST SUITE');
console.log('====================================================\n');

console.log('--- [1/2] Running Backend API Tests (server/test/api.test.js) ---');
const serverTest = spawnSync('node', ['--test', 'server/test/api.test.js'], {
  stdio: 'inherit',
  shell: true
});

if (serverTest.status !== 0) {
  console.error('\n❌ Server tests failed!');
  process.exit(serverTest.status || 1);
}

console.log('\n--- [2/2] Running Frontend Logic & i18n Tests (client/test/logic.test.js) ---');
const clientTest = spawnSync('node', ['--test', 'client/test/logic.test.js'], {
  stdio: 'inherit',
  shell: true
});

if (clientTest.status !== 0) {
  console.error('\n❌ Client tests failed!');
  process.exit(clientTest.status || 1);
}

console.log('\n====================================================');
console.log('   ✅ ALL TESTS PASSED SUCCESSFULLY (13/13)');
console.log('====================================================\n');
