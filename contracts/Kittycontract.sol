pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

abstract contract Kittycontract is IERC721, Ownable, IERC721Receiver {

    string public constant catTokenName = "Cat";
    string public constant catSymbol = "CT";

    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));


    mapping(address => uint256) tokenOwnershipCount;
    mapping(uint256 => address) public tokenIdOwnerMapping;
    mapping(uint256 => address) public kittyIndexToApproved;
    mapping(address => mapping (address => bool)) private _operatorApprovals;

    uint256 public gen0Counter; 
    uint256 public CREATION_LIMIT_GEN0 = 10; 

    // abstract constructor() public{
    //     _createKitty(0,0,0, uint256(-1), address(0));
    // }

    function breed(uint256 _dadId, uint256 _mumId) public returns(uint256){
        require(tokenIdOwnerMapping[_dadId] == msg.sender, "the user doesn't own the token");
        require(tokenIdOwnerMapping[_mumId] == msg.sender, "the user doesn't own the token");

        (uint256 dadDna,,,,uint256 DadGeneration) = getKitty(_dadId);
        (uint256 mumDna,,,,uint256 MumGeneration) = getKitty(_mumId);



        uint256 newDna = _mixDna(_dadId, _mumId);

        uint256 kidGen = 0;
        if(DadGeneration < MumGeneration){
            kidGen = MumGeneration + 1;
            kidGen /= 2;

        }else if (DadGeneration > MumGeneration){
            kidGen = DadGeneration + 1;
            kidGen /= 2;

        }else{
            kidGen = MumGeneration + 1;
        }

        _createKitty(_mumId, _dadId, kidGen, newDna, msg.sender);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external{
        _safeTransfer(_from, _to, _tokenId, "");
    }
    
    
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external{
        require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, "");
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal{
        _transfer(_from, _to, _tokenId);
        // require(_checkERC721Support(_from, _to, _tokenId, _data));
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        require(_to != address(0));
        require(msg.sender == _from || _approvedFor(msg.sender, _tokenId) || isApprovedForAll(_from, msg.sender));
        require(_owns(_from, _tokenId));
        require(_tokenId < cats.length);
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public{
        require(_owns(msg.sender, _tokenId));

        _approve(_tokenId, _to);
        emit Approval(msg.sender, _to, _tokenId);
    }

    // function setApprovalForAll(address operator, bool approved) public{
    //     require(operator != msg.sender);

    //     _operatorApprovals[msg.sender][operator] = approved;
    //     emit ApprovalForAll(msg.sender, operator, approved);
    // }

    function getApproved(uint256 tokenId) public view returns(address){
        require(tokenId < cats.length);

        return kittyIndexToApproved[tokenId];
    }

    function isApprovedForAll(address owner, address operator) public view returns(bool){
        return _operatorApprovals[owner][operator];
    }


    function getKitty(uint256 _id) public view returns(
        uint256 genes, 
        uint256 birthTime, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 generation
    )
    {
        Cat storage kitty = cats[_id];
        birthTime = uint256(kitty.birthTime);
        mumId = uint256(kitty.mumId);
        dadId = uint256(kitty.dadId);
        generation = uint256(kitty.generation);
        genes = kitty.genes;
        
    }
    function createKittyGen0(uint256 _genes) public onlyOwner returns(uint256){
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

         return _createKitty(0, 0, 0, _genes, msg.sender);
    }

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;


    event Birth(address owner, uint256 kittenId, uint256 mumId, uint256 dadId, uint256 genes);


    struct Cat {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint256 generation;
    }

    Cat[] cats;

    function supportsInterface(bytes4 _InterfaceId) external pure returns(bool){
        return ( _InterfaceId == _INTERFACE_ID_ERC721 || _InterfaceId == _INTERFACE_ID_ERC165);
    }

    function _createKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) public returns(uint256) {
        Cat memory _cat = Cat({
            genes: _genes, 
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId), 
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });
         cats.push(_cat);
         uint256 newCatId = cats.length - 1;

         emit Birth(_owner, newCatId, _mumId, _dadId, _genes);

         _transfer(address(0), _owner, newCatId);

         return newCatId;
    }

    function balanceOf(address owner) external view returns (uint256 balance){
        return tokenOwnershipCount[owner];
    }

    function totalSupply() external view returns (uint256 total){
        return cats.length;
    }

    function name() external view returns (string memory tokenName){
        return catTokenName;
    }

    function symbol() external view returns (string memory tokenSymbol){
        return catSymbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner){
        return tokenIdOwnerMapping[tokenId];
    }

    function transfer(address to, uint256 _tokenId) external {
         require(to != address(0), "You cannot send tokens to this address!");
         require(to != address(this), "You cannot send tokens to this address!");
         require(_owns(msg.sender, _tokenId), "You are not the owner of this token!");

         _transfer(msg.sender, to, _tokenId);

         
     }

     function _transfer(address _from, address _to, uint256 _tokenId) internal {
            tokenOwnershipCount[_to]++;

            tokenIdOwnerMapping[_tokenId] = _to;

            if(_from != address(0)){
                tokenOwnershipCount[_from]--;
                delete kittyIndexToApproved[_tokenId];
            }

            emit Transfer(_from, _to, _tokenId);
     }

     function _owns(address _claimant, uint256 _tokenId) internal view returns(bool) {
         return tokenIdOwnerMapping[_tokenId] == _claimant;
     }


function _approve(uint256 _tokenId, address _approved) internal {
kittyIndexToApproved[_tokenId] = _approved;
}

function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool){
    return kittyIndexToApproved[_tokenId] == _claimant;
}

// function _checkERC721Support(address _from,address _to,uint256 _tokenId,bytes memory _data) internal returns (bool){
// if(_isContract(_to)){
//     return true;
// }

// //     bytes4 returnData = IERC721Receiver(_to).onERC721RECEIVED(msg.sender, _from, _tokenId, _data);
// //     return returnData = MAGIC_ERC721_RECEIVED;

// // }
// // function _isContract(address _to) view internal returns(bool){
// // uint32 size;
// // assembly{
// //     size := extcodesize(_to)
// // }
// // return size > 0;
// // }
// }

function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal view returns (bool){
    require(_owns(_from, _tokenId));
    require(_to != address(0));
        require(_tokenId < cats.length);
        return (_spender == _from || _approvedFor(_spender, _tokenId) || isApprovedForAll(_from, _spender)); 
}
function _mixDna(uint256 _dadDna, uint256 _mumDna) internal returns(uint256){
    uint256 firstHalf = _dadDna / 100000000;
    uint256 secondHalf = _mumDna % 100000000;

    uint256 newDna = firstHalf * 100000000;
    newDna = newDna + secondHalf;
    return newDna;

}
}