import React, { useState } from 'react';
import './styles/globals.css';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Wallet, CreditCard, Send, Flame, Home, Folder, ShoppingBag, Menu, X } from 'lucide-react';
import { connectWallet, getAccount, getBalance } from './services/ethereumService';
import { connectTezosWallet, getTezosAccount, getTezosBalance } from './services/tezosService';
import { mintMeme, transferMeme, burnMeme } from './components/nftService';
import HomePage from './pages/home';
import MarketplacePage from './pages/Marketplace';
import MyCollectionPage from './pages/MyCollection';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ethereumAccount, setEthereumAccount] = useState('');
  const [ethereumBalance, setEthereumBalance] = useState('');
  const [tezosAccount, setTezosAccount] = useState('');
  const [tezosBalance, setTezosBalance] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [tokenUri, setTokenUri] = useState('');
  const [isEthereumWalletConnected, setIsEthereumWalletConnected] = useState(false);
  const [isTezosWalletConnected, setIsTezosWalletConnected] = useState(false);

  const handleConnectEthereum = async () => {
    try {
      await connectWallet();
      const account = await getAccount();
      setEthereumAccount(account);
      const balance = await getBalance(account);
      setEthereumBalance(balance);
      setIsEthereumWalletConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleConnectTezos = async () => {
    try {
      await connectTezosWallet();
      const account = await getTezosAccount();
      setTezosAccount(account);
      const balance = await getTezosBalance(account);
      setTezosBalance(balance);
      setIsTezosWalletConnected(true)
      toast.success('Tezos wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting Tezos wallet:', error);
      toast.error('Failed to connect Tezos wallet');
    }
  };

  const handleMintMeme = async () => {
    try {
      await mintMeme(recipientAddress, tokenUri);
      toast.success('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT');
    }
  };

  const handleTransferMeme = async () => {
    try {
      await transferMeme(recipientAddress, tokenId);
      toast.success('NFT transferred successfully!');
    } catch (error) {
      console.error('Error transferring NFT:', error);
      toast.error('Failed to transfer NFT');
    }
  };

  const handleBurnMeme = async () => {
    try {
      await burnMeme(tokenId);
      toast.success('NFT burned successfully!');
    } catch (error) {
      console.error('Error burning NFT:', error);
      toast.error('Failed to burn NFT');
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-blue-700 shadow-lg z-40"
          >
            <div className="p-6 pt-16">
              <h1 className="text-2xl font-bold mb-6 text-white">MEME-COIN</h1>
              <nav className="space-y-4">
                {['home', 'collections', 'marketplace'].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? 'secondary' : 'ghost'}
                    className={`flex items-center w-full justify-start text-lg capitalize p-2 ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'home' && <Home className="h-5 w-5 mr-2" />}
                    {tab === 'collections' && <Folder className="h-5 w-5 mr-2" />}
                    {tab === 'marketplace' && <ShoppingBag className="h-5 w-5 mr-2" />}
                    {tab}
                  </Button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8 ml-0 lg:ml-64 transition-all duration-300">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <HomePage />

            <Tabs defaultValue="ethereum" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                <TabsTrigger value="tezos">Tezos</TabsTrigger>
              </TabsList>
             
              <TabsContent value="ethereum">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-700">Ethereum Wallet</CardTitle>
                    <CardDescription>Manage your Ethereum assets and NFTs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Account:</strong> {ethereumAccount || 'Not connected'}</p>
                      <p><strong>Balance:</strong> {ethereumBalance || 'N/A'} ETH</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isEthereumWalletConnected ? (
                      <p className="text-green-600 font-bold">Wallet Connected</p>
                    ) : (
                      <Button
                        onClick={handleConnectEthereum}
                        className="w-full sm:w-1/3 bg-purple-600 text-white hover:bg-purple-700"
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Ethereum Wallet
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="tezos">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-700">Tezos Wallet </CardTitle>
                    <CardDescription>Manage your Tezos assets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Account:</strong> {tezosAccount || 'Not connected'}</p>
                      <p><strong>Balance:</strong> {tezosBalance || 'N/A'} XTZ</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isTezosWalletConnected ? (
                      <p className="text-green-600 font-bold">Wallet Connected</p>
                    ) : (
                      <Button
                        onClick={handleConnectTezos}
                        className="w-full sm:w-1/3 bg-purple-600 text-white hover:bg-purple-700">
                        <Wallet className="mr-2 h-4 w-4" /> Connect Tezos Wallet
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* NFT Operations */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">NFT Operations</CardTitle>
                <CardDescription>Mint, transfer, or burn NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'recipient', label: 'Recipient Address', placeholder: '0x...', value: recipientAddress, onChange: setRecipientAddress },
                    { id: 'tokenId', label: 'Token ID', placeholder: 'Token ID', value: tokenId, onChange: setTokenId },
                    { id: 'tokenUri', label: 'Token URI', placeholder: 'ipfs://...', value: tokenUri, onChange: setTokenUri }
                  ].map(({ id, label, placeholder, value, onChange }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <Input
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleMintMeme} className="w-full sm:w-1/3 bg-purple-600 text-white hover:bg-purple-700">
                  <CreditCard className="mr-2 h-4 w-4" /> Mint NFT
                </Button>
                <Button onClick={handleTransferMeme} className="w-full sm:w-1/3 bg-purple-600 text-white hover:bg-purple-700">
                  <Send className="mr-2 h-4 w-4" /> Transfer NFT
                </Button>
                <Button onClick={handleBurnMeme} className="w-full sm:w-1/3 bg-red-600 text-white hover:bg-red-700">
                  <Flame className="mr-2 h-4 w-4" /> Burn NFT
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'collections' && <MyCollectionPage />}
        {activeTab === 'marketplace' && <MarketplacePage />}
      </div>
      <ToastContainer />
    </div>
  );
}