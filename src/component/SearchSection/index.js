import React from 'react';
import { Dropdown, Input, Menu, Button } from 'antd';

import './styles.css'

const { Search } = Input;


export default ({
    visible,
    searchedQuery,
    searchedQueries,
    toggleMenuHandler,
    addItemHandler,
    updateInputHandler
}) => (
        <div className="searchContainer">
            <Dropdown
                visible={visible}
                onVisibleChange={toggleMenuHandler}
                overlay={<Menu>
                    {searchedQueries.map((query, index) => (
                        <Menu.Item key={index}>
                            <a>{query}</a>
                        </Menu.Item>
                    ))}
                    <Menu.Divider />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: 5 }}>
                        <Button type="danger">Clear</Button>
                    </div>
                </Menu>}
                trigger={['click']}>
                <Search
                    placeholder="Input search loading default"
                    onPressEnter={addItemHandler}
                    value={searchedQuery}
                    onChange={updateInputHandler} />
            </Dropdown>
        </div>
    )