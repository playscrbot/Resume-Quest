import { Howl } from 'howler';

const SOUNDS = {
  bgMusic: new Howl({ src: ["/sounds/bgm.wav"], volume: 0.3, loop: true }),
  jump: new Howl({ src: ["/sounds/jump.wav"], volume: 0.3 }),
  land: new Howl({ src: ["/sounds/land.wav"], volume: 0.3 }),
  select: new Howl({ src: ["/sounds/select.wav"], volume: 0.5 })
};

export default SOUNDS;