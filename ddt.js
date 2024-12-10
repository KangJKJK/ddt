const web3 = require('@solana/web3.js');
const bs58 = require('bs58');

// 설정
const PRIVATE_KEY = '여기에_개인키를_넣으세요'; // base58 형식
const RPC_URL = 'https://api.mainnet-beta.solana.com';

async function main() {
    try {
        // 연결 설정
        const connection = new web3.Connection(RPC_URL, 'confirmed');
        
        // 지갑 설정
        const keypair = web3.Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));
        
        // 트랜잭션 생성
        const transaction = new web3.Transaction();
        
        // 프로그램 ID 설정
        const programId = new web3.PublicKey('프로그램_ID를_여기에_넣으세요');
        
        // Instruction 데이터 설정
        const instruction = new web3.TransactionInstruction({
            keys: [
                // 필요한 계정들을 여기에 추가
                // { pubkey: new web3.PublicKey('계정주소'), isSigner: false, isWritable: true },
            ],
            programId,
            data: Buffer.from([]) // 실제 instruction 데이터
        });
        
        transaction.add(instruction);
        
        // 트랜잭션 전송
        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [keypair],
            {
                skipPreflight: true,
                commitment: 'confirmed'
            }
        );
        
        console.log('트랜잭션 성공:', signature);
        
    } catch (error) {
        console.error('오류 발생:', error);
    }
}

main();