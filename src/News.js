import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './css/News.css'
import { Card, CardTitle, CardBody, CardSubtitle, CardGroup, Tooltip } from 'reactstrap';
import 'whatwg-fetch';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'al-jazeera-english': [],
      'reuters': [],
      'the-verge': [], 
      'the-new-york-times': [], 
      'the-washington-post': [],
      'wired': [], 
      'vice-news': [], 
      'the-hindu': [], 
      'nfl-news': [], 
      'ars-technica': [], 
      error: ''
        };
  }
  // DONT FORGET ATTRIBUTION LINK FOR NEWS API: https://newsapi.org/
  download(newsSource) {
    let src = newsSource;
    // sort by popularity
    let url2 = 'https://newsapi.org/v2/top-headlines?sources=' + newsSource + '&sortBy=popularity&apiKey=f1820d94c3744a42958a0465be7d21e5';
    let req2 = new Request(url2);
    fetch(req2)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          [src]: data.articles
        });
      }).catch((error) => {
        this.setState({
          error: error.message
        });
      });

  }

  componentDidMount() {
    let newsSRC = this.props.newsSources
    for(var prop in newsSRC) {
        this.download(newsSRC[prop]);
    }
  }

  render() {
    let container = <div className="news"> 
                        <CreateCards news={this.state['al-jazeera-english']} />
                        <CreateCards news={this.state['reuters']} />
                        <CreateCards news={this.state['the-verge']} />
                        <CreateCards news={this.state['the-new-york-times']} />
                        <CreateCards news={this.state['the-washington-post']} />
                        <CreateCards news={this.state['wired']} />
                        <CreateCards news={this.state['vice-news']} />
                        <CreateCards news={this.state['the-hindu']} />
                        <CreateCards news={this.state['nfl-news']} />
                        <CreateCards news={this.state['ars-technica']} />
                    </div>
    let main = <div>
                    {container}
                    <footer> Top Headlines pulled from various websites courtesy <a href='https://newsapi.org/'> News API.</a> </footer>
               </div>
    return ( main );
  }
}

export default News;

export class CreateCards extends Component {
    constructor(props){
        super(props);
        this.toggle= this.toggle.bind(this);
        this.state = {
            toolTipOpen: false
        };
    }

    toggle() {
        this.setState({
            toolTipOpen: !this.state.toolTipOpen
        });
    }

    manipulateName(nameURL) {
        let name = '';
        if(nameURL === null) {
            name = 'Not specified.'
        } else if(nameURL.includes('www')) {
            let nameURLArray = [];
            // check to see if there is more than one name
            if(nameURL.includes(',')) {
                nameURLArray = (nameURL.split(','));
            } else {
                nameURLArray.push(nameURL);
            }
            let cnt = nameURLArray.length;
            if(nameURLArray.length === 1) {
                let nameArray= nameURL.split('by/');
                if(nameArray[0].includes('www')) {
                    name = nameArray[1];
                    name = name.replace('-', ' ');        
                 } else {
                    name = nameArray[0];
                    name = name.replace('-', ' ');        
                }
            } else {
                nameURLArray.forEach((e) => {
                    let nameArray= e.split('by/');
                    if(nameArray[0].includes('www')) {
                        name = name + nameArray[1];
                        name = name.replace('-', ' ');        
                    } else {
                        name = name + nameArray[0];
                        name = name.replace('-', ' ');        
                    }
                    if(cnt > 1) {
                        name = name + ', ';
                        cnt--;
                    }
                });
            }
        } else {
            name = nameURL;
            name = name.replace('-', ' ');        
        }
        return name
      }

    // passed in an array of Articles via props
    // https://www.npmjs.com/package/react-tooltip
    render() {
        let data = this.props.news;
        let articles = data.map((article) => {
            let nameURL = article.author;
            let name = this.manipulateName(nameURL);
            return (<Card className='d-flex' className={article.source.id} key={article.title}>
                    <CardBody data-tip={article.source.name}>
                        <CardTitle> <a href={article.url}> {article.title} </a> </CardTitle>
                        <CardSubtitle> <small> {name} </small> </CardSubtitle>
                    </CardBody>
                    <ReactTooltip place="right" type="dark" effect="solid"/>
                    </Card>
                    );
});


        return (<div>
                <CardGroup> {articles[0]} {articles[1]} {articles[2]} {articles[3]} </CardGroup>
                <CardGroup> {articles[4]} {articles[5]} {articles[6]} {articles[7]} {articles[8]} {articles[9]} </CardGroup>
                </div>
            );
    }
}
