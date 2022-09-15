interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount}: GameBannerProps) {

  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="block text-white font-bold">{title}</strong>
        <span className="block text-zinc-300 text-sm">{adsCount} anúncio<span>{adsCount > 1 && 's'}</span></span>
      </div>
    </a>
  );
}