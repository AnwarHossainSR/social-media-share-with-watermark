import MetaTags from 'react-meta-tags';
import ShareButton from 'react-social-share-buttons';

const APP = () => {
  return (
    <div>
      <MetaTags>
        <title>Page 1</title>
        <meta
          id='meta-description'
          name='description'
          content='Some description.'
        />
        <meta id='og-title' property='og:title' content='MyApp' />
        <meta property='og:image' content='url_image'></meta>
        <meta
          id='og-image'
          property='og:image'
          content='https://live.staticflickr.com/4561/38054606355_26429c884f_b.jpg'
        />
      </MetaTags>
      Hey, share me!
      <ShareButton
        compact
        socialMedia={'facebook'}
        url={'https://xkcd.com/1024/'}
        media={'https://imgs.xkcd.com/comics/error_code.png'}
        text='Sit by a lake'
      />
    </div>
  );
};

export default APP;
