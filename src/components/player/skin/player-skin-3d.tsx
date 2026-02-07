import { useSkin3DSettings } from "@/components/provider/skin-3d-settings-provider";
import { Player } from "mcutils-js-api/dist/types/player/player";
import { useEffect, useRef } from "react";
import { Render } from "skin3d";

export interface PlayerSkin3DProps {
  player: Player;
}

export default function PlayerSkin3D({ player }: PlayerSkin3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { updateSkinViewerRef } = useSkin3DSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const viewer = new Render({
      canvas,
      width: 230,
      height: 288,
    });
    viewer.loadSkin(player.skin.textureUrl);
    if (player.cape) {
      viewer.loadCape(player.cape.textureUrl);
    }
    updateSkinViewerRef(viewer);

    return () => {
      updateSkinViewerRef(null);
      viewer.dispose();
    };
  }, [player.skin.textureUrl, updateSkinViewerRef]);

  return <canvas ref={canvasRef} />;
}
