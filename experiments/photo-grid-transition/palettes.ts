export interface Palette {
  gradient: string;
  id: string;
  name: string;
}

export const PALETTES: Palette[] = [
  {
    id: "1",
    name: "Embers",
    gradient: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
  },
  {
    id: "2",
    name: "Atlantic",
    gradient: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
  },
  {
    id: "3",
    name: "Mango",
    gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
  },
  {
    id: "4",
    name: "Violet",
    gradient: "linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)",
  },
  {
    id: "5",
    name: "Mint",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  },
  {
    id: "6",
    name: "Plum",
    gradient: "linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)",
  },
  {
    id: "7",
    name: "Sahel",
    gradient: "linear-gradient(135deg, #d38312 0%, #a83279 100%)",
  },
  {
    id: "8",
    name: "Ice",
    gradient: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)",
  },
  {
    id: "9",
    name: "Coal",
    gradient: "linear-gradient(135deg, #232526 0%, #414345 100%)",
  },
];

export function getPalette(id: string): Palette | undefined {
  return PALETTES.find((p) => p.id === id);
}
