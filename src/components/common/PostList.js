import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {getAllPosts} from '../../actions/user';

class PostList extends Component
{
	constructor(props) {
		super(props);
		this.props.getAllPosts(() => {});
	}

	renderSingle(postData) {

		const {id, title, img_url, content} = postData;

		return(
			<div key={id} className="border rounded c-block-stack">
				<h1>{title}</h1>
				<img src={img_url} />
				<div><p dangerouslySetInnerHTML={{__html: content}} /></div>
			</div>
		);
	}

	render () {
		return (
			<div>
				{	this.props.postsReducer.allPosts.length>0 && this.props.postsReducer.allPosts.reverse().map(this.renderSingle)}
				{	this.props.postsReducer.allPosts<=0 && <div className="text-center">No Post to display</div>}
			</div>

		);
	}
}


function mapStateToProps({postsReducer}) {
	return {postsReducer};
}

export default connect(mapStateToProps, {getAllPosts})(PostList);
