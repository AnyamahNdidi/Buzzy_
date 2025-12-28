'use client';

import { Button } from "./ui/button";
import { PlayCircle, Pause } from "lucide-react";
import { useState, useRef } from "react";

export function VideoGuide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const togglePlay = () => {
    const iframe = videoRef.current;
    if (iframe) {
      if (isPlaying) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How to Play BuzzyCash
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Watch our quick tutorial to learn how to play and win big with BuzzyCash Ghana
          </p>
        </div>
        
        <div className="relative w-full max-w-4xl mx-auto bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl aspect-video">
          <iframe
            ref={videoRef}
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/QzuUmQkNTqM?si=T-x1oFYIEGPW-0lj&enablejsapi=1&version=3&playerapiid=ytplayer"
            title="Buzzycash Ghana - How to Play"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
            onClick={togglePlay}
          >
            {!isPlaying && <PlayCircle className="w-20 h-20 text-yellow-400 cursor-pointer hover:scale-110 transition-transform" />}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            asChild 
            variant="outline" 
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
          >
            <a href="/how-to-play" className="inline-flex items-center gap-2">
              View Full Guide
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
