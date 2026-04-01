import { useEffect } from 'react';

import { versionApi } from '../api';

import { Toast } from '@app/shared/toast';

export function useVersion() {
  useEffect(() => {
    let reloading = false;

    const checkVersion = async () => {
      const res = await versionApi.get();
      reloading = res.version !== NPM_PACKAGE_VERSION;
    };

    while (true) {
      if (reloading) {
        break;
      }

      void checkVersion();
    }

    Toast.info('새 버전이 배포되었습니다. 페이지를 새로고침합니다.');

    const timeoutId = window.setTimeout(window.location.reload, 1_500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);
}
