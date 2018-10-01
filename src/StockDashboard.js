import React, { Component } from 'react';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';


const key = 'R53L4WV6XQ6KQUNO'



class StockDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbol: "AAPL",
      metaData: {},
      stockTicks: {},
      chartData: []
    }
  }

  fetchData() {
    // var url = "https://www.alphavantage.co/query?"
    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.state.symbol + "&apikey=" + key
    fetch(url).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      this.parseData(data)

    })
  }

  parseData(data) {
    var stockTicks = data['Time Series (Daily)']
    var chartData = this.parseChartData(stockTicks)
    this.setState({
      metaData: data['Meta Data'],
      stockTicks: data['Time Series (Daily)'],
      chartData
    })
  }

  // Takes in the received stock data
  parseChartData(ticks) {
    var keys = Object.keys(ticks).slice(0, 15).reverse();
    return keys.map((key, index) => {
        return {
          name: key,
          value: ticks[key]['4. close']
        }
    })

  }

  componentDidMount() {
    this.fetchData()
  }

  handleSearchClick() {
    this.fetchData()
  }

  handleSymbolKeyPress(event) {
    this.setState({
      symbol: event.target.value
    })
  }



  render() {
    var cardData = {};
    var stockData = [];
    var currentStockData = {}
    if (this.state.metaData != {}) {
      cardData = {
        symbol: this.state.metaData['2. Symbol'],
        information: this.state.metaData['1. Information'],
        refresh: this.state.metaData['3. Last Refreshed']
      };
      stockData = Object.values(this.state.stockTicks);
      currentStockData = stockData[0]
    }

    var chartData = this.state.chartData;

    return (
      <Container>
        <Row>
          <Col>
            <FormGroup>
              <Label for="symbol">Search</Label>
              <Input type="text" name="symbol" value={this.state.symbol} onChange={(event) => this.handleSymbolKeyPress(event)} id="symbol" placeholder="Enter a stock Symbol" />
            </FormGroup>
            <Button color='primary' onClick={() => this.handleSearchClick() }>Search</Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={{ size: 12 }}  md={{ size: 4 }}>
            <Card>
              <CardBody>
                <CardTitle>Symbol: {cardData.symbol || ''}</CardTitle>
                <CardSubtitle>Showing {cardData.information || ''}</CardSubtitle>
                <CardText>Data Last Refreshed {cardData.refresh || ''}</CardText>
              </CardBody>
                  <ListGroup>
                    <ListGroupItem>
                      <ListGroupItemHeading>Open</ListGroupItemHeading>
                      <ListGroupItemText>{currentStockData ? '$' + currentStockData['1. open'] : null}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                      <ListGroupItemHeading>High</ListGroupItemHeading>
                      <ListGroupItemText>{currentStockData ? '$' + currentStockData['2. high'] : null}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                      <ListGroupItemHeading>Low</ListGroupItemHeading>
                      <ListGroupItemText>{currentStockData ? '$' + currentStockData['3. low'] : null}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                      <ListGroupItemHeading>Close</ListGroupItemHeading>
                      <ListGroupItemText>{currentStockData ? '$' + currentStockData['4. close'] : null}</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                      <ListGroupItemHeading>Volume</ListGroupItemHeading>
                      <ListGroupItemText>{currentStockData ? currentStockData['5. volume'] : null}</ListGroupItemText>
                    </ListGroupItem>
                  </ListGroup>

            </Card>
          </Col>
          <Col md={{size: 8}}>
            <ResponsiveContainer  height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis/>
                <Area type='monotone' dataKey='value' stackId="1" stroke='#8884d8' fill='#8884d8' />
              </AreaChart>
            </ResponsiveContainer>
          </Col>
        </Row>


      </Container>
    );
  }
}

StockDashboard.propTypes = {

}

export default StockDashboard;
