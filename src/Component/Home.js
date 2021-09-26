import React from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Button, Carousel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import StarRating from 'react-bootstrap-star-rating'
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai'

const apiKey = "bc47508847273bbf0b53b61fa930f41b"
const sessionId = "92a87cc19886f1c47e3c11a43cb0268934fcb5cc"
const accId = "11148763"
const urlBase = "https://api.themoviedb.org/3/"

export default function Home() {
    const [tvPop, setTvPop] = React.useState([])
    const [pageTv, setPageTv] = React.useState(1)
    const [movPop, setMovPop] = React.useState([])
    const [pageMov, setPageMov] = React.useState(1)
    const [respTv, setRespTv] = React.useState()
    const [respMov, setRespMov] = React.useState()

    React.useEffect(() => {
        axios.get(urlBase + "tv/popular", { params: {
            api_key: apiKey,
            page: pageTv
        }}).then((response) =>
        {
            setTvPop(response.data.results)
            // console.log(response.data.results)
        })
    },[])

    React.useEffect(() => {
        axios.get(urlBase + "movie/popular", { params: {
            api_key: apiKey,
            page: pageMov
        }}).then((response) =>
        {
            setMovPop(response.data.results)
            // console.log(response.data.results)
        })
    },[])

    const getPoster = (path) => `https://image.tmdb.org/t/p/w500/${path}`

    const getBanner = (path) => `https://image.tmdb.org/t/p/w1280/${path}`

    const checkOverview = (overview) => {
        if (overview === "") {
            return "There's no Information"
        } else {
            return overview
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Add to Watchlist
        </Tooltip>
    )

    const addTVWatchList = (iD) => {
        axios.post(urlBase + "account/" + accId + "/watchlist", 
        {
            media_type: "tv",
            media_id: iD,
            watchlist: true
        },
        {
            params: {
               api_key: apiKey, 
               session_id: sessionId
            }
        }).then((response) => {
            setRespTv(response.data.status_message)
        });
    }

    const addMovWatchList = (iD) => {
        axios.post(urlBase + "account/" + accId + "/watchlist", 
        {
            media_type: "movie",
            media_id: iD,
            watchlist: true
        },
        {
            params: {
               api_key: apiKey, 
               session_id: sessionId
            }
        }).then((response) => {
            setRespMov(response.data.status_message)
        });
    }

    return (
        <div>
            <Container fluid>
            <Carousel variant="dark">
                {tvPop.slice(0,1).map((tvpl) => (
                    <Carousel.Item className="carouseloverlay">
                        <img className="d-block w-100" src={getBanner(tvpl.backdrop_path)} alt="First slide" style={{maxHeight:'720px', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)'}}/>
                    <Carousel.Caption style={{color: 'black', textShadow: '0 0 1px rgba(255, 255, 255, 1)', WebkitTextStrokeWidth: '0.1px',WebkitTextStrokeColor: 'white'}}>
                        <h1>{tvpl.name}</h1>
                        <h2>{tvpl.vote_average} / 10</h2>
                        <p>{checkOverview(tvpl.overview)}</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                {movPop.slice(0,1).map((movpl) => (
                    <Carousel.Item className="carouseloverlay">
                        <img className="d-block w-100" src={getBanner(movpl.backdrop_path)} alt="Second slide" style={{maxHeight:'720px', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)'}}/>
                    <Carousel.Caption style={{color: 'black', WebkitTextStrokeWidth: '0.1px',WebkitTextStrokeColor: 'white'}}>
                        <h1>{movpl.original_title}</h1>
                        <h2>{movpl.vote_average} / 10</h2>
                        <p>{checkOverview(movpl.overview)}</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    ))}
            </Carousel>
                {/* <Row style={{paddingTop: '10px'}}>
                    <Col>
                    <Card style={{maxHeight:'720px',backgroundColor: '#596274'}}>
                        {tvPop.slice(0,1).map((tvpl) => (
                            <Row>
                            <Col>
                                <Card.Img src={getBanner(tvpl.backdrop_path)} />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title style={{color: 'white'}}><h1>Most Popular TV Show</h1></Card.Title>
                                    <Card.Title style={{color: 'white'}}><h2>{tvpl.name}</h2></Card.Title>
                                    <Card.Text style={{color: 'white'}}><h5>{tvpl.vote_average} / 10</h5></Card.Text>
                                    <Card.Text style={{color: 'white'}}>{checkOverview(tvpl.overview)}</Card.Text>
                                </Card.Body>
                            </Col>
                            </Row>
                        ))}
                    </Card>
                    </Col>
                </Row> */}
                <div>
                    <h2 style={{color: 'white', paddingTop: '20px', paddingBottom: '10px'}}>Popular TV Shows</h2>
                </div>
                <Row xs={6}>
                    {tvPop.slice(1,7).map((tvpl) => (
                    <Col>
                        <Card className="bg-dark text-white" style={{width: '250px'}}>
                            <Card.Img src={getPoster(tvpl.poster_path)}/>
                            <Card.ImgOverlay className="cardhover">
                                <Card.Text className='overviewflow'>{checkOverview(tvpl.overview)}</Card.Text>
                                <OverlayTrigger
                                    placement="top-start"
                                    delay={{show:200, hide:100}}
                                    overlay={renderTooltip}>
                                        <Button style={{
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        border: '0px',
                                        borderRadius: '100%'
                                        }} onClick={() => {addTVWatchList(tvpl.id)}}><AiOutlinePlusCircle style={{height: '30px', width: '30px'}}/>
                                        </Button>
                                    </OverlayTrigger>
                            </Card.ImgOverlay>
                            <Card.Body style={{backgroundColor: 'transparent'}}>
                                <Card.Title><h6>{tvpl.name}</h6></Card.Title>
                                <Card.Text>{tvpl.vote_average} / 10</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
                <div>
                    <h2 style={{color: 'white', paddingTop: '20px', paddingBottom: '10px'}}>Popular Movies</h2>
                </div>
                <Row xs={6}>
                    {movPop.slice(1,7).map((mpl) => (
                    <Col>
                        <Card className="bg-dark text-white" style={{width: '250px'}}>
                            <Card.Img src={getPoster(mpl.poster_path)}/>
                            <Card.ImgOverlay className="cardhover">
                                <Card.Text className='overviewflow'>{checkOverview(mpl.overview)}</Card.Text>
                                <OverlayTrigger
                                    placement="top-start"
                                    delay={{show:200, hide:100}}
                                    overlay={renderTooltip}>
                                        <Button style={{
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        border: '0px',
                                        borderRadius: '100%'
                                        }} onClick={() => {addMovWatchList(mpl.id)}}><AiOutlinePlusCircle style={{height: '30px', width: '30px'}}/>
                                        </Button>
                                    </OverlayTrigger>
                            </Card.ImgOverlay>
                            <Card.Body style={{backgroundColor: 'transparent'}}>
                                <Card.Title><h6>{mpl.original_title}</h6></Card.Title>
                                <Card.Text>{mpl.vote_average} / 10</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
