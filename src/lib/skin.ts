import type { SkinPart } from "mcutils-js-api/dist/types/player/skin/skin-part";

const SKIN_PART_LABELS: Record<SkinPart, string> = {
  HEAD: "Head",
  FACE: "Face",
  BODY: "Body",
  FULLBODY_FRONT: "Full Body (Front)",
  FULLBODY_BACK: "Full Body (Back)",
};

export function formatSkinPartName(part: SkinPart): string {
  return SKIN_PART_LABELS[part] ?? part;
}
