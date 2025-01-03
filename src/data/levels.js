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

const levels = [
  `
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
    --------------------abbbbbbbbbc-----------------------------+
    --------------------ghhhhhhhhhi-----------------------------+
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
-abbbbbbbc--------------------------------------------------+
-ghhhhhhhi--------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
---------------------------------------abbbbbbbbbbbc--------+
---------------------------------------ghhhhhhhhhhhi--------+
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
-----------------abbbc----abbbc-----------------------------+
-----------------ghhhi----ghhhi-----------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
---------------------------------------abbc-----------------+
---------------------------------------ghhi-----------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
-aaaac------------------------------------------------------+
-ghhhi------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
--------------------------abbbc-----------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
---------------------------------------------abbbbbc--------+
---------------------------------------------ghhhhhi--------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
--------------------------------abbbbbc---------------------+
--------------------------------ghhhhhi---------------------+
------------------------------------------------------------+
abc----abc--------------------------------------------------+
------------------------------------------------------------+
-------------------------------------------------------abbbc+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
-----------------abbbbc---abbbbc-------abbc-----------------+
--------------------------ghhhhi-------ghhi-----------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
----------------abbbc---abbbbbbc----------------------------+
----------------ghhhi---ghhhhhhi----------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
------------------------------------------------------------+
----------------------------------abbbc---------------------+
----------------------------------ghhhi---------------------+
------------------------------------------------------------+
-----abbbbbbbbc---------------------------------------------+
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
  ----------------------------------------------abbbc---------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  -abbbc------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------abbbbc------------------------------------+
  ------------------------------------------------------------+
  --------------------------abbbbbc---------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------abbbbc--------------------abbc------------+
  ---abbc-------------------------------------ghhi------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  abbbbbbbbbbbbbbbbbbbbbbbbbbbeeebbbbbbbc-----abbbbbbbbbbbbbbc+
  ghhhhhhhhhhhhhhhhhhhhhhhhhhheeehhhhhhhi-----ghhhhhhhhhhhhhhi+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def-----------------------------+
  ----------------------------def---------------------ebbbbf--+
  ----------------------------deeeeeeeeeeeeeef----------------+
  ----------------------------gbi-----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  --------------abbbc-----------------------------------------+
  ----------------------------abbc--------------------abbbc---+
  --abbbbbbc------------------deef----------------------------+
  --ghhhhhhi------------------deef----------------------------+
  ----------------------------deef----------------------------+
  ----------------------------deef----------------------------+
  ----------------------------deef----------dbbbf-------------+
  ----------------------------deef----------------------------+
  -----------------abbbc------deef----------------------------+
  ----------------------------deef----------------------------+
  abbbbbbc--------------------deef----------------------------+
  deeef---------------------abeeef----------------------------+
  deeef-------------------abeeeeeebbbbc--------------dbbbbbbf-+
  ghhhhbbbbbbbbbbbbbbbbbbbhhhhhhhhhhhhhbbbbbbbbbbbbbbbbbbbbbbc+
  `,
  `
  ----------------------------abc-----------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------abc-----------------------------+
  ----------------------------Lbc-----------------------------+
  ----------------------------Lbc---------------------Lbbbbc--+
  ----------------------------Lbbbbbbbbbbbbbbc----------------+
  ----------------------------Lbc-----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  --------------Lbbbc-----------------------------------------+
  --bbbbbbbb------------------Lbbc--------------------LbbbR---+
  --BBBBBBBB------------------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  ----------------------------LbbR----------LbbbR-------------+
  ----------------------------LbbR----------------------------+
  -----------------LbbbR------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  LbbbbbbR--------------------LbbR----------------------------+
  lPPPr---------------------LbbbbR----------------------------+
  lPPPr-------------------LbbbbbbbbbbbR-------------LbbbbbbR--+
  ----------------------------LbbR----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  LbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbR-----LbbbbbbbbbbbbbbR+
  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB-----BBBBBBBBBBBBBBBB+
  `,
  `
  ----------------------------LbR-----------------------------+
  ----------------------------LbR-----------------------------+
  ----------------------------LbR-----------------------------+
  ----------------------------LbR-----------------------------+
  ----------------------------LbR-----------------------------+
  ----------------------------LbR---------------------LbbbbR--+
  ----------------------------LbbbbbbbbbbbbbbR----------------+
  ----------------------------LbR-----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  --------------LbbbR-----------------------------------------+
  --bbbbbbbb------------------LbbR--------------------LbbbR---+
  --BBBBBBBB------------------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  ----------------------------LbbR----------LbbbR-------------+
  ----------------------------LbbR----------------------------+
  -----------------LbbbR------LbbR----------------------------+
  ----------------------------LbbR----------------------------+
  LbbbbbbR--------------------LbbR----------------------------+
  lPPPr---------------------LbbbbR----------------------------+
  lPPPr-------------------LbbbbbbbbbbbR-------------LbbbbbbR--+
  ----------------------------LbbR----------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  ------------------------------------------------------------+
  LbbR------------LbbbbbbbbbbbbbbbbbbR------------------------+
  ----------------LbbbbbbbbbbbbbbbbbbR------------------------+
  `,
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

export { levels, platformTypePosition };
