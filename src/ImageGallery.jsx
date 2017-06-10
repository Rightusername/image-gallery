import React from 'react';
import superagent from "superagent";
import Photo from "./Photo.jsx";
import OpenPhoto from "./OpenPhoto.jsx";

class ImageGallery extends React.Component{

    constructor(){
        super();
        this.state = {photos: [], photosPage: 1, openPhoto: -1};
        this.handler = this.handler.bind(this);
        this.changeOpenPhoto = this.changeOpenPhoto.bind(this);
        this.loadPhotos = this.loadPhotos.bind(this);
    }
    componentDidMount(){
        this.loadPhotos(this.state.photosPage);
        window.addEventListener('scroll', (e)=>this.handleScroll(e));
    }

    loadPhotos(){
        const url='https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&image_size=4&page=' + this.state.photosPage;
        superagent
        .get(url)
        .query(null)
        .set('Accept', 'application/json')
        .end ((error, res)=>{
            const photos = res.body.photos;  
            this.setState({
              photos: this.state.photos.concat(photos),
              photosPage: this.state.photosPage + 1
            });
        });
    }

    handler(e) {
        e.preventDefault()
            if(e.target.className == "openPhoto" || e.target.className == "close-image" ){
            this.setState({
              openPhoto: -1
            })
        }
      }

    handleOpen(event){
        if(event.target.tagName == "IMG"){
            this.setState({openPhoto: event.target.dataset.i});
        }
    }

    changeOpenPhoto(i){
        this.setState({openPhoto: i});
    }

    handleScroll(e){
        if(e.target.body.scrollHeight - e.target.body.scrollTop === e.target.body.clientHeight){
            this.loadPhotos();
        }
    }


    render(){
    	return (
            <div>        
                <OpenPhoto
                    url={this.state.openPhoto}
                    handler={this.handler}
                    changeOpenPhoto={this.changeOpenPhoto}
                    photos={this.state.photos}
                    loadPhotos = {this.loadPhotos}
                />
                <ul className="photos-list" onClick={this.handleOpen.bind(this)}>
                    {
                        this.state.photos.map(function(el, i, arr) {
                            return <Photo
                                key={el.id}
                                name={el.name}
                                i={i}
                                image={el.image_url}
                                user={el.user.fullname}
                            />;
                        })
                    }
                </ul>
            </div>
        )

    }
}

export default ImageGallery;