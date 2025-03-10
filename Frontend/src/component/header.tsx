import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const primaryColor = "#2f16d3"; // Slate blue
  const backgroundColor = "#242424"; // Ash color
  const textColor = "#1f1212";

  return (
    <div className="mb-8 text-center p-6 rounded-lg shadow flex justify-between items-center">
      <h1 className="text-3xl font-bold mb-3" style={{ color: primaryColor }}>
        Ajo Onchain
      </h1>
      <ConnectButton />
    </div>
  );
};

export default Header;
