import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

type AudioRefs = {
  ctx: AudioContext;
  master: GainNode;
  nodes: AudioNode[];
};

function buildAmbience(ctx: AudioContext, master: GainNode): AudioNode[] {
  const nodes: AudioNode[] = [];

  function osc(freq: number, type: OscillatorType, gain: number, detune = 0) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    o.detune.value = detune;
    g.gain.value = gain;
    o.connect(g);
    g.connect(master);
    o.start();
    nodes.push(o, g);
  }

  function lfo(target: AudioParam, rate: number, depth: number, center: number) {
    const l = ctx.createOscillator();
    const g = ctx.createGain();
    l.type = "sine";
    l.frequency.value = rate;
    g.gain.value = depth;
    l.connect(g);
    g.connect(target);
    target.value = center;
    l.start();
    nodes.push(l, g);
  }

  /* Deep drone – 108 Hz (wellness/meditation tone) */
  const droneOsc = ctx.createOscillator();
  const droneGain = ctx.createGain();
  droneOsc.type = "sine";
  droneOsc.frequency.value = 108;
  droneGain.gain.value = 0.18;
  droneOsc.connect(droneGain);
  droneGain.connect(master);
  droneOsc.start();
  lfo(droneOsc.frequency, 0.08, 1.5, 108);
  nodes.push(droneOsc, droneGain);

  /* Sub-bass – 54 Hz */
  osc(54, "sine", 0.12);

  /* Fifth harmonic – 162 Hz, very soft */
  osc(162, "sine", 0.06);

  /* Ethereal pad – 432 Hz (A432 tuning) */
  const padOsc = ctx.createOscillator();
  const padGain = ctx.createGain();
  padOsc.type = "triangle";
  padOsc.frequency.value = 432;
  padGain.gain.value = 0.04;
  padOsc.connect(padGain);
  padGain.connect(master);
  padOsc.start();
  lfo(padGain.gain, 0.12, 0.02, 0.04);
  nodes.push(padOsc, padGain);

  /* Detuned twin – 431.5 Hz creates gentle beating */
  osc(431.5, "triangle", 0.025);

  /* High shimmer – 864 Hz, very quiet */
  const shimmerOsc = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  shimmerOsc.type = "sine";
  shimmerOsc.frequency.value = 864;
  shimmerGain.gain.value = 0.012;
  shimmerOsc.connect(shimmerGain);
  shimmerGain.connect(master);
  shimmerOsc.start();
  lfo(shimmerGain.gain, 0.2, 0.008, 0.012);
  nodes.push(shimmerOsc, shimmerGain);

  /* Warm reverb via convolver simulation using delay + feedback */
  const delay1 = ctx.createDelay(2.0);
  const delay2 = ctx.createDelay(2.0);
  const delayGain1 = ctx.createGain();
  const delayGain2 = ctx.createGain();
  delay1.delayTime.value = 0.37;
  delay2.delayTime.value = 0.61;
  delayGain1.gain.value = 0.25;
  delayGain2.gain.value = 0.18;
  master.connect(delay1);
  master.connect(delay2);
  delay1.connect(delayGain1);
  delay2.connect(delayGain2);
  delayGain1.connect(master);
  delayGain2.connect(master);
  nodes.push(delay1, delay2, delayGain1, delayGain2);

  return nodes;
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [showVol, setShowVol] = useState(false);
  const audioRef = useRef<AudioRefs | null>(null);

  const start = useCallback(async () => {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const nodes = buildAmbience(ctx, master);

    /* Fade in gently over 3 s */
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3);

    audioRef.current = { ctx, master, nodes };
    setPlaying(true);
  }, [volume]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    const { ctx, master, nodes } = audioRef.current;
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    setTimeout(() => {
      nodes.forEach(n => { try { (n as AudioScheduledSourceNode).stop?.(); } catch {} });
      ctx.close();
      audioRef.current = null;
    }, 1600);
    setPlaying(false);
  }, []);

  /* Sync volume knob live */
  useEffect(() => {
    if (!audioRef.current) return;
    const { ctx, master } = audioRef.current;
    master.gain.setTargetAtTime(volume, ctx.currentTime, 0.3);
  }, [volume]);

  const toggle = () => (playing ? stop() : start());

  return (
    <div className="fixed bottom-24 left-6 z-50 flex flex-col items-start gap-2">

      {/* Volume slider */}
      <AnimatePresence>
        {showVol && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <VolumeX className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              type="range" min={0} max={1} step={0.01}
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-primary cursor-pointer"
            />
            <span className="text-[10px] text-muted-foreground font-mono w-6">{Math.round(volume * 100)}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setShowVol(true)}
        onMouseLeave={() => setShowVol(false)}
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-card/80 backdrop-blur-xl border border-border text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] group"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      >
        {/* Animated waveform bars when playing */}
        {playing ? (
          <div className="flex items-center gap-[3px] h-4">
            {[0.4, 0.9, 0.6, 1, 0.7, 0.5, 0.85].map((h, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-primary rounded-full"
                animate={{ scaleY: [h, 1, h * 0.6, 0.9, h] }}
                transition={{ duration: 1.1 + i * 0.13, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: "16px", originY: "center" }}
              />
            ))}
          </div>
        ) : (
          <Music2 className="w-4 h-4 shrink-0" />
        )}

        <span className="text-xs font-medium pr-0.5">
          {playing ? "Ambient" : "Calm Music"}
        </span>

        {/* Glow pulse when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30 pointer-events-none"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
