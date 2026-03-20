const  fs =  require('fs')



async function jwkcreateKeystore(pPublicFilePath) {
    console.log("Reading:", pPublicFilePath);

        const webtoken = require('node-jose');
        const keystore = webtoken.JWK.createKeyStore();
        let mPublickey = fs.readFileSync(pPublicFilePath)
        return await keystore
            .add(mPublickey, 'pem')
            .then(function (_) {
                const jwks = keystore.toJSON('false');
                return jwks.keys
            });
    }

async function main(){
    const path = '../src/jwspub.pem'; 
const keys = await jwkcreateKeystore(path);
console.log(keys);
}
main();