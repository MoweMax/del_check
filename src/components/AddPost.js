import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MainLayout from "./common/layout/Main";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addPost } from '../actions/user';
import PropTypes from 'prop-types';

class AddPost extends React.Component {
	static propTypes = {
		post: PropTypes.object
	};

	static defaultProps = {
		post: {
			title: '',
			img_url: '',
			content: "<p>Just rewrite <br /><b>this</b><br /> paragraph!</p>"
		},
		submitted: false
	};

	state = {
		post: this.props.post,
		submitted: this.props.submitted,
        selectedFile: null
	};


	handleChange = (event) => {
		const name = event.target.id === "tinyMCE-1"?"content":event.target.name;
		const value = event.target.id === "tinyMCE-1"?event.target.getContent():event.target.value;
		const { post } = this.state;
		this.setState({
			post: {
				...post,
				[name]: value
			}
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({ submitted: true });
		const { post } = this.state;
		if (post.title && post.content) {
			this.props.addPost(post, () => {});
		}
	};

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        console.log(file);
        this.setState({selectedFile: event.target.files[0]})
    };

    uploadHandler = () => {
        console.log(this.state.selectedFile)
    };

	render() {
		const { post, submitted } = this.state;
		return (
			<div>
				<MainLayout>
					<form name="form" onSubmit={this.handleSubmit}>
						<div className="form-group clearfix">
							{ this.props.postsReducer.message_r &&
								<label className="alert alert-success ">{this.props.postsReducer.message_r}</label>
							}
							<button className="btn btn-primary float-right">Save</button>
						</div>
						<div className={'form-group' + (submitted && !post.title ? ' has-error' : '')}>
							<label htmlFor="Title">Title:</label>
							<input type="text" className="form-control" name="title" value={post.title} onChange={this.handleChange} />
							{submitted && !post.title &&
								<div className="alert alert-danger">Title is required</div>
							}
						</div>
						<div className={'form-group'}>
							<label htmlFor="Title">Image url:</label>
							<input type="text" className="form-control" name="img_url" value={post.img_url} onChange={this.handleChange} />
						</div>
                        <div className={'form-group'}>
                            <label htmlFor="Title">Image file:</label>
                        	<input type="file" onChange={this.fileChangedHandler} />
                            <button onClick={this.uploadHandler}>Upload!</button>
                        </div>
						<div className={'form-group'}>
							<Editor
                                className={'form-group'}
								id="tinyMCE-1"
								name="content"
                                initialValue={post.content}
								init={{
									inline: true,
									plugins: 'link image code',
									toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
								}}
								onChange={this.handleChange}
							/>
						</div>
					</form>
				</MainLayout>
			</div>
		);
	}
}

function mapStateToProps({postsReducer}) {
	return {
		postsReducer
	}
}
export default connect(mapStateToProps, {addPost})(AddPost);
