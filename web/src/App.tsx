import { MagnifyingGlassPlus } from 'phosphor-react'

import './styles/main.css';

import LogoImg from './assets/logo-nlw-esports.svg';

function App() {

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <img src={LogoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-1.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="block text-white font-bold">League of Legends</strong>
            <span className="block text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-2.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="block text-white font-bold">Dota 2</strong>
            <span className="block text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-3.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="block text-white font-bold">Counter Strike</strong>
            <span className="block text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-4.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="block text-white font-bold">Fortnite</strong>
            <span className="block text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-5.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="block text-white font-bold">Apex Legends</strong>
            <span className="block text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a href="#" className="relative rounded-lg overflow-hidden">
          <img src="/game-6.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="block text-white font-bold">Word Warcraft</strong>
            <span className="block text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="bg-nlw-gradient self-stretch rounded-lg mt-8 pt-1 overflow-hidden">
        <div className="flex justify-between items-center bg-[#2A2634] px-8 py-6">
          <div>
            <strong className="text-2xl text-white font-black">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <button
            className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded-lg flex items-center gap-3"
          >
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
