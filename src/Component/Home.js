import React from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import StarRating from 'react-bootstrap-star-rating'

const apiKey = "bc47508847273bbf0b53b61fa930f41b"
const sessionId = "92a87cc19886f1c47e3c11a43cb0268934fcb5cc"
const accId = "11148763"

export default function Home() {
    const [tvPop, setTvPop] = React.useState([])
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        axios.get("https://api.themoviedb.org/3/tv/popular", { params: {
            api_key: apiKey,
            page: page
        }}).then((response) =>
        {
            setTvPop(response.data.results)
            console.log(response.data.results)
        })
    },[tvPop])

    const getPoster = (path) => `https://image.tmdb.org/t/p/w500/${path}`

    const getBanner = (path) => `https://image.tmdb.org/t/p/w1280/${path}`

    const checkOverview = (overview) => {
        if (overview === "") {
            return "There's no Information"
        } else {
            return overview
        }
    }

    return (
        <div>
            <Container fluid>
                <Row style={{paddingTop: '10px'}}>
                    <Col>
                    <Card style={{minWidth: '1280px', backgroundColor: '#596274'}}>
                        <Row>
                            <Col>
                                <Card.Img src={getBanner(tvPop && tvPop[0].backdrop_path)} />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title style={{color: 'white'}}><h1>Most Popular TV Show</h1></Card.Title>
                                    <Card.Title style={{color: 'white'}}><h2>{tvPop && tvPop[0].name}</h2></Card.Title>
                                    <Card.Text style={{color: 'white'}}><h5>{tvPop && tvPop[0].vote_average} / 10</h5></Card.Text>
                                    <Card.Text style={{color: 'white'}}>{tvPop && tvPop[0].overview}</Card.Text>
                                    <Button variant="primary">Trailer</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                    </Col>
                </Row>
                <div>
                    <h2 style={{color: 'white', paddingTop: '20px', paddingBottom: '10px'}}>What's Popular ?</h2>
                </div>
                <Row xs={6}>
                    {tvPop.slice(1,7).map((movie) => (
                    <Col>
                        <Card className="bg-dark text-white" style={{width: '250px'}}>
                            <Card.Img src={getPoster(movie.poster_path)}/>
                            <Card.ImgOverlay className="cardhover">
                                <Card.Text>{checkOverview(movie.overview)}</Card.Text>
                            </Card.ImgOverlay>
                            <Card.Body style={{backgroundColor: 'transparent'}}>
                                <Card.Title><h6>{movie.name}</h6></Card.Title>
                                <Card.Text>{movie.vote_average} / 10</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
