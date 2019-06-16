import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import styles from '../css/profile.scss';

export default @connect(state => ({
  width: state.width,
}))

class GridView extends React.Component {
  static propTypes = {
    elements: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    colectionName: PropTypes.string,
    getImageFromElement: PropTypes.func,
    getAlternativeTextForImageFromElement: PropTypes.func,
    getTitleFromElement: PropTypes.func,
    getSubtitleFromElement: PropTypes.func,
    selectItem: PropTypes.func,
    getDetailRoute: PropTypes.func,
    getOverlayFadeInfo: PropTypes.func,
    shouldRedirect: PropTypes.bool,
  };

  static defaultProps = {
    elements: [],
    width: 0,
    colectionName: '',
    getImageFromElement: () => { },
    getAlternativeTextForImageFromElement: () => { },
    getTitleFromElement: () => { },
    getSubtitleFromElement: () => { },
    selectItem: () => { },
    getDetailRoute: () => { },
    getOverlayFadeInfo: () => { },
    shouldRedirect: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState(state => ({ ...state, width: window.innerWidth }));
  }

  render() {
    const {
      elements, getImageFromElement, getAlternativeTextForImageFromElement,
      getTitleFromElement, getSubtitleFromElement, colectionName, selectItem,
      getDetailRoute, getOverlayFadeInfo, shouldRedirect,
    } = this.props;
    const { width } = this.state;
    // TODO Revisar los 600
    const colSize = width < 600 ? Math.min(elements.length, 2) : Math.min(elements.length, 3);
    return (
      <div className={styles.container}>

        {
          <h2 style={{ textAlign: 'center' }}>
            {colectionName}
          </h2>}

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: 'white',
        }}
        >
          <GridList cellHeight={180} cols={colSize} style={{ height: '80%', width: '100%' }}>

            {elements.map(element => (
              <GridListTile key={element.id}>
                <div className="imageoverlayfade">
                  <img
                    className="image"
                    src={getImageFromElement(element)}
                    alt={getAlternativeTextForImageFromElement(element)}
                  />
                  <div className="middle">
                    {getOverlayFadeInfo(element)}
                  </div>
                </div>
                <Link to={getDetailRoute(element)}>
                  <GridListTileBar
                    className="imageoverlayfade"
                    key={element.id}
                    title={shouldRedirect ? (
                      <p className="agus">{getTitleFromElement(element)}</p>
                    ) : selectItem(element)}
                    subtitle={getSubtitleFromElement(element)}
                  />
                </Link>
              </GridListTile>
            ))}
          </GridList>
        </div>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export { GridView };
