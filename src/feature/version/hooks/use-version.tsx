import { useEffect } from 'react';

import { versionApi } from '../api';

import { Toast } from '@app/shared/toast';

const VERSION_CHECK_INTERVAL_MS = 10_000;
const RELOAD_DELAY_MS = 1_500;

export function useVersion() {
  useEffect(() => {
    let isDisposed = false;
    let isReloadScheduled = false;
    let timeoutId: number | undefined;

    const scheduleNextCheck = () => {
      if (isDisposed || isReloadScheduled) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        void checkVersion();
      }, VERSION_CHECK_INTERVAL_MS);
    };

    const checkVersion = async () => {
      if (isDisposed || isReloadScheduled) {
        return;
      }

      const { version } = await versionApi.get();

      if (!version || version === NPM_PACKAGE_VERSION) {
        scheduleNextCheck();
        return;
      }

      isReloadScheduled = true;

      Toast.info('새 버전이 배포되었습니다. 페이지를 새로고침합니다.');

      timeoutId = window.setTimeout(window.location.reload, RELOAD_DELAY_MS);
    };

    void checkVersion();

    return () => {
      isDisposed = true;

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);
}
