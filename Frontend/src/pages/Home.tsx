import { useState } from "react";
import Header from "../component/header";

// Define types for our data structures
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
  const [isConnected, setIsConnected] = useState(false);
  const [userNfts, setUserNfts] = useState<NFT[]>([
    {
      id: "nft-001",
      name: "Digital Dreamscape #42",
      image: "/api/placeholder/150/150",
      description: "A rare collectible from the Digital Dreamscape collection.",
    },
    {
      id: "nft-002",
      name: "Crypto Creature #17",
      image: "/api/placeholder/150/150",
      description: "A mystical creature from the blockchain realm.",
    },
    {
      id: "nft-003",
      name: "Metaverse Monument #3",
      image: "/api/placeholder/150/150",
      description: "An architectural wonder in the metaverse.",
    },
  ]);

  const [availableContributions, setAvailableContributions] = useState<
    Contribution[]
  >([
    {
      id: "contrib-001",
      title: "Community Art Gallery",
      description:
        "Contribute to our virtual art gallery and earn exclusive rewards.",
      requiredNfts: ["nft-001"],
      rewards: "10 $TOKEN + Special Badge",
      amount: "",
    },
    {
      id: "contrib-002",
      title: "Governance Proposal",
      description: "Vote on upcoming features and platform changes.",
      requiredNfts: ["nft-002", "nft-003"],
      rewards: "25 $TOKEN + Early Access",
      amount: "",
    },
    {
      id: "contrib-003",
      title: "Beta Testing Program",
      description: "Help test new features before they launch.",
      requiredNfts: ["nft-001", "nft-002"],
      rewards: "15 $TOKEN + Recognition",
      amount: "",
    },
  ]);

  const [newContribution, setNewContribution] = useState({
    title: "",
    description: "",
    requiredNfts: "",
    rewards: "",
  });

  const hasRequiredNfts = (requiredNfts: string[]): boolean => {
    const userNftIds = userNfts.map((nft) => nft.id);
    return requiredNfts.every((id) => userNftIds.includes(id));
  };

  const handleAmountChange = (id: string, value: string) => {
    setAvailableContributions((contributions) =>
      contributions.map((contribution) =>
        contribution.id === id
          ? { ...contribution, amount: value }
          : contribution
      )
    );
  };

  const handleCreateContribution = () => {
    const newEntry: Contribution = {
      id: `contrib-${Date.now()}`,
      title: newContribution.title,
      description: newContribution.description,
      requiredNfts: newContribution.requiredNfts.split(","),
      rewards: newContribution.rewards,
      amount: "",
    };
    setAvailableContributions([...availableContributions, newEntry]);
    setNewContribution({
      title: "",
      description: "",
      requiredNfts: "",
      rewards: "",
    });
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
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="w-full p-2 rounded border"
                  value={contribution.amount}
                  onChange={(e) =>
                    handleAmountChange(contribution.id, e.target.value)
                  }
                />
                <button className="mt-3 px-4 py-2 w-full rounded font-medium text-white bg-blue-500">
                  Participate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg shadow mt-6 mx-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-500">
          Create a New Contribution
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded border mb-2"
          value={newContribution.title}
          onChange={(e) =>
            setNewContribution({ ...newContribution, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 rounded border mb-2"
          value={newContribution.description}
          onChange={(e) =>
            setNewContribution({
              ...newContribution,
              description: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Required NFT IDs (comma separated)"
          className="w-full p-2 rounded border mb-2"
          value={newContribution.requiredNfts}
          onChange={(e) =>
            setNewContribution({
              ...newContribution,
              requiredNfts: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Rewards"
          className="w-full p-2 rounded border mb-2"
          value={newContribution.rewards}
          onChange={(e) =>
            setNewContribution({ ...newContribution, rewards: e.target.value })
          }
        />
        <button
          className="mt-3 px-4 py-2 w-full rounded font-medium text-white bg-blue-500"
          onClick={handleCreateContribution}
        >
          Create Contribution
        </button>
      </div>
    </div>
  );
};

export default Home;
