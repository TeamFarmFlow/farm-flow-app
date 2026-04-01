import axios from 'axios';

import { Version } from './version.types';

const get = () =>
  axios
    .get<Version>('/version.json')
    .then((res) => ({ version: res.data?.version ?? NPM_PACKAGE_VERSION }) as Version)
    .catch(() => ({ version: NPM_PACKAGE_VERSION }) as Version);

export const versionApi = {
  get,
};
