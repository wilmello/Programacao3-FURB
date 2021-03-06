CREATE OR REPLACE FORCE VIEW VW_TOP_PLAYERS AS
SELECT PL.ID,
       PL.NICKNAME,
       PL.SCORE,
       (SELECT TRIM( SC.DESCRICAO )
          FROM SCORE SC 
         WHERE PL.SCORE >= SC.PONTUACAO_INI
           AND PL.SCORE <= SC.PONTUACAO_FIM) DESCR_SCORE
  FROM PLAYER PL
ORDER BY PL.SCORE DESC,
         PL.NICKNAME
