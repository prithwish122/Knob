import { SynapseStorage } from './Synapse.js';

async function run() {
  const storage = new SynapseStorage();

  try {
    // Step 1: initialize
    await storage.initialize();

    // Step 2: setup payments
    await storage.setupPayments();

    // Step 3: store data
    const pieceCid = await storage.storeData(
      'DemoProtocol',
      Date.now(),
      'DemoTransaction',
      202,
      true
    );

    console.log('✅ Stored data, PieceCID:', pieceCid);

    // Step 4: retrieve data
    const retrieved = await storage.retrieveData(pieceCid);

    console.log('\n=== Retrieved JSON ===');
    console.log('Protocol:', retrieved.protocol);
    console.log('Timestamp:', retrieved.timestamp);
    console.log('Transaction:', retrieved.txType);
    console.log('Remarks:', retrieved.amount);
    console.log('Status:', retrieved.status);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await storage.cleanup();
  }
}

run();
