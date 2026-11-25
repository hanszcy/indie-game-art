// Standard Sokoban notation. Each wall-bounded map has one worker and an equal
// number of crates and docks. A box on a dock is "*" and a worker on one is "+".
export const LEVELS = [
  {
    name: '第一件货',
    rows: [
      '#######',
      '#     #',
      '#   . #',
      '#  $  #',
      '#  @  #',
      '#######',
    ],
  },
  {
    name: '双份签收',
    rows: [
      '########',
      '#   .  #',
      '# #    #',
      '# $ $ .#',
      '#  @   #',
      '########',
    ],
  },
  {
    name: '转角入位',
    rows: [
      '########',
      '#  .   #',
      '# ## . #',
      '#  $ $ #',
      '#   #  #',
      '# @    #',
      '########',
    ],
  },
  {
    name: '分拣通道',
    rows: [
      '########',
      '#    . #',
      '# $ #  #',
      '#  $   #',
      '# .# $ #',
      '#  . @ #',
      '########',
    ],
  },
  {
    name: '最后一单',
    rows: [
      '########',
      '# .  . #',
      '#  $   #',
      '# # $# #',
      '#  $   #',
      '# .  @ #',
      '########',
    ],
  },
];
