import React, { Component } from 'react';


import './App.css';
import { getAllPics } from './utils/axiosRequest';
import ListSection from './component/ListSection';
import ModalSection from './component/ModalSection';
import SearchSection from './component/SearchSection';

export class App extends Component {
  state = {
    page: 1,
    photos: [],
    selectedPhoto: {},
    searchedQuery: '',
    searchedQueries: JSON.parse(localStorage.getItem('searchedQueries')),
    visible: false,
    isModal: false
  }

  constructor(props) {
    super(props)
    window.addEventListener("scroll", this.closeHandler);
  }

  async componentDidMount() {
    await this.callApi()
  }

  callApi = async () => {
    const { page, photos } = this.state
    const response = await getAllPics(page)
    if (!response.error) {
      this.setState({
        photos: page === 1
          ? response.data.photo
          : [...photos, ...response.data.photo]
      })
    }
  }

  updateInputHandler = (value) => {
    this.setState({ searchedQuery: value.target.value })
  }

  toggleMenuHandler = () => {
    this.setState({ visible: !this.state.visible });
  };

  closeHandler = () => {
    this.setState({ visible: false, isModal: false });
  };

  toggleModalHandler = (selectedPhoto) => {
    this.setState({ isModal: !this.state.isModal, selectedPhoto })
  }

  loadMoreHandler = () => {
    this.setState({ page: this.state.page + 1 }, async () => await this.callApi())
  }

  addItemHandler = () => {
    const { searchedQueries, searchedQuery } = this.state
    this.setState({ searchedQueries: [...searchedQueries, searchedQuery] })
    localStorage.setItem('searchedQueries', JSON.stringify([...searchedQueries, searchedQuery]))
  }

  refreshHandler = () => {
    this.setState({ page: 1 }, async () => await this.callApi())
  }

  renderModalSection() {
    const { farm, server, id, secret } = this.state.selectedPhoto

    return (
      <ModalSection toggleModalHandler={this.toggleModalHandler}>
        <img
          className="modalImg"
          src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
          alt="" />
      </ModalSection>
    )
  }

  renderSearchSection() {
    const { visible, searchedQuery, searchedQueries } = this.state

    return (
      <SearchSection
        visible={visible}
        searchedQueries={searchedQueries}
        searchedQuery={searchedQuery}
        toggleMenuHandler={this.toggleMenuHandler}
        updateInputHandler={this.updateInputHandler}
        addItemHandler={this.addItemHandler} />
    )
  }

  render() {
    const { photos, isModal } = this.state

    return (
      <div className="app">
        <div className="appHeader">
          <h1>Scroll the way up!</h1>
          {this.renderSearchSection()}
        </div>
        <div className="bodyContainer">
          <ListSection
            photos={photos}
            toggleModalHandler={this.toggleModalHandler}
            loadMoreHandler={this.loadMoreHandler} />
        </div>
        {isModal ? this.renderModalSection() : null}
      </div>
    );
  }
}

export default App;
