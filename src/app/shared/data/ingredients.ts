export const ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Dragon Tears',
    icon: 'dragon-tears',
    temperature: 25,
    density: 8,
    magicPower: 10,
  },
  { id: '2', name: 'Fairy Dust', icon: 'fairy-dust', temperature: 12, density: 9, magicPower: 12 },
  {
    id: '3',
    name: 'Frost Lotus',
    icon: 'frost-lotus',
    temperature: -18,
    density: 4,
    magicPower: 14,
  },
  {
    id: '4',
    name: 'Mandrake Root',
    icon: 'mandrake-root',
    temperature: -5,
    density: 20,
    magicPower: 8,
  },
  {
    id: '5',
    name: 'Caustic Acid',
    icon: 'caustic-acid',
    temperature: 10,
    density: 14,
    magicPower: 22,
  },
  {
    id: '6',
    name: 'Essence of the Void',
    icon: 'essence-of-the-void',
    temperature: -20,
    density: -10,
    magicPower: 40,
  },
];

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  temperature: number;
  density: number;
  magicPower: number;
}
