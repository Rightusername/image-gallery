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
		if(this.props.photos.length - 2 == this.props.url) {
            this.props.changeOpenPhoto(+this.props.url +1);
			this.props.throtledLoadPhotos();
			return;
		}
		this.props.changeOpenPhoto(+this.props.url +1);
    }

    prevPhoto(){
		if(this.props.url == 0) return;
		this.props.changeOpenPhoto(+this.props.url -1);
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
			    	<div className="openPhoto" ref="openPhoto" onClick={this.props.handler}>
                        <div className="open-photo-wrap animated zoomIn">
			    		   <img className="open-photo-image" src={this.props.photos[url].image_url}/>
                        </div>
                            <div className="photo-prev-btn" onClick={this.prevPhoto}>&#8249;</div>
                            <div className="photo-next-btn" onClick={this.nextPhoto}>&#8250;</div>
			    		<div className="close-image"></div>
			    	</div>

		    );
	    }
    }
}


export default OpenPhoto;