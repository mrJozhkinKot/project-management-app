import React, { Fragment } from 'react';
import spinner from '../spinner/spinner.gif';
import { useTranslation } from 'react-i18next';

const Spinner = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <img
        src={String(spinner)}
        alt={t('loading')}
        style={{ display: 'flex', margin: '100px auto', width: 50 }}
      />
    </Fragment>
  );
};

export default Spinner;
