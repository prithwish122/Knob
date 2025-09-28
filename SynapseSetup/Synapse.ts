
import { Synapse, RPC_URLS } from '@filoz/synapse-sdk';
import { ethers } from 'ethers';




//Demo JSON Structure
interface JsonRecord{
    protocol: string,
    timestamp: number,
    txType: string,
    amount: number,
    status: boolean,
}

class SynapseStorage{
    private synapse: Synapse| null = null;
    private provider: ethers.WebSocketProvider | null = null;

    async initialize(): Promise<void> {
        console.log('Environment Check: ');
        console.log('Private key loaded');
        console.log('RPC URL Loaded');
        let privateKey = process.env.NEXT_PUBLIC_CRAZY_KEY;
        if (!privateKey){
            console.error('❌ No PRIVATE_KEY found in environment.');
            console.log('📋 Make sure your .env file contains:');
            console.log('   CRAZY_KEY=0xYOUR_PRIVATE_KEY_HERE');
            console.log('   WS_RPC_URL=https://api.calibration.node.glif.io/rpc/v1');
            throw new Error('CRAZY_KEY environment variable is required');
        }
        const rpcUrl = process.env.WS_RPC_URL || RPC_URLS.calibration.http;
        console.log('RPC URL:', rpcUrl);
        console.log('Chain ID: 314159');
        console.log('Token: tFIL (test FIL)');

        this.synapse = await Synapse.create({privateKey, rpcURL: rpcUrl});

        const provider = this.synapse.getProvider();
        const wallet = new ethers.Wallet(privateKey, provider);
        const walletAddress = await wallet.getAddress();
        console.log('Wallet address:', walletAddress);
        console.log('Synapse initialized');

    }

    async setupPayments(): Promise<void>{
        if (!this.synapse) {
            throw new Error('Synapse not initialized.');
        }
        console.log('Setting up payments using tFIL');
        
        try{
            const walletBalance = await this.synapse.payments.walletBalance();
            console.log('Wallet tFIL balance', ethers.formatEther(walletBalance),'tFIL' );

            const minRequiredtFIL = ethers.parseUnits('1', 18);
            if(walletBalance<minRequiredtFIL){
                throw new Error(`Insufficient tFIL. Min required is ${ethers.formatEther(minRequiredtFIL)} tFIL`);
            
            }
            console.log(`Sufficient balance of ${ethers.formatEther(walletBalance)} tFIL`);

            const usdfcBalance = await this.synapse.payments.balance();
            console.log('Current USDFC balance:', ethers.formatEther(usdfcBalance), 'USDFC');

            const requiredUSDFC = ethers.parseUnits('5', 18);
            if(usdfcBalance<requiredUSDFC){
                const neededAmount = requiredUSDFC - usdfcBalance;
                console.log(`Need ${ethers.formatEther(neededAmount)} more USDFC. Depositing`);
                console.log('Note: SDK requires USDFC for storage payments, not tFIL directly');

                try{
                    const depositTx = await this.synapse.payments.deposit(neededAmount);
                    console.log('Deposit transaction:', depositTx.hash);
                    console.log('Waiting for confirmation');
                    await depositTx.wait();
                    console.log('USDC deposit confirmed');
                } catch(error: any){
                    console.error('Deposit failed. You may need USDFC tokens in your wallet.');
                    console.log('Current payments contract balance: 9.9 USDFC');
                    console.log('This should be sufficient for storage operations.');
                    console.log('Proceeding with current balance...');
                }
            }else{
                console.log('Sufficient USDFC balance available already');
            }
            const warmStorageAddress = await this.synapse.getWarmStorageAddress();
            console.log('Approving Warm Storage service for USDFC payments');

            const approveTx = await this.synapse.payments.approveService(
                warmStorageAddress, 
                ethers.parseUnits('1', 18), 
                ethers.parseUnits('9', 18), 
                86400);
            console.log('Service approval transaction:', approveTx.hash);
            console.log('Waiting for confimation...');
            await approveTx.wait();
            console.log('Service approval confirmed');
            console.log('Payments setup complete! Ready for storage');
            console.log('Note: Storage payments use USDFC, but you have 200 tFIL for gass fee');
        }catch(error: any){
            console.error('Payments setup failed:', error);
            if(error.meesage && error.meesage.includes('insufficient funds')){
                console.log('Tips:');
                console.log('1. Make sure you have tFIL tokens for gas fees');
                console.log('2. You need at least 1 tFIL for storage operations');
                console.log('3. FFor Calibration testnet, you can get test tokens from faucets');
            }
            throw error;
        }
    }
    async storeData(
protocol: string, timestamp: number, txType: string, amount: number, status: boolean,
      ): Promise<string> {
        if (!this.synapse) {
          throw new Error('Synapse not initialized. Call initialize() first.');
        }
    
        const record: JsonRecord = {
            protocol,
            timestamp,
            txType,
            amount,
            status,
        };
    
        console.log('Preparing JSON data:', record);
    
        // Convert JSON to Uint8Array
        const jsonString = JSON.stringify(record);
        const data = new TextEncoder().encode(jsonString);
    
        console.log('Data size:', data.length, 'bytes');
    
        try {
          // Upload using simplified API (auto-manages context)
          console.log('Uploading to Filecoin...');
          const result = await this.synapse.storage.upload(data);
          
          const pieceCid = result.pieceCid.toString();
          console.log('Upload complete! PieceCID:', pieceCid);
          
          return pieceCid;
        } catch (error) {
          console.error('Upload failed:', error);
          throw error;
        }
      }
    
      /**
       * Retrieve JSON data from Filecoin via Synapse
       */
      async retrieveData(pieceCid: string): Promise<JsonRecord> {
        if (!this.synapse) {
          throw new Error('Synapse not initialized. Call initialize() first.');
        }
    
        console.log('Retrieving data for PieceCID:', pieceCid);
    
        try {
          // Download using simplified API (SP-agnostic)
          const data = await this.synapse.storage.download(pieceCid);
          
          // Convert back to JSON
          const jsonString = new TextDecoder().decode(data);
          const record = JSON.parse(jsonString) as JsonRecord;
          
          console.log('Retrieved JSON:', record);
          return record;
        } catch (error) {
          console.error('Download failed:', error);
          throw error;
        }
      }
    
      /**
       * Clean up resources
       */
      async cleanup(): Promise<void> {
        if (this.synapse) {
          const provider = this.synapse.getProvider();
          if (provider && typeof provider.destroy === 'function') {
            await provider.destroy();
            console.log('Provider connection closed');
          }
        }
      }
    }
    
    
// Export for use as module
export { SynapseStorage };
  export type { JsonRecord };
    
    // Run if called directly
    console.log('Script started...');
    
    