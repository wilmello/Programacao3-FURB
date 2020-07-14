CREATE OR REPLACE FUNCTION md5 (valor VARCHAR) RETURN VARCHAR2 IS
   v_input VARCHAR2(2000) := valor;
   hexkey VARCHAR2(32) := NULL;
BEGIN
   hexkey := RAWTOHEX(DBMS_OBFUSCATION_TOOLKIT.md5(input => UTL_RAW.cast_to_raw(v_input)));
   RETURN NVL(hexkey,'');
END;
