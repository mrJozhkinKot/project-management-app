import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

function NotFound(): React.ReactElement {
  const { t } = useTranslation();
  return <Fragment>{t('404_error')}</Fragment>;
}

export default NotFound;
