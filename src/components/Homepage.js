import React, {Component} from 'react';
import MainLayout from "./common/layout/Main";
import PostList from "./common/PostList";

class Homepage extends Component
{
    render () {
        return (
            <div>
                <MainLayout>
                    <div className="container">
                        <div className="starter-template">
                            <h1>Bootstrap starter template</h1>
                            <p className="lead">Use this document as a way to quickly start any new project.
                                <br/>
                                All you get is this
                                text and a mostly barebones HTML document.</p>
                        </div>
                        <PostList className="starter-template">
                        </PostList>
                    </div>
                </MainLayout>
            </div>
        )
    }
}

export default Homepage;