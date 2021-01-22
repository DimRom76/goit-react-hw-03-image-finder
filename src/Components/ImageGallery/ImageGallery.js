import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal/Modal';

import s from './ImageGallery.module.css';

const bigImage = { alt: '', src: '' };

class ImageGallery extends Component {
  constructor() {
    super();
    this.state = { showModal: false };
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onClickImage = event => {
    bigImage.alt = event.target.alt;
    bigImage.src = event.target.dataset.big_img;
    this.toggleModal();
  };

  render() {
    const { showModal } = this.state;
    const { images } = this.props;

    return (
      <>
        <ul className={s.ImageGallery}>
          <ImageGalleryItem images={images} onClickImage={this.onClickImage} />
        </ul>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={bigImage.src} alt={bigImage.alt} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array,
};

export default ImageGallery;
