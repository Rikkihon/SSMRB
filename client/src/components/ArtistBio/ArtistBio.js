import React from "react";
import "./ArtistBio.css";
import Artists from "../artistSeed.json";
import SocialContact from '../Social and Contact'

class ArtistBio extends React.Component {
    state = {
        Artists
      };

    render () {
        return (
            <div className="artistBio">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div >
                        <img className="profileImage" src="https://images.pexels.com/photos/1036620/pexels-photo-1036620.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                    </div>
                    <SocialContact 
                        instagram={this.state.Artists[0].instagram}
                        twitter={this.state.Artists[0].twitter}
                        linkedin={this.state.Artists[0].linkedin}
                        website={this.state.Artists[0].website}
                        email={this.state.Artists[0].email}
                        phone={this.state.Artists[0].phone}
                    />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">

                </div>
            </div>
        ) 
    }
}

 export default ArtistBio;