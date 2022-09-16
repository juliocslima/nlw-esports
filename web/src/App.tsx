import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import LogoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import './styles/main.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);  
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => setGames(response.data));
  }, [open]);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <img src={LogoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        { games && games.map(game => {
          return (
            <GameBanner 
              key={game.id}
              title={game.title} 
              adsCount={game._count.ads} 
              bannerUrl={game.bannerUrl} 
            />
          )
        })}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <CreateAdBanner />

        <CreateAdModal handleOpenChange={setOpen} />
      </Dialog.Root>      
    </div>
  )
}

export default App
