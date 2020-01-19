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
    clearStorageHandler,
    updateInputHandler,
    selectQueryHandler
}) => (
        <div className="searchContainer">
            <Dropdown
                visible={visible}
                onVisibleChange={toggleMenuHandler}
                overlay={<Menu>
                    {searchedQueries.length
                        ? searchedQueries.map((query, index) => (
                            <Menu.Item onClick={() => selectQueryHandler(query)} key={index}>
                                <a>{query}</a>
                            </Menu.Item>
                        ))
                        : <Menu.Item>
                            <a>No browser history</a>
                        </Menu.Item>}
                    {searchedQueries.length
                        ? <>
                            <Menu.Divider />
                            <div className="clearBtn">
                                <Button onClick={clearStorageHandler} type="danger">Clear</Button>
                            </div>
                        </>
                        : null}
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