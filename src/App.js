import React, { Component } from 'react';
import { Input } from 'antd';


import './App.css';
import { getAllPics } from './utils/axiosRequest';
import ListSection from './component/ListSection';

const { Search } = Input;

export class App extends Component {
  state = {
    page: 1,
    photos: []
  }

  async componentDidMount() {
    await this.callApi()
  }

  callApi = async () => {
    const { page, photos } = this.state
    const response = await getAllPics(page)
    console.log('response inside', response);
    if (!response.error) {
      this.setState({
        photos: page === 1
          ? response.data.photo
          : [...photos, ...response.data.photo]
      })
    }
  }

  loadMoreHandler = () => {
    this.setState({ page: this.state.page + 1 }, async () => await this.callApi())
  }

  refreshHandler = () => {
    this.setState({ page: 1 }, async () => await this.callApi())
  }

  render() {
    const { photos } = this.state

    return (
      <div className="app">
        <div className="appHeader">
          <h1>Scroll the way up!</h1>
          <div className="searchContainer">
            <Search placeholder="input search loading deault" />
          </div>
        </div>
        <div className="bodyContainer">
          <ListSection
            photos={photos}
            loadMoreHandler={this.loadMoreHandler} />
        </div>
      </div>
    );
  }
}

export default App;
