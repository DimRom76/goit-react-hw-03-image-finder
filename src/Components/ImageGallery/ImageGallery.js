import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal/Modal';

import s from './ImageGallery.module.css';

const bigImageInit = { alt: '', src: '' };

class ImageGallery extends Component {
  constructor() {
    super();
    this.state = { showModal: false, bigImage: bigImageInit };
  }

  toggleModal = () => {
    this.setState(({ showModal, bigImage }) => {
      const setBigImage = showModal ? bigImageInit : bigImage;
      return { showModal: !showModal, bigImage: setBigImage };
    });
  };

  onClickImage = event => {
    this.setState({
      bigImage: { alt: event.target.alt, src: event.target.dataset.big_img },
    });

    this.toggleModal();
  };

  render() {
    const { showModal, bigImage } = this.state;
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
