import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin, Icon, Row, Col } from 'antd';

import './styles.css'

export default ({ photos, loadMoreHandler, toggleModalHandler }) => (
  <InfiniteScroll
    dataLength={photos.length}
    next={loadMoreHandler}
    className="imageContainer"
    hasMore={true}
    loader={<div className="centerImageContainer">
      <Spin tip="Loading..." indicator={<Icon type="loading" style={{ fontSize: 36 }} spin />
      } />
    </div>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }>
    {photos.map(photo => {
      const { farm, server, id, secret } = photo;
      return (
        <Row>
          <Col span={12}>
            <img
              onClick={() => toggleModalHandler(photo)}
              src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
              alt="" />
          </Col>
        </Row>
      )
    })}
  </InfiniteScroll>
)