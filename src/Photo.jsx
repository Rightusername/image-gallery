import React from 'react';

class Photo extends React.Component {
    render() {
        return (
            <li className="photo animated fadeIn" data-i={this.props.i}>
                <div className="photo-name">{this.props.name}</div>
                <img className="photo-image" src={this.props.image}  height={this.props.myHeight + "px"} data-i={this.props.i}/>
                <div className="photo-author">Author: {this.props.user}</div>
            </li>
        );
    }
}

export default Photo;