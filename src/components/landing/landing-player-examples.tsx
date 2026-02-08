import { getRandomEntries } from "@/common/utils";
import Card, { CardContent, CardHeader } from "../ui/card";
import { LandingExampleCard } from "./landing-example-card";

const playerExamples: string[] = [
  "ImFascinated",
  "Rainnny",
  "Notch",
  "jeb_",
  "Technoblade",
  "NoneTaken",
  "Dinnerbone",
  "Fit",
  "Steve",
  "Grumm",
  "Hypixel",
  "Herobrine",
  "DanTDM",
  "Dream",
  "GeorgeNotFound",
  "Sapnap",
  "PewDiePie",
  "Stampy",
  "Skephalo",
  "BadBoyHalo",
  "AntVenom",
  "Mumbo",
  "Grian",
  "Scar",
  "Docm77",
  "Xisuma",
  "Keralis",
  "BdoubleO100",
  "Etho",
  "Tango",
  "Zedaph",
  "ImpulseSV",
  "Cubfan135",
  "FalseSymmetry",
];

export default async function LandingPlayerExamples() {
  const players = getRandomEntries(playerExamples, 5);

  return (
    <Card className="border-border/80 w-full overflow-hidden p-0">
      <CardHeader>Player Examples</CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-3">
        {players.map(player => (
          <LandingExampleCard
            key={player}
            url={`https://mc.fascinated.cc/api/skins/${player}/face.png?overlays=false`}
            tooltip={
              <span>
                Click to view information for <b>{player}</b>
              </span>
            }
            name={player}
            href={`/player/${player}`}
          />
        ))}
      </CardContent>
    </Card>
  );
}
