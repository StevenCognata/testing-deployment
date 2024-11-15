// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TemptationToken is ERC20 {
    struct Contestant {
        address payable wallet;
        string imageHash;  // IPFS hash of image
        uint256 votes;
        uint256 totalBets;
    }

    mapping(uint256 => Contestant[]) public weeklyContestants;
    uint256 public currentWeek;
    uint256 public weeklyPrizePool;

    constructor() ERC20("Temptation Token", "TEMP") {
        // Initial minting
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    function submitPhoto(string memory _imageHash) public {
        Contestant memory newContestant = Contestant({
            wallet: payable(msg.sender),
            imageHash: _imageHash,
            votes: 0,
            totalBets: 0
        });
        weeklyContestants[currentWeek].push(newContestant);
    }

    function vote(uint256 contestantId, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient tokens");
        
        // Transfer tokens to contract
        transfer(address(this), amount);
        
        // Update contestant votes
        weeklyContestants[currentWeek][contestantId].votes++;
        weeklyContestants[currentWeek][contestantId].totalBets += amount;
        weeklyPrizePool += amount;
    }
} 