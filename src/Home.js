import React, { Component } from 'react';
import './css/Home.css'
import { Button } from 'reactstrap';

import Clock from 'react-live-clock';

export class Home extends Component {

    checkTime(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    checkMonth(i) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return months[i];
    }

    render() {
        let name = '';
        if(this.props.currentUser === undefined) {
            name = 'Good morning!' 
        } else {
            name = 'Good morning' + this.props.currentUser + '!';
        }
        // https://www.w3schools.com/jsref/jsref_getmonth.asp
        // https://pvoznyuk.github.io/react-live-clock/
        let dt = new Date();
        let date = this.checkTime(dt.getDate());
        let month = this.checkMonth(dt.getMonth());
        let year = dt.getFullYear();

        let today =  month + ' ' + date + ', ' + year;
        let main = <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />;
        return (<div>
                    <div className='dtt'>
                        <div className='dt'>
                            {today}
                        </div>
                        <div className='t'>
                            {main}
                        </div>
                    </div>
                    <div className='nb'>
                        <div className='n'> 
                            {name}
                            <div className='text'>
                            Begin your day right: read some news, check the weather, and look at how your stocks are doing! 
                            </div>
                        </div>
                    </div>
                    <footer> <small>
                            INFO 343 final project by Arden Weaver, Megha Goel, Sagar Surana, and Trisha Asar. </small>
                        </footer>
                </div>);
    }

}

export default Home;