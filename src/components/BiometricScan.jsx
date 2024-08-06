
async function BiometricScan() {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve('biometric-data'); // Replace this with actual biometric data
      }, 1000);
  });
}

export default BiometricScan