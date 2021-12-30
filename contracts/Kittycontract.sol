pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./Ownable.sol";

abstract contract Kittycontract is IERC721, Ownable {

    string public constant catTokenName = "Cat";
    string public constant catSymbol = "CT";


    mapping(address => uint256) tokenOwnershipCount;
    mapping(uint256 => address) public tokenIdOwnerMapping;

    uint256 public gen0Counter; 
    uint256 public CREATION_LIMIT_GEN0 = 10; 

    function createKittyGen0(uint256 _genes) public onlyOwner returns(uint256){
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

         return _createKitty(0, 0, 0, _genes, msg.sender);
    }


    event Birth(address owner, uint256 kittenId, uint256 mumId, uint256 dadId, uint256 genes);


    struct Cat {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint256 generation;
    }

    Cat[] cats;

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
            }

            emit Transfer(_from, _to, _tokenId);
     }

     function _owns(address _claimant, uint256 _tokenId) internal view returns(bool) {
         return tokenIdOwnerMapping[_tokenId] == _claimant;
     }
}



