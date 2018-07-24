import React from 'react';
import './Home.css';


// Components
    import About from '../../components/About';
    import Carousel from '../../components/Carousel';
    import Draggable from'../../components/Draggable';

class Home extends React.PureComponent {
    render() {
        return (
            <div>
                <Carousel />
                <About />
                <Draggable />
            </div>    
        )
    }
}

export default Home;