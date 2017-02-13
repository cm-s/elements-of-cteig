import React from 'react';
import $ from 'jquery'
import { autobind } from 'core-decorators';

import Responder from './Responder.jsx';

@autobind
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variables: {},
      transformation: 'scale(0)',
      navbarShadow: '0 2px 2px 0 rgba(0,0,0,0.2)',
      searchShadow: 'none',
      menuState: 'hidden',
      navbarHeight: 55,
      tabDisplay: 'none',
      tabWidth: 0,
      tabAlignment: 60,
      selectedTab: 'elementsTab',
      elements: Array.from({length: 11}, (count, num = 1) => num + 1),
      results: undefined
    };
  }
  filterResults(query, length) {
    if (length > 3) {
      let matches = [];
      // Expanding the navbar and performing proper initial adjustments if not already done
      if (this.state.navbarHeight == 55) {
        this.setState({
          navbarHeight: 90,
          tabDisplay: 'flex'
        });
        setTimeout(function () {
          this.setState({ tabWidth: parseInt($(this.refs.elementsTab).css('width'), 10) + 20 });
        }.bind(this), 20);
        this.props.offsetStack(90);
      };
      switch (this.state.selectedTab) {
        case 'elementsTab':
          this.state.elements.forEach((element) => {
            if (eval('this.state.variables.e' + element + '.title').indexOf(query) !== -1) {
              console.debug("Found it");
              matches.push('e' + element);
            };
          });
          break;
        case 'topicsTab':
          break;
          this.state.elements.forEach((element) => {
            let propRefs = Object.keys(eval('this.state.variables.e' + element + '.topic'));
            propRefs.splice(propRefs.length - 1, 1);
            propRefs.forEach((ref) => {
              if (Array.isArray(eval('this.state.variables.e' + element + '.topic.' + ref + '.text'))) {
              } else {
                if (eval('this.state.variables.e' + element + '.topic.' + ref + '.text').indexOf(query) !== -1) {
                  matches.push('e' + element);
                };
              };
            });
          });
          break;
        case 'evidenceTab':
          console.debug("searching evidence");
          break;
      };
      this.props.whitelist(this.state.selectedTab, matches);
    };
    if (length == 0) {
      this.setState({
        navbarHeight: 55,
        tabDisplay: 'none'
      });
      this.props.offsetStack(55);
      this.props.whitelist(null, []);
    };
  }
  search(event) {
    this.filterResults(event.target.value, event.target.value.length);
  }
  toggleMenu() {
    if (this.state.menuState == 'visible') {
      this.setState({
        transformation: 'scale(0)',
        menuState: 'hidden'
      });
    } else {
      this.setState({
        transformation: 'scale(1)',
        menuState: 'visible'
      });
    };
  }
  invoke(event) {
    if (this.state.menuState == 'hidden' && (event.target.id == 'dot-menu-container' || event.target.id == 'dot-menu-icon')) {
      this.toggleMenu();
    } else if (event.target.parentElement.id != 'dot-menu' && this.state.menuState == 'visible') {
      this.toggleMenu();
    };
  }
  viewPDF() {
    window.open('http://www.cnusd.k12.ca.us/cms/lib/CA01001152/Centricity/domain/6169/docs/CDE%2011%20Elements%20of%20HQ%20CTE%20Program.pdf');
  }
  downloadPDF() {
    document.getElementById('iframe').src = 'http://www.cnusd.k12.ca.us/cms/lib/CA01001152/Centricity/domain/6169/docs/CDE%2011%20Elements%20of%20HQ%20CTE%20Program.pdf';
  }
  componentDidMount() {
    // Setting one time trigger to a click of the search field to read all data from rendered elements
    let triggerFxn = () => {
      this.setState({
        variables: this.props.getElementData()
      });
      document.querySelector('#search-bar').removeEventListener('click', triggerFxn);
    };
    document.querySelector('#search-bar').addEventListener('click', triggerFxn);
  }
  updateZheight(input) {
    if (input > 0 && this.state.navbarShadow != '0 3px 3px 0 rgba(0,0,0,0.3)') {
      this.setState({
        shadow: '0 3px 3px 0 rgba(0,0,0,0.3)'
      });
    } else if (input == 0) {
      this.setState({
        shadow: '0 2px 2px 0 rgba(0,0,0,0.2)'
      });
    };
  }
  reselect(event) {
    if (event.target.id != this.state.selectedTab) {
      switch (event.target.id) {
        case 'elementsTab':
          console.debug("set to elementsTab");
          this.setState({
            selectedTab: 'elementsTab',
            tabWidth: parseInt($(this.refs.elementsTab).css('width'), 10) + 20,
            tabAlignment: $(this.refs.elementsTab).offset().left
          });
          setTimeout(function () {
            this.filterResults($(this.refs.searchField).val(), $(this.refs.searchField).val().length);
          }.bind(this), 100);
          break;
        case 'topicsTab':
          console.debug("set to topicsTab");
          this.setState({
            selectedTab: 'topicsTab',
            tabWidth: parseInt($(this.refs.topicsTab).css('width'), 10) + 20,
            tabAlignment: $(this.refs.topicsTab).offset().left
          });
          setTimeout(function () {
            this.filterResults($(this.refs.searchField).val(), $(this.refs.searchField).val().length);
          }.bind(this), 100);
          break;
        case 'evidenceTab':
          console.debug("set to evidenceTab");
          this.setState({
            selectedTab: 'evidenceTab',
            tabWidth: parseInt($(this.refs.evidenceTab).css('width'), 10) + 20,
            tabAlignment: $(this.refs.evidenceTab).offset().left
          });
          setTimeout(function () {
            this.filterResults($(this.refs.searchField).val(), $(this.refs.searchField).val().length);
          }.bind(this), 100);
          break;
      };
    };
  }
  permitHover() {
    this.setState({
      searchShadow: '0 2px 5px 2px rgba(0,0,0,0.35)'
    });
  }
  negateHover() {
    this.setState({
      searchShadow: 'none'
    });
  }
  render() {
    return (
      <nav style={{
          boxShadow: this.state.navbarShadow,
          height: this.state.navbarHeight + 'px'
        }}>
        <div id="dot-menu-container">
          <Responder type="small"
            dimensions={45}/>
          <i className="mdi mdi-dots-vertical mdi-24px mdi-light" id="dot-menu-icon"></i>
          <ul id="dot-menu"
            style={{
              transform: this.state.transformation
            }}>
            <li onClick={this.viewPDF}>
              <i className="mdi mdi-file-pdf-box mdi-24px mdi-dark"></i>
              View as PDF
            </li>
            <li onClick={this.downloadPDF}>
              <iframe id="iframe"
                style={{ display: 'none' }}
                target="_blank"></iframe>
              <i className="mdi mdi-cloud-download mdi-24px mdi-dark"></i>
              Download PDF
            </li>
          </ul>
        </div>
        <div id="search-bar"
          onFocus={this.permitHover}
          onBlur={this.negateHover}
          style={{ boxShadow: this.state.searchShadow }}>
          <i className="mdi mdi-magnify mdi-24px mdi-dark"></i>
          <input type="search"
            name="searchbar"
            placeholder="Enter query, more than three characters"
            ref="searchField"
            id="search-field"
            autoComplete="off"
            onChange={this.search} />
        </div>
        <div id="search-filter-container"
          style={{ display: this.state.tabDisplay }}>
          <span id="tab-marker"
            style={{
              left: this.state.tabAlignment + 'px',
              width: this.state.tabWidth + 'px'
            }}></span>
          <span className="search-filter-tab"
            ref="elementsTab"
            id="elementsTab"
            onClick={this.reselect}>
            Elements
          </span>
          <span className="search-filter-tab"
            ref="topicsTab"
            id="topicsTab"
            onClick={this.reselect}>
            Topics
          </span>
          <span className="search-filter-tab"
            ref="evidenceTab"
            id="evidenceTab"
            onClick={this.reselect}>
            Evidence
          </span>
        </div>
      </nav>
    );
  }
}
