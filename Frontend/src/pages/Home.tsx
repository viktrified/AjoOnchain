import { useState } from "react";
import Header from "../component/header";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../component/interaction/Contract";
import abi from "../component/interaction/ABI.json";
// import { ethers } from "ethers";

interface NFT {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface Contribution {
  id: string;
  title: string;
  description: string;
  requiredNfts: string[];
  rewards: string;
  amount?: string;
}

const Home = () => {
  const [isConnected] = useState(false);
  const [userNfts] = useState<NFT[]>([
    {
      id: "nft-001",
      name: "Digital Dreamscape #42",
      image: "/api/placeholder/150/150",
      description: "A rare collectible from the Digital Dreamscape collection.",
    },
  ]);

  const [availableContributions] = useState<Contribution[]>([
    {
      id: "contrib-001",
      title: "Community Art Gallery",
      description:
        "Contribute to our virtual art gallery and earn exclusive rewards.",
      requiredNfts: ["nft-001"],
      rewards: "10 $TOKEN + Special Badge",
      amount: "",
    },
  ]);

  // const [newContribution, setNewContribution] = useState(false);
  const [isContributed, setIsContributed] = useState(false);

  const { writeContract } = useWriteContract();

  const handleCreateContribution = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "contribute",
        // value: ethers.parseEther("0.1"),
      });

      alert("Contribution successful!");
      setIsContributed(true); // Disable button after contribution
    } catch (error) {
      console.error("Error creating contribution:", error);
      alert("Transaction failed.");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-col md:flex-row gap-6 px-6 flex-grow">
        <div className="w-full md:w-1/2 bg-slate-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            Your NFT Collection
          </h2>
          {!isConnected ? (
            <div className="text-center py-12 bg-gray-500 rounded-lg">
              <p className="text-gray-600">
                Please connect your wallet to view your NFTs
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userNfts.map((nft) => (
                <div
                  key={nft.id}
                  className="border rounded-lg overflow-hidden bg-gray-500 shadow"
                >
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-blue-500">{nft.name}</h3>
                    <p className="text-sm text-white mt-1">{nft.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-slate-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            Available Contributions
          </h2>
          <div className="space-y-4">
            {availableContributions.map((contribution) => (
              <div
                key={contribution.id}
                className="border rounded-lg p-4 bg-gray-700"
              >
                <h3 className="font-medium text-lg text-blue-500">
                  {contribution.title}
                </h3>
                <p className="my-2 text-white">{contribution.description}</p>
                <button
                  className={`mt-3 px-4 py-2 w-full rounded font-medium text-white ${
                    isContributed
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500"
                  }`}
                  onClick={handleCreateContribution}
                  disabled={isContributed}
                >
                  {isContributed ? "Contributed" : "Contribute"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
