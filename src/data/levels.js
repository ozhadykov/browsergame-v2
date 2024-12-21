// bODO: We should make some standards for levels
// a - top left corner
// b - top middle
// c - top right corner
// d - middle left
// e - middle center
// f - middle right
// g - bottom left corner
// h - bottom center
// i - bottom right corner

const levelsMeta = [
  {
    id: 1,
    backgroundImgSrc: '../src/assets/background/Backround_komplett.png',
    levelMarkup: `------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  abbc------------abbbbbbbbbbbbbbbbbbc------------------------+
  ----------------ghhhhhhhhhhhhhhhhhhi------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf---------------------abbbbc--+
  ----------------------------deebbbbbbbbbbbbc----------------+
  ----------------------------ghi-----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  abbc------------abbbbbbbbbbbbbbbbbbc------------------------+
  ----------------ghhhhhhhhhhhhhhhhhhi------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf---------------------abbbbc--+
  ----------------------------deebbbbbbbbbbbbc----------------+
  ----------------------------abc-----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  abbc------------abbbbbbbbbbbbbbbbbbc------------------------+
  ----------------ghhhhhhhhhhhhhhhhhhi------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------abc---------------------abbbbc--+
  ----------------------------abbbbbbbbbbbbbbc----------------+
  ----------------------------abc-----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  --------------abbbc-----------------------------------------+
  --abbbbbbc------------------abbc--------------------abbbc---+
  --ghhhhhhi------------------abbc----------------------------+
  ----------------------------abbc----------------------------+
  ----------------------------abbc----------------------------+
  ----------------------------abbc----------------------------+
  ----------------------------abbc----------abbbc-------------+
  ----------------------------abbc----------------------------+
  -----------------abbbc------abbc----------------------------+
  ----------------------------abbc----------------------------+
  abbbbbbc--------------------abbc----------------------------+
  deef---------------------abbbbc----------------------------+
  ghhi-------------------abbbbbbbbbbbc-------------abbbbbbc--+
  ----------------------------abbc----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc-----abbbbbbbbbbbbbbc+
  ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhi-----ghhhhhhhhhhhhhhi+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf-----------------------------+
  ----------------------------dbf---------------------ebbbbf--+
  ----------------------------ebbbbbbbbbbbbbbf----------------+
  ----------------------------gbi-----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  --------------abbbc-----------------------------------------+
  --abbbbbbc------------------abbc--------------------abbbc---+
  --ghhhhhhi------------------deef----------------------------+
  ----------------------------deef----------------------------+
  ----------------------------deef----------------------------+
  ----------------------------deef----------------------------+
  ----------------------------deef----------dbbbf-------------+
  ----------------------------deef----------------------------+
  -----------------abbbc------deef----------------------------+
  ----------------------------deef----------------------------+
  abbbbbbc--------------------deef----------------------------+
  deeef---------------------abeeef----------------------------+
  deeef-------------------abeeeeeebbbbc-------------dbbbbbbf--+
  ghhhhbbbbbbbbbbbbbbbbbbbhhhhhhhhhhhhhbbbbbbbbbbbbbbbbbbbbbbc+`,
    playerStartPositionX: 10,
    playerStartPositionY: 1550,
    playerScaleX: 2,
    playerScaleY: 6,
  },
];

const platformTypePosition = {
  a: {
    x: 0,
    y: 0,
  },
  b: {
    x: 16,
    y: 0,
  },
  c: {
    x: 32,
    y: 0,
  },
  d: {
    x: 0,
    y: 16,
  },
  e: {
    x: 16,
    y: 16,
  },
  f: {
    x: 32,
    y: 16,
  },
  g: {
    x: 0,
    y: 32,
  },
  h: {
    x: 16,
    y: 32,
  },
  i: {
    x: 32,
    y: 32,
  },
};

export { levelsMeta, platformTypePosition };
