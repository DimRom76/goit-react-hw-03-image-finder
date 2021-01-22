import { Component } from 'react';

import './App.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button/';
import Loader from './Components/Loader/';

import fetchPhoto from './Service/apiService';
import STATUS from './Service/apiStatus';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      queryString: '',
      images: [],
      status: '',
      error: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { queryString: prevQueryString, page: prevPage } = prevState;
    const { queryString: nextQueryString, page: nextPage } = this.state;

    if (prevQueryString !== nextQueryString || prevPage !== nextPage) {
      this.setState({ status: STATUS.PENDING });

      this.getPhoto(nextQueryString, nextPage);
    }
  }

  getPhoto(nextQueryString, nextPage) {
    fetchPhoto(nextQueryString, nextPage)
      .then(data => {
        const arrayImages = [];
        if (data.hits.length === 0) {
          return Promise.reject(new Error(`Данных для отображения нет`));
        }

        data.hits.forEach(element => {
          const { id, webformatURL, largeImageURL, tags } = element;
          arrayImages.push({ id, webformatURL, largeImageURL, tags });
        });
        return arrayImages;
      })
      .then(arrayImages => {
        this.setState({
          images: [...this.state.images, ...arrayImages],
          status: STATUS.RESOLVED,
        });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error, status: STATUS.REJECTED }));
  }

  onSubmit = values => {
    this.setState({ page: 1, queryString: values, images: [] });
  };

  onClickButtomLoadMore = event => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { error, images, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {status === STATUS.REJECTED && <h1>{error.message}</h1>}

        {(status === STATUS.RESOLVED || status === STATUS.PENDING) && (
          <ImageGallery images={images} />
        )}

        {status === STATUS.RESOLVED && (
          <Button onClick={this.onClickButtomLoadMore} />
        )}

        {status === STATUS.PENDING && <Loader />}
      </div>
    );
  }
}

export default App;
