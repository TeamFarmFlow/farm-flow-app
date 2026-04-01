import { useEffect, useRef, useState } from 'react';

import { versionApi } from '../api';

import { Toast } from '@app/shared/toast';

export function useVersion() {
  const [version, setVersion] = useState<string>(NPM_PACKAGE_VERSION);
  const isReloadingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const checkVersion = async () => {
      const data = await versionApi.get();

      if (!isMounted) {
        return;
      }

      setVersion(data.version);
    };

    void checkVersion();

    const intervalId = window.setInterval(() => {
      void checkVersion();
    }, 10_000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!version || version === NPM_PACKAGE_VERSION || isReloadingRef.current) {
      return;
    }

    isReloadingRef.current = true;
    Toast.info('새 버전이 배포되었습니다. 페이지를 새로고침합니다.');

    const timeoutId = window.setTimeout(() => {
      window.location.reload();
    }, 1_500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [version]);
}
