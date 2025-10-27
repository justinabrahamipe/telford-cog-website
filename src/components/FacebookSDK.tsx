'use client';

import { useEffect } from 'react';

export function FacebookSDK() {
  useEffect(() => {
    // Load Facebook SDK after component mounts
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0';
    script.nonce = 'ZVL7zul2';
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div id="fb-root" suppressHydrationWarning />;
}
