import PropTypes from 'prop-types';
import { Component } from 'react';

import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  componentDidUpdate() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    /* id, webformatURL, largeImageURL, tags */
    const { images, onClickImage } = this.props;
    return (
      <>
        {images.map(el => {
          return (
            <li className={s.ImageGalleryItem} key={el.id}>
              <img
                src={el.webformatURL}
                alt={el.tags}
                className={s.ImageGalleryItem_image}
                data-big_img={el.largeImageURL}
                onClick={onClickImage}
              />
            </li>
          );
        })}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onClickImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
