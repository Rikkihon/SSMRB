import React, { Component } from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselInner, CarouselItem, CarouselIndicators, CarouselIndicator, View, Mask, Container } from 'mdbreact';

class CarouselPage extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.state = {
            activeItem: 1,
            maxLength: 4
        };
    }

    next() {
        let nextItem = this.state.activeItem + 1;
        if (nextItem > this.state.maxLength) {
            this.setState({ activeItem: 1 });
        } else {
            this.setState({ activeItem: nextItem });
        }
    }

    prev() {
        let prevItem = this.state.activeItem - 1;
        if (prevItem < 1) {
            this.setState({ activeItem: this.state.maxLength });
        } else {
            this.setState({ activeItem: prevItem });
        }
    }

    goToIndex(item) {
        if (this.state.activeItem !== item) {
            this.setState({
                activeItem: item
            });
        }
    }

    render() {
        const { activeItem } = this.state;
        return (

            <Container fluid>
                <Carousel
                    activeItem={this.state.activeItem}
                    next={this.next}
                    className="z-depth-1">
                    <CarouselInner>
                        <CarouselItem itemId="1">
                            <View>
                                <img className="d-block w-100" src="https://i.imgur.com/5DOL5Gg.jpg" alt="First slide" />

                                <Mask overlay="black-light"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Light mask</h3>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="2">
                            <View>
                                <img className="d-block w-100" src="https://i.imgur.com/9FJNJwp.jpg" alt="Second slide" />
                                <Mask overlay="black-strong"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Strong mask</h3>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="3">
                            <View>
                                <img className="d-block w-100" src="https://i.imgur.com/jVew2O5.jpg" alt="Third slide" />
                                <Mask overlay="black-slight"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Slight mask</h3>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="4">
                            <View>
                                <img className="d-block w-100" src="https://i.imgur.com/7dlNIwA.jpg " alt="Mattonit's item" />
                                <Mask overlay="black-light"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Sopot Beach</h3>
                            </CarouselCaption>
                        </CarouselItem>
                    </CarouselInner>
                    <CarouselControl direction="prev" role="button" onClick={() => { this.prev(); }} />
                    <CarouselControl direction="next" role="button" onClick={() => { this.next(); }} />
                    <CarouselIndicators>
                        <CarouselIndicator active={activeItem === 1 ? true : false} onClick={() => { this.goToIndex(1); }}></CarouselIndicator>
                        <CarouselIndicator active={activeItem === 2 ? true : false} onClick={() => { this.goToIndex(2); }}></CarouselIndicator>
                        <CarouselIndicator active={activeItem === 3 ? true : false} onClick={() => { this.goToIndex(3); }}></CarouselIndicator>
                        <CarouselIndicator active={activeItem === 4 ? true : false} onClick={() => { this.goToIndex(4); }}></CarouselIndicator>
                    </CarouselIndicators>
                </Carousel>
            </Container>
        );
    }
}

export default CarouselPage;