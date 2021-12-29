pragma solidity ^0.8.10;

import "./IERC721.sol";

abstract contract Kittycontract is IERC721 {

    string public constant catTokenName = "Cat";
    string public constant catSymbol = "CT";

    mapping(address => uint256) tokenOwnershipCount;
    mapping(uint256 => address) public tokenIdOwnerMapping;


    struct Cat {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Cat[] cats;


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



