import React, {Component} from 'react';
import NavigationTop from "./NavigationTop";
import MainLaoyout from "./layout/Main";

class PageNotFound extends Component
{
    render () {
        return (
            <MainLaoyout>
                <div className="container">
                    <div className="starter-template">
                        <h1>404. Page not found</h1>
                    </div>
                </div>
            </MainLaoyout>
        )
    }
}

export default PageNotFound;