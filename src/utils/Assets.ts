import type { AssetsManifest } from "pixi.js";

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: "StaticImages",
      assets: {
        Dungeon: "/dungeon.png",
        Door: "/door.png",
        Treasure: "../../public/treasure.png",
      },
    },
    {
      name: "ExplorerAnimated",
      assets: {
        Explorer_00: "../../public/explorer/explorer_00.png",
        Explorer_01: "../../public/explorer/explorer_01.png",
        Explorer_02: "../../public/explorer/explorer_02.png",
        Explorer_03: "../../public/explorer/explorer_03.png",
        Explorer_04: "../../public/explorer/explorer_04.png",
        Explorer_05: "../../public/explorer/explorer_05.png",
        Explorer_06: "../../public/explorer/explorer_06.png",
        Explorer_07: "../../public/explorer/explorer_07.png",
        Explorer_08: "../../public/explorer/explorer_08.png",
        Explorer_09: "../../public/explorer/explorer_09.png",
        Explorer_10: "../../public/explorer/explorer_10.png",
        Explorer_11: "../../public/explorer/explorer_11.png",
      },
    },
    {
      name: "BlobAnimated",
      assets: {
        Blob_00: "../../public/blobs/blob_00.png",
        Blob_01: "../../public/blobs/blob_01.png",
        Blob_02: "../../public/blobs/blob_02.png",
        Blob_03: "../../public/blobs/blob_03.png",
        Blob_04: "../../public/blobs/blob_04.png",
        Blob_05: "../../public/blobs/blob_05.png",
        Blob_06: "../../public/blobs/blob_06.png",
        Blob_07: "../../public/blobs/blob_07.png",
        Blob_08: "../../public/blobs/blob_08.png",
        Blob_09: "../../public/blobs/blob_09.png",
        Blob_10: "../../public/blobs/blob_10.png",
        Blob_11: "../../public/blobs/blob_11.png",
      },
    },
    {
      name: "SoundTracks",
      assets: {
        Hard_NES: "/sounds/levelplane__hard_nes.mp3",
        Win_Sound: "/sounds/littlerobotsoundfactory__jingle_win_00.wav",
        Lose_Sound: "/sounds/littlerobotsoundfactory__jingle_lose_01.wav",
        Sad_Song_Loop: "/sounds/norameld__sad-song-loop.wav",
        Soundtrack_keitwenn: "/sounds/keitwenn__game-soundtrack-4.wav",
      },
    },
  ],
};
