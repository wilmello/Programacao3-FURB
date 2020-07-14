CREATE OR REPLACE FORCE VIEW VW_GAME_BOARD AS
SELECT GM.IDROOM,
       GM.IDPLAYER,
       GM.POS1,
       GM.POS2,
       GM.POS3,
       GM.POS4,
       GM.POS5,
       GM.POS6,
       GM.POS7,
       GM.POS8,
       GM.POS9,
       GM.IN_TURN
  FROM GAME_BOARD GM
