import axios from 'axios';

import  * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {Check, GameController } from "phosphor-react";

import { Input } from "../Form/Input";
import { Game } from "../../model";
import { FormEvent, useEffect, useState } from "react";

interface CreateAdModalProps {
  handleOpenChange: (value: boolean) => void;
}

type GameSelect = Pick<Game, "id" | "title">;

type WeekDaysData = {
  id: number;
  title: string;
  tag: string;
}

export function CreateAdModal({ handleOpenChange }: CreateAdModalProps) {
  const [games, setGames] = useState<GameSelect[]>([]);
  const [game, setGame] = useState<string>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  const weekDaysData: WeekDaysData[] = [
    { id: 0, title: 'domingo', tag: 'D' },
    { id: 1, title: 'segunda', tag: 'S' },
    { id: 2, title: 'terça', tag: 'T' },
    { id: 3, title: 'quarta', tag: 'Q' },
    { id: 4, title: 'quinta', tag: 'Q' },
    { id: 5, title: 'sexta', tag: 'S' },
    { id: 6, title: 'sábado', tag: 'S' },
  ];

  function handleSelectGame(event: any) {
    setGame(event.target.value);
  }

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => setGames(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if(!data.name) {
      alert('Favor informar todos os campos');
      return;
    }

    try { 
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert('Anúncio criado com sucesso');
      handleOpenChange(false);
    } catch (error) {
      console.log(error);
      alert('Erro ao criar anúncio');
    }
    
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] text-white py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o seu game?</label>
            <select
              id="game"
              name="game"
              className="flex bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
              defaultValue=""
              onSelect={(event) => handleSelectGame(event)}
            >
              <option disabled value="">Selecione o game que deseja jogar</option>
              { games && games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              }) }
            </select>
            
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
            <Input 
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">Joga a quantos anos?</label>
              <Input 
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser zero"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">Qual seu discord?</label>
              <Input 
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-1"
                value={weekDays}
                onValueChange={setWeekDays}
              >
              { weekDaysData && weekDaysData.map((day) => {
                return (
                    <ToggleGroup.Item 
                      key={day.id}
                      title={day.title} 
                      value={day.id.toString()}
                      className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                    >
                      {day.tag}
                    </ToggleGroup.Item>
                )
              }) }
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input name="hourStart" id="hourStart" type="time" placeholder="De"/>
                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até"/>
              </div>
            </div>
          </div>

          <label className="flex mt-2 gap-2 text-sm items-center">
            <Checkbox.Root 
              onCheckedChange={(checked) => {
                if(checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold">Cancelar</Dialog.Close>
            <button 
              className="flex items-center bg-violet-500 px-5 h-12 rounded-md font-semibold gap-3 hover:bg-violet-600"
              type="submit">
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
