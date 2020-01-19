import React, { Component } from 'react';
import _ from 'lodash';


import './App.css';
import { getAllPics, getSearchedPics } from './utils/axiosRequest';
import ListSection from './component/ListSection';
import ModalSection from './component/ModalSection';
import SearchSection from './component/SearchSection';

export class App extends Component {
  state = {
    page: 1,
    photos: [],
    selectedPhoto: {},
    searchedQuery: '',
    searchedQueries: JSON.parse(localStorage.getItem('searchedQueries')) || [],
    visible: false,
    isModal: false
  }

  constructor(props) {
    super(props)
    window.addEventListener("scroll", this.closeHandler);
    this.debounceSearch = _.debounce(this.callSearchApi, 300)
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

  callSearchApi = async () => {
    const { searchedQuery, page, photos } = this.state
    const response = await getSearchedPics(searchedQuery, page)
    if (!response.error) {
      this.setState({
        photos: page === 1
          ? response.data.photo
          : [...photos, ...response.data.photo]
      })
    }

  }

  updateInputHandler = async (value) => {
    let searchedQuery = value.target.value
    this.setState({ searchedQuery, page: 1 })
    if (searchedQuery === '') {
      return this.callApi()
    }
    this.debounceSearch()
  }

  toggleMenuHandler = () => {
    this.setState({ visible: !this.state.visible });
  };

  closeHandler = () => {
    const { visible, isModal } = this.state
    if (visible || isModal) {
      this.setState({ visible: false, isModal: false });
    }
  };

  toggleModalHandler = (selectedPhoto) => {
    this.setState({ isModal: !this.state.isModal, selectedPhoto })
  }

  loadMoreHandler = () => {
    this.setState({ page: this.state.page + 1 }, async () => await this.callApi())
  }

  selectQueryHandler = async (query) => {
    this.toggleMenuHandler()
    this.setState({ searchedQuery: query }, async () => await this.callSearchApi())
  }

  clearStorageHandler = () => {
    localStorage.clear()
  }

  addItemHandler = async () => {
    const { searchedQueries, searchedQuery } = this.state
    let updateSearchedQueries = [searchedQuery, ...searchedQueries]
    if(searchedQueries.includes(searchedQuery)) {
      return this.toggleMenuHandler()
    }

    if (searchedQueries.length === 5) {
      updateSearchedQueries = [searchedQuery, ...searchedQueries.splice(-1,1)]
    }

    this.setState({ searchedQueries: updateSearchedQueries })
    localStorage.setItem('searchedQueries', JSON.stringify(updateSearchedQueries))
    this.toggleMenuHandler()
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
        clearStorageHandler={this.clearStorageHandler}
        selectQueryHandler={this.selectQueryHandler}
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
          {/* {photos.length
            ?  */}
            <ListSection
              photos={photos}
              toggleModalHandler={this.toggleModalHandler}
              loadMoreHandler={this.loadMoreHandler} />
            {/* : <div className="emptyText">No data available</div>} */}
        </div>
        {isModal ? this.renderModalSection() : null}
      </div>
    );
  }
}

export default App;
