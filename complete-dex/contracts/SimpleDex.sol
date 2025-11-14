// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleDex is Ownable {
    address public token1;
    address public token2;
    uint public reserve1;
    uint public reserve2;
    
    event TokensSwapped(
        address indexed swapper,
        address indexed fromToken,
        address indexed toToken,
        uint amountIn,
        uint amountOut
    );

    constructor(address _token1, address _token2) {
        token1 = _token1;
        token2 = _token2;
    }

    function addLiquidity(uint _amount1, uint _amount2) external {
        require(_amount1 > 0 && _amount2 > 0, "Invalid amounts");
        
        IERC20(token1).transferFrom(msg.sender, address(this), _amount1);
        IERC20(token2).transferFrom(msg.sender, address(this), _amount2);
        
        reserve1 += _amount1;
        reserve2 += _amount2;
    }

    function swapTokens(
        address fromToken,
        address toToken,
        uint amountIn
    ) external {
        require(
            (fromToken == token1 && toToken == token2) ||
            (fromToken == token2 && toToken == token1),
            "Invalid tokens"
        );
        
        uint amountOut;
        if (fromToken == token1) {
            amountOut = getAmountOut(amountIn, reserve1, reserve2);
            require(amountOut > 0, "Insufficient output amount");
            
            IERC20(token1).transferFrom(msg.sender, address(this), amountIn);
            IERC20(token2).transfer(msg.sender, amountOut);
            
            reserve1 += amountIn;
            reserve2 -= amountOut;
        } else {
            amountOut = getAmountOut(amountIn, reserve2, reserve1);
            require(amountOut > 0, "Insufficient output amount");
            
            IERC20(token2).transferFrom(msg.sender, address(this), amountIn);
            IERC20(token1).transfer(msg.sender, amountOut);
            
            reserve2 += amountIn;
            reserve1 -= amountOut;
        }
        
//simple and complete swap 
        emit TokensSwapped(msg.sender, fromToken, toToken, amountIn, amountOut);
    }

    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) public pure returns (uint) {
        require(amountIn > 0, "Insufficient input amount");
        require(reserveIn > 0 && reserveOut > 0, "Invalid reserves");
        
        uint amountInWithFee = amountIn * 997;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = reserveIn * 1000 + amountInWithFee;
        
        return numerator / denominator;
    }
}
