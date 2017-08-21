import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';

import * as _ from 'lodash';
import * as queryString from 'query-string';

import * as Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import * as Lightbox from 'react-images';

import './index.scss';

export interface IPhotosPageState {
  photos?: string,
  pageNum: number,
  totalPages: number,
  loadedAll: boolean,
  currentImage: number,
  lightboxIsOpen?: boolean,
  dimensions: {
    width: number,
    height: number
  }
}

export class PhotosPage extends React.Component<RouteComponentProps<any>, IPhotosPageState> {
  constructor(props: RouteComponentProps<any>) {
    super(props);

    this.state = {
      photos: null,
      pageNum: 1,
      totalPages: 1,
      loadedAll: false,
      currentImage: 0,
      dimensions: {
        width: -1,
        height: 1
      }
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  render() {
    if (this.state.photos) {
      return <div className="photo-gallery">
        <h1>Engagement Photos</h1>
        <Measure
          bounds
          onResize={(contentRect) => {
            this.setState({ dimensions: contentRect.bounds })
          }}
        >
          {({ measureRef }) =>
            <div ref={measureRef}>
              <Gallery
                photos={this.state.photos}
                cols={this.calculateCols()}
                onClickPhoto={this.openLightbox}
              />
            </div>
          }
        </Measure>

        <Lightbox
          theme={{container: { background: 'rgba(0, 0, 0, 0.85)' }}}
          images={this.state.photos}
          backdropClosesModal={true}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          width={1600}
        />

        {!this.state.loadedAll && <div className="loading-msg" id="msg-loading-more">Loading...</div>}
      </div>;
    } else {
      return <div className="photo-gallery">
        <h1>Engagement Photos</h1>
        <div id="msg-app-loading" className="loading-msg">Loading...</div>
      </div>;
    }
  }

  componentDidMount() {
    this.loadMorePhotos();
    this.loadMorePhotos = _.debounce(this.loadMorePhotos, 200);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      this.loadMorePhotos();
    }
  }

  photoURL() {
    let query = queryString.stringify({
      method: 'flickr.photosets.getPhotos',
      api_key: '40d2699685f785a0630eb9cb34fe5bd6',
      photoset_id: '72157687866723785',
      user_id: '7726635@N04',
      format: 'json',
      nojsoncallback: '?',
      per_page: 21,
      page: this.state.pageNum,
      extras: 'url_m,url_c,url_l,url_h,url_o'
    });
    return `https://api.flickr.com/services/rest/?${query}`;
  }

  loadMorePhotos(event?) {
    if (event) {
      event.preventDefault();
    }

    fetch(this.photoURL())
      .then(response => response.json())
      .then(data => {
        let photos = data.photoset.photo.map((item) => {
          let aspectRatio = parseInt(item.width_o) / parseInt(item.height_o);
          return {
            src: (aspectRatio >= 3) ? item.url_c : item.url_m,
            width: parseInt(item.width_o),
            height: parseInt(item.height_o),
            caption: item.title,
            alt: item.title,
            srcset:[
              item.url_m + ' ' + item.width_m + 'w',
              item.url_c + ' ' + item.width_c + 'w',
              item.url_l + ' ' + item.width_l + 'w',
              item.url_h + ' ' + item.width_h + 'w'
            ],
            sizes:[
              '(min-width: 480px) 50vw',
              '(min-width: 1024px) 33.3vw',
              '100vw'
            ]
          };
        });

        this.setState({
          photos: this.state.photos ? this.state.photos.concat(photos) : photos,
          pageNum: this.state.pageNum + 1,
          totalPages: data.photoset.pages
        });
      })
      .catch(error => console.log("Error loading photos JSON", error));

    if (this.state.pageNum >= this.state.totalPages){
      this.setState({loadedAll: true});
      return;
    }
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    if(this.state.photos.length - 2 === this.state.currentImage){
      this.loadMorePhotos();
    }
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  calculateCols() {
    let width = this.state.dimensions.width;
    if (width >= 1024) {
      return 3;
    }
    if (width >= 480) {
      return 2;
    }
    return 1
  }
}
