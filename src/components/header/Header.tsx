import React, { ReactElement } from 'react';

import mainStyle from '../../styles/container.module.sass';

import style from './Header.module.sass';

export const Header = (): ReactElement => (
  <div className={style.header}>
    <div className={mainStyle.container}>
      <div className={style.container} />
    </div>
  </div>
);
