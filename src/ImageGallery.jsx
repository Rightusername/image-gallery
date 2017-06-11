import React from 'react';
import superagent from "superagent";
import Photo from "./Photo.jsx";
import OpenPhoto from "./OpenPhoto.jsx";
import _ from 'underscore';

class ImageGallery extends React.Component{

    constructor(){
        super();
        this.state = {photos: [], photosPage: 1, openPhoto: -1};
        this.handler = this.handler.bind(this);
        this.changeOpenPhoto = this.changeOpenPhoto.bind(this);
        this.throtledLoadPhotos = _.debounce(function() {
            this.loadPhotos();
        },1500).bind(this);
    }

    componentDidMount(){
        this.throtledLoadPhotos(this.state.photosPage);
        window.addEventListener('scroll', (e)=>this.handleScroll(e));
        window.addEventListener("resize", (e)=>this.renderSizes(e));
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
              photosPage: +this.state.photosPage + 1,
              photos: this.state.photos.concat(photos)
            });
            this.renderSizes();
            this.refs["loadbar"].className = "hide-load-bar";
        });
    }

    handler(e) {
        e.preventDefault();
        if(e.target.className == "open-photo-image"){
            if(this.state.photos.length - 1 == this.state.openPhoto) {
                this.throtledLoadPhotos();
                return;
            }
            this.setState({
              openPhoto: +this.state.openPhoto + 1
            })
        }
        if(e.target.className == "openPhoto" || e.target.className == "close-image" ){
            this.setState({
              openPhoto: -1
            })
        }
      }

    handleOpen(event){
        if(event.target.parentNode.tagName == "LI"){
            this.setState({openPhoto: event.target.parentNode.dataset.i});
        }
    }

    changeOpenPhoto(i){
        this.setState({openPhoto: i});
    }

    handleScroll(e){
        if(e.target.body.scrollHeight - e.target.body.scrollTop <= e.target.body.clientHeight + 10){
            this.refs["loadbar"].className = "show-load-bar";
            this.throtledLoadPhotos();
        }
    }

    renderSizes(){
        var minHeight = 100;
        var maxHeight = 300;
        var maxPhotos = 5;
        var padding = 1;
        var width = this.refs["photos-list"].offsetWidth;
        var photosWidths = [];
        var photos = this.state.photos;
        for(var i =0; i<this.state.photos.length; i++){
            photosWidths[i] = (minHeight-padding*2)*photos[i].width/photos[i].height + padding*2;
            photos[i].myHeight = minHeight;
        }
        for(var i =0; i<this.state.photos.length; i+=maxPhotos){
            var l = 0;
            for(var j=0; j<maxPhotos; j++){
                l+=photosWidths[i+j];
            }
            var k = width/l;
            // photos[i].myHeight = photos[i].myHeight*k;
            // photos[i+1].myHeight = photos[i+1].myHeight*k;
            // photos[i+2].myHeight = photos[i+2].myHeight*k;
            // photos[i+3].myHeight = photos[i+3].myHeight*k;
            // photos[i+4].myHeight = photos[i+4].myHeight*k;
            for(var j=0; j<maxPhotos; j++){
                photos[i+j].myHeight = photos[i+j].myHeight*k - 0.25;
            }
        }

        this.setState({photos: photos});
    }


    render(){
    	return (
            <div>        
                <OpenPhoto
                    url={this.state.openPhoto}
                    handler={this.handler}
                    changeOpenPhoto={this.changeOpenPhoto}
                    photos={this.state.photos}
                    throtledLoadPhotos = {this.throtledLoadPhotos}
                />
                <ul ref="photos-list" className="photos-list" onClick={this.handleOpen.bind(this)}>
                    {
                        this.state.photos.map(function(el, i, arr) {
                            return <Photo
                                key={i}
                                myHeight={this.state.photos[i].myHeight}
                                name={el.name}
                                i={i}
                                image={el.image_url}
                                user={el.user.fullname}
                            />;
                        }, this)
                    }
                </ul>
                <div ref="loadbar" className="loading-bar"></div>
            </div>

        )

    }
}

export default ImageGallery;