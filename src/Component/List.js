import axios from 'axios'
import React from 'react'
import { Row, Container, Col, Card, Button } from 'react-bootstrap'

const apiKey = "bc47508847273bbf0b53b61fa930f41b"
const sessionId = "92a87cc19886f1c47e3c11a43cb0268934fcb5cc"
const accId = "11148763"
const urlBase = "https://api.themoviedb.org/3/"

export default function List() {
    const [tvWL, setTvWL] = React.useState([])
    const [resp, setResp] = React.useState()

    React.useEffect(() => {
        axios.get(urlBase + "/account/" + accId + "/watchlist/tv", {
                params: {
                    api_key: apiKey,
                    session_id: sessionId,
                    sort_by: "created_at.asc"
                }
        }).then((response) => {
            setTvWL(response.data.results)
        })
    })

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
            setResp(response.data.status_message)
        });
    }

    return (
        <div>
            <Container>
                {tvWL.map((tvl) => (
                    <Row style={{ paddingTop: '10px', paddingBottom: '10px'}}>
                        <Col>
                            <Card style={{maxHeight: '280px'}}>
                                <Row>
                                    <Col style={{ maxWidth: '200px'}}>
                                        <Card.Img src={getPoster(tvl.poster_path)} style={{height: '278px', width: '185px'}}/>
                                    </Col>
                                    <Col>
                                        <Card.Body className="overviewflow"> 
                                            <Card.Title><h1>{tvl.name}</h1></Card.Title>
                                            <Card.Title><h5>{tvl.vote_average} / 10</h5></Card.Title>
                                            <Card.Text>{checkOverview(tvl.overview)}</Card.Text>
                                            <Button variant="danger" style={{position: 'bottom'}}
                                            onClick={() => removeTVWatchList(tvl.id)}>Remove</Button>
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
