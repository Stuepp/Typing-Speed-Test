import { useEffect } from "react";

export default function useGlobalKeyDown(handler: any, options:any = {}) {
  const { ignoreInputs = true } = options;

  useEffect(() => {
    const handlekeyDown = (e:any) => {
      if(ignoreInputs) return;

      handler(e);
    };
    document.addEventListener('keydown', handlekeyDown);

    return () => {
      document.removeEventListener('keydown', handlekeyDown);
    };
  }, [handler, options.ignoreInputs]);
}