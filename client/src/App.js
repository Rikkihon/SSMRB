import React, { PureComponent } from 'react';
import './App.css';
import SignIn from './components/SignIn'
import ArtistProfiles from './pages/ArtistProfiles'
import ArtistThumbnail from './components/ArtistThumbnail';
import ImageUpload from './components/ImageUpload'
import GalleryComponent from './components/Gallery'
//import Community from './components/Community/community.js'

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <ArtistProfiles />
        <SignIn/>
        <ArtistThumbnail />
        <ImageUpload />
        <GalleryComponent /> */}
      </div>
    );
  }
}

export default App;
