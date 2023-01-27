import  { useRef, useEffect } from "react";

//Слушатель по нажатию на кнопку "Esc"
 function useKey (key:string, cb: ()=>void) {
    const callbackRef = useRef(cb);
    useEffect(() => {
      callbackRef.current = cb;
    });
    useEffect(() => {
      function handle(e: KeyboardEvent) {
        if (e.code === key) {
          callbackRef.current();
        }
      }
      document.addEventListener("keydown", handle);
      return () => document.removeEventListener("keydown", handle);
    }, [key]);
  }

  export default useKey;