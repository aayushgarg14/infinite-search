import React, { Fragment } from 'react';

import './styles.css';

import Backdrop from '../Backdrop';
import { Icon } from 'antd';

export default ({
    children,
    toggleModalHandler,
}) => {
    return (
        <Fragment>
            <Backdrop show={true} onClick={toggleModalHandler} />
            <div className="modalContainer">
                    <div onClick={toggleModalHandler} className="modalHeader">
                        <Icon type="close" style={{ color: '#000' }} />
                    </div>
                {children}
            </div>
        </Fragment>
    )
}
