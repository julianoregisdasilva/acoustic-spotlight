import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Play, Instagram, X, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FadeIn } from "@/components/FadeIn";
import video1 from "@/assets/video_1.mp4.asset.json";
import video2 from "@/assets/video_2.mp4.asset.json";
import video3 from "@/assets/video_3.mp4.asset.json";
import video4 from "@/assets/video_4.mp4.asset.json";
import poster1 from "@/assets/poster_1.jpg.asset.json";
import poster2 from "@/assets/poster_2.jpg.asset.json";
import poster3 from "@/assets/poster_3.jpg.asset.json";
import poster4 from "@/assets/poster_4.jpg.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Renato Acústico — Música ao vivo para bares, restaurantes e eventos" },
      { name: "description", content: "Renato Acústico: voz e violão para bares, restaurantes e eventos corporativos. Repertório versátil e clima sob medida." },
      { property: "og:title", content: "Renato Acústico — Música ao vivo" },
      { property: "og:description", content: "Voz e violão para bares, restaurantes e eventos corporativos." },
      { property: "og:image", content: "/images/foto1.jpeg" },
    ],
  }),
  component: Index,
});

const videos = [
  { src: video1.url, poster: poster1.url, title: "Apresentação 1" },
  { src: video2.url, poster: poster2.url, title: "Apresentação 2" },
  { src: video3.url, poster: poster3.url, title: "Apresentação 3" },
  { src: video4.url, poster: poster4.url, title: "Apresentação 4" },
];

const fotos = [
  "/images/foto1.jpeg",
  "/images/foto2.jpeg",
  "/images/foto3.jpeg",
  "/images/foto4.jpeg",
];

// Reusable hover-frame: transparent 2px border that fades to accent cyan on hover.
const hoverFrame =
  "relative overflow-hidden rounded-xl bg-card shadow-lg " +
  "border-2 border-transparent transition-[border-color,box-shadow] duration-300 ease-out " +
  "hover:cursor-pointer hover:border-accent hover:shadow-[0_0_0_2px_var(--accent)]";

function VideoCard({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <div className={`group aspect-[9/16] w-full ${hoverFrame}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        controls={playing}
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full bg-black object-contain"
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Reproduzir ${title}`}
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="h-7 w-7 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}

function PhotoCard({ src, index, onOpen }: { src: string; index: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar foto ${index + 1}`}
      className={`group aspect-[4/3] w-full ${hoverFrame}`}
    >
      <img
        src={src}
        alt={`Foto ${index + 1} — Renato Acústico`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </button>
  );
}

function Index() {
  const [openPhoto, setOpenPhoto] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!openPhoto) return;
    try {
      const response = await fetch(openPhoto);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = openPhoto.split("/").pop() || "foto.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open(openPhoto, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero / Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)/15%,_transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center md:py-20">
          <img
            src="/images/logo.jpeg"
            alt="Renato Alves Acústico"
            className="w-full max-w-3xl object-contain"
          />
          <p className="mt-6 max-w-xl text-lg font-medium text-primary md:text-xl">
            Voz e violão para bares, restaurantes e eventos corporativos.
          </p>
        </div>
      </header>

      {/* Seção 1: Vídeos */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-light tracking-wide md:text-3xl">
            <span className="text-accent">/</span> Vídeos
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {videos.map((v) => (
            <VideoCard key={v.src} src={v.src} poster={v.poster} title={v.title} />
          ))}
        </div>
      </section>

      {/* Seção 2: Fotos */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-light tracking-wide md:text-3xl">
            <span className="text-accent">/</span> Fotos
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {fotos.map((src, i) => (
            <PhotoCard key={src} src={src} index={i} onOpen={() => setOpenPhoto(src)} />
          ))}
        </div>
      </section>

      {/* Seção 3: Contato */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-light tracking-wide md:text-3xl">
            <span className="text-accent">/</span> Contato
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Disponível para shows, eventos corporativos e datas especiais.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://wa.me/5548991677275"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="group flex items-center gap-3 rounded-full border border-border bg-card px-6 py-4 shadow-lg transition-all hover:cursor-pointer hover:border-primary hover:shadow-[0_0_6px_rgba(255,154,5,0.15)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
            <span className="text-left">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</span>
              <span className="block font-medium">(48) 99167-7275</span>
            </span>
          </a>

          <a
            href="https://www.instagram.com/renatoacustico/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Instagram em nova aba"
            className="group flex items-center gap-3 rounded-full border border-border bg-card px-6 py-4 shadow-lg transition-all hover:cursor-pointer hover:border-accent hover:shadow-[0_0_6px_rgba(5,232,255,0.15)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-110">
              <Instagram className="h-6 w-6" />
            </span>
            <span className="text-left">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">Instagram</span>
              <span className="block font-medium">@renatoacustico</span>
            </span>
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Renato Acústico
      </footer>

      {/* Lightbox de fotos */}
      <Dialog open={!!openPhoto} onOpenChange={(o) => !o && setOpenPhoto(null)}>
        <DialogContent
          className="max-w-5xl border-border bg-background/95 p-2 sm:p-4"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">Foto ampliada</DialogTitle>
          {openPhoto && (
            <>
              <button
                type="button"
                onClick={handleDownload}
                aria-label="Baixar foto"
                className="absolute right-12 top-4 z-10 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Baixar</span>
              </button>
              <img
                src={openPhoto}
                alt="Foto ampliada — Renato Acústico"
                className="mx-auto max-h-[85vh] w-auto rounded-md object-contain"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
