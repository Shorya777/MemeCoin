import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ethers } from 'ethers'; 

const initialMemes = [
  { id: 1, title: "Doge to the Moon", image: "/placeholder.svg?height=300&width=300", price: "0.05" },
  { id: 2, title: "Distracted Boyfriend", image: "/placeholder.svg?height=300&width=300", price: "0.07" },
  { id: 3, title: "Woman Yelling at Cat", image: "/placeholder.svg?height=300&width=300", price: "0.06" },
  { id: 4, title: "Drake Hotline Bling", image: "/placeholder.svg?height=300&width=300", price: "0.08" },
  { id: 5, title: "Two Buttons", image: "/placeholder.svg?height=300&width=300", price: "0.04" },
  { id: 6, title: "Expanding Brain", image: "/placeholder.svg?height=300&width=300", price: "0.09" },
  { id: 7, title: "Surprised Pikachu", image: "/placeholder.svg?height=300&width=300", price: "0.03" },
  { id: 8, title: "This Is Fine", image: "/placeholder.svg?height=300&width=300", price: "0.05" },
];

export default function MarketplacePage() {
  const [trendingMemes, setTrendingMemes] = useState(initialMemes);

  const buyNFT = (id, price) => {
    console.log(`Buying NFT ${id} for ${price} ETH`);
    // Implement the logic for NFT purchase here
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingMemes.map((meme) => (
          <Card key={meme.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">{meme.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={meme.image} 
                alt={meme.title} 
                className="w-full h-48 object-cover rounded-md"
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-semibold">{meme.price} ETH</span>
              <Button onClick={() => buyNFT(meme.id, meme.price)}>
                Buy NFT
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
