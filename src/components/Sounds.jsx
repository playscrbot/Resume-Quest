import { Howl } from 'howler';

const SOUNDS = {
  bgMusic: new Howl({ src: ["/public/sounds/bgm.wav"], volume: 0.3, loop: true }),
  jump: new Howl({ src: ["/public/sounds/jump.wav"], volume: 0.3 }),
  land: new Howl({ src: ["/public/sounds/land.wav"], volume: 0.3 }),
  select: new Howl({ src: ["/public/sounds/select.wav"], volume: 0.5 })
};

export default SOUNDS;