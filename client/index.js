var web3 = new Web3(Web3.givenProvider);

var instance;
var user; 
var contractAddress = "0xc28edE87bdfBABd06d902f1c1a3064A760D23C02";

$(document).ready(function(){
window.ethereum.enable().then(function(accounts){

    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

    
})
})

function createKitty(){
instance.methods.createKittyGen0(dnaStr).send({}, function(error, txHash){
    if(err)
    console.log(err);
    else{
        console.log(txHash);
    }
} )   }