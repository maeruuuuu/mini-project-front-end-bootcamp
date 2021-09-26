import axios from 'axios'
import React from 'react'
import { Row, Container, Col, Card, Button } from 'react-bootstrap'
import { ImCross } from 'react-icons/im'

const apiKey = "bc47508847273bbf0b53b61fa930f41b"
const sessionId = "92a87cc19886f1c47e3c11a43cb0268934fcb5cc"
const accId = "11148763"
const urlBase = "https://api.themoviedb.org/3/"

export default function List() {
    const [tvWL, setTvWL] = React.useState([])
    const [respTv, setRespTv] = React.useState()
    const [movWL, setMovWL] = React.useState([])
    const [respMov, setRespMov] = React.useState()

    React.useEffect(() => {
        axios.get(urlBase + "/account/" + accId + "/watchlist/tv", {
                params: {
                    api_key: apiKey,
                    session_id: sessionId,
                    sort_by: "created_at.asc"
                }
        }).then((response) => {
            setTvWL(response.data.results)
            // console.log(response.data.results)
        })
    },[])

    React.useEffect(() => {
        axios.get(urlBase + "/account/" + accId + "/watchlist/movies", {
                params: {
                    api_key: apiKey,
                    session_id: sessionId,
                    sort_by: "created_at.asc"
                }
        }).then((response) => {
            setMovWL(response.data.results)
            // console.log(response.data.results)
        })
    },[])

    function refreshTvWL() {
            axios.get(urlBase + "/account/" + accId + "/watchlist/tv", {
                params: {
                    api_key: apiKey,
                    session_id: sessionId,
                    sort_by: "created_at.asc"
                }
        }).then((response) => {
            setTvWL(response.data.results)
            // console.log(response.data.results)
        })
    }

    function refreshMovWL() {
            axios.get(urlBase + "/account/" + accId + "/watchlist/movies", {
                params: {
                    api_key: apiKey,
                    session_id: sessionId,
                    sort_by: "created_at.asc"
                }
        }).then((response) => {
            setMovWL(response.data.results)
            // console.log(response.data.results)
    })
    }

    const getPoster = (path) => `https://image.tmdb.org/t/p/w185/${path}`

    const checkOverview = (overview) => {
        if (overview === "") {
            return "There's no Information"
        } else {
            return overview
        }
    }

    const removeTVWatchList = (iD) => {
        axios.post(urlBase + "account/" + accId + "/watchlist", 
        {
            media_type: "tv",
            media_id: iD,
            watchlist: false
        },
        {
            params: {
               api_key: apiKey, 
               session_id: sessionId
            }
        }).then((response) => {
            setRespTv(response.data.status_message)
            refreshTvWL();
        });
    }
    const removeMovWatchList = (iD) => {
        axios.post(urlBase + "account/" + accId + "/watchlist", 
        {
            media_type: "movie",
            media_id: iD,
            watchlist: false
        },
        {
            params: {
               api_key: apiKey, 
               session_id: sessionId
            }
        }).then((response) => {
            setRespMov(response.data.status_message)
            refreshMovWL();
        });
    }

    return (
        <div>
            <Container>
                <h1 style={{color: 'white', textAlign: 'center'}}>Your Watchlist</h1>
                <h2 style={{color: 'white'}}>TV Shows Watchlist</h2>
                {tvWL.map((tvl) => (
                    <Row style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                        <Col>
                            <Card style={{maxHeight: '280px', backgroundColor: '#596274'}}>
                                <Row>
                                    <Col style={{ maxWidth: '200px'}}>
                                        <Card.Img src={getPoster(tvl.poster_path)} style={{height: '278px', width: '185px'}}/>
                                    </Col>
                                    <Col>
                                        <Card.Body className="overviewflow" style={{color: 'white', alignContent: 'center'}}> 
                                            <Card.Title><h1>{tvl.name}</h1></Card.Title>
                                            <Card.Title><h5>{tvl.vote_average} / 10</h5></Card.Title>
                                            <Card.Text>{checkOverview(tvl.overview)}</Card.Text>
                                            <Button variant="danger" style={{position: 'bottom', alignItems: 'center'}}
                                            onClick={() => removeTVWatchList(tvl.id)}>{/*<ImCross />*/} Remove</Button>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                ))}
                <h2 style={{color: 'white'}}>Movies Watchlist</h2>
                {movWL.map((mvl) => (
                    <Row style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                        <Col>
                            <Card style={{maxHeight: '280px', backgroundColor: '#596274'}}>
                                <Row>
                                    <Col style={{ maxWidth: '200px'}}>
                                        <Card.Img src={getPoster(mvl.poster_path)} style={{height: '278px', width: '185px'}}/>
                                    </Col>
                                    <Col>
                                        <Card.Body className="overviewflow" style={{color: 'white', alignContent: 'center'}}> 
                                            <Card.Title><h1>{mvl.original_title}</h1></Card.Title>
                                            <Card.Title><h5>{mvl.vote_average} / 10</h5></Card.Title>
                                            <Card.Text>{checkOverview(mvl.overview)}</Card.Text>
                                            <Button variant="danger" style={{position: 'bottom', alignItems: 'center'}}
                                            onClick={() => removeMovWatchList(mvl.id)}>{/*<ImCross />*/} Remove</Button>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    )
}
