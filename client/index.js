var web3 = new Web3(Web3.givenProvider);

var instance;
var user; 
var contractAddress = "0xff56298FD64fddF5c774B0F0583999112c231Ce5";

$(document).ready(function(){
window.ethereum.enable().then(function(accounts){

    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

    instance.events.Birth().on('data', function(Event){
        console.log('event');
        let owner = Event.returnValues.owner;
        let kittenId = Event.returnValues.kittenId;
        let mumId = Event.returnValues.mumId;
        let dadId = Event.returnValues.dadId;
        let genes = Event.returnValues.genes;
        $("#kittyCreation").css("display", "block");
        $("#kittyCreation").text("owner:" +owner 
        + " kittenId" +kittenId +" mumId:" + mumId +"dadId:" +dadId + " genes:" +genes )
        
    })
    .on('error', console.error);
    
})
})


function createKitty(){
    var dnaStr = getDna();
    instance.methods.createKittyGen0(dnaStr).send({}, function(error, txHash){
    if(error)
    console.log(error);
    else{
        console.log(txHash);
    }
} )   }