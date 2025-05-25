import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { RetroEffect } from './effects/RetroEffect';

export default function DitherWaveBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <EffectComposer>
          <RetroEffect
            waveSpeed={0.05}
            waveFrequency={3}
            waveAmplitude={0.3}
            waveColor={[0.4, 0.2, 0.8]} // Purple to match the theme
            colorNum={4}
            pixelSize={2}
            enableMouseInteraction={true}
            mouseRadius={0.1}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
} 