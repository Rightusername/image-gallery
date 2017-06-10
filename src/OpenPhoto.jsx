import React from 'react';

class OpenPhoto extends React.Component{
	constructor(){
        super();
        this.prevPhoto = this.prevPhoto.bind(this);
        this.nextPhoto = this.nextPhoto.bind(this);
    }




    keyListener(e){
    	if(this.props.url == -1) return;
    	switch(e.keyCode){
    		case 39:
    			if(this.props.photos.length - 1 == this.props.url) {
    			
    				this.props.throtledLoadPhotos();
    				return;
    			}
    			this.props.changeOpenPhoto(+this.props.url +1);
    			break;
    		case 37:
    			if(this.props.url == 0) return;
    			this.props.changeOpenPhoto(+this.props.url -1);
    			break;
    	}
    }

    nextPhoto(){
		if(this.props.photos.length - 1 == this.props.url) {
			this.props.throtledLoadPhotos();
			return;
		}
		this.props.changeOpenPhoto(+this.props.url +1);
    }

    prevPhoto(){
		if(this.props.url == 0) return;
		this.props.changeOpenPhoto(+this.props.url -1);
		console.log(12);
    }

    componentWillMount(){
        window.addEventListener('keydown', this.keyListener.bind(this));
    }

    render(){
    	if(this.props.url==-1){
    		 return (<div></div>);
	    }else{
	    	let url = this.props.url;
	    	return (
			    	<div className="openPhoto" onClick={this.props.handler}>
			    		<img className="open-photo-image" src={this.props.photos[url].image_url}/>
			    		<div className="close-image"></div>
			    		<div className="open-photo-nav">
			    			<div className="photo-prev-btn" onClick={this.prevPhoto}>prev</div>
			    			<div className="photo-next-btn" onClick={this.nextPhoto}>next</div>
			    		</div>
			    	</div>

		    );
	    }
    }
}


export default OpenPhoto;