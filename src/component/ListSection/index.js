import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin, Icon } from 'antd';

import './styles.css'

export default ({ photos, loadMoreHandler }) => (
    <InfiniteScroll
            dataLength={photos.length} //This is important field to render the next data
            next={loadMoreHandler}
            className="imageContainer"
            hasMore={true}
            loader={<div className="centerImageContainer">
              <Spin tip="Loading..." indicator={<Icon type="loading" style={{ fontSize: 36 }} spin />
              } /></div>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            {photos.map(photo => {
              const { farm, server, id, secret } = photo;
              return (
                <img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} alt="" />
              )
            })}
          </InfiniteScroll>
)