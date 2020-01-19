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
    searchedQueries: JSON.parse(localStorage.getItem('searchedQueries')) || [], // Initially searchedQueries will be null
    visible: false,
    isModal: false,
    isEmpty: false,
    isError: false
  }

  constructor(props) {
    super(props)

    /** Event Listener to check for scrolling */
    window.addEventListener("scroll", this.closeHandler);

    /** Debounce function to limit the rate at which the function is fired */
    this.debounceSearch = _.debounce(this.callSearchApi, 300)
  }

  async componentDidMount() {
    await this.callApi()
  }

  /**
   * flickr API calls
   */

  callApi = async () => {
    const { page, photos } = this.state
    const response = await getAllPics(page)
    if (!response.error) { // check for error in response from the API call
      this.setState({
        photos: page === 1
          ? response.data.photo
          : [...photos, ...response.data.photo],
        isEmpty: (page === 1 && !response.data.photo.length) ? true : false
      })
    } else {
      this.setState({ isError: true })
    }
  }

  callSearchApi = async () => {
    const { searchedQuery, page, photos } = this.state
    this.setState({ isEmpty: false })
    const response = await getSearchedPics(searchedQuery, page)
    if (!response.error) {
      this.setState({
        photos: page === 1
          ? response.data.photo
          : [...photos, ...response.data.photo],
        isEmpty: (page === 1 && !response.data.photo.length) ? true : false
      })
    } else {
      this.setState({ isError: true })
    }
  }

  closeHandler = () => {
    const { visible, isModal } = this.state
    if (visible || isModal) {
      this.setState({ visible: false, isModal: false });
    }
  };

  /**
   * List Section Function
   */

  toggleModalHandler = (selectedPhoto) => {
    this.setState({ isModal: !this.state.isModal, selectedPhoto })
  }

  loadMoreHandler = () => {
    const { page, searchedQuery } = this.state
    this.setState({
      page: page + 1
    }, async () => {
      /** If no searched parameter, it will call getRecent api */
      if (searchedQuery === '') await this.callApi()
      else await this.callSearchApi()
    })
  }


  /**
  * Search Section
  */

  toggleMenuHandler = () => {
    this.setState({ visible: !this.state.visible });
  };

  updateInputHandler = async (value) => {
    let searchedQuery = value.target.value
    this.setState({ searchedQuery, page: 1, isError: false }, async () => {
      /** If no searched parameter, it will call getRecent api */
      if (searchedQuery === '') {
        console.log('is it coming here');
        this.debounceSearch.cancel()
        return this.callApi()
      }
      this.debounceSearch()
    })
  }

  /** Function to search query from browser history */
  selectQueryHandler = async (query) => {
    this.toggleMenuHandler()
    this.setState({ searchedQuery: query, page: 1 }, async () => await this.callSearchApi())
  }

  clearStorageHandler = () => {
    localStorage.clear()
    this.setState({ searchedQueries: [] })
  }

  addItemHandler = async () => {
    const { searchedQueries, searchedQuery } = this.state
    let updateSearchedQueries = [searchedQuery, ...searchedQueries]
    if (searchedQueries.includes(searchedQuery)) {
      return this.toggleMenuHandler()
    }

    /** Restrict the browser history to upto 5 latest searches */
    if (searchedQueries.length === 5) {
      updateSearchedQueries = [searchedQuery, ...searchedQueries.splice(-1, 1)]
    }

    this.setState({ searchedQueries: updateSearchedQueries })
    localStorage.setItem('searchedQueries', JSON.stringify(updateSearchedQueries))
    this.toggleMenuHandler()
  }

  /**
   * Render Functions
   */

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

  renderMainSection() {
    const { photos, isEmpty, isError } = this.state

    return (
      <div className="bodyContainer">
        {isError
        ?  <div className="emptyText">Something went wrong.</div>
        :!isEmpty
          ? <ListSection
            photos={photos}
            toggleModalHandler={this.toggleModalHandler}
            loadMoreHandler={this.loadMoreHandler} />
          : <div className="emptyText">No data available</div>}
      </div>
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
    const { isModal } = this.state

    return (
      <div className="app">
        <div className="appHeader">
          <h1>Scroll the way up!</h1>
          {this.renderSearchSection()}
        </div>
        {this.renderMainSection()}
        {isModal ? this.renderModalSection() : null}
      </div>
    );
  }
}

export default App;
