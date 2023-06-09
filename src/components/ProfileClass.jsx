import React from 'react';
import UserContext from '../utils/UserContext';

class Profile extends React.Component {
  /**
   * Rendering steps own lifeCycle
    1. constructor
    2. render
    6. willUnmount // because we destructed
    3. didMount // Initial loaded
    4. render
    5. didUpdate // because we updated
   */
  constructor(props) {
    super(props);
    //Create state
    this.state = {
      count: 0,
      count2: 0,
      userData: [],
    };
    console.log('constructor');
  }

  componentDidMount() {
    //It will call after the component initially called
    console.log('didMount');

    //API FETCH
    const getUserData = async () => {
      const response = await fetch('https://api.github.com/users/zaheer-zk');

      const json = await response.json();
      this.setState({
        userData: json,
      });

      console.log(json);
      console.log(this.state.userData);
    };

    getUserData();
  }

  componentDidUpdate() {
    //It will after after component update
    console.log('didUpdate');
  }

  componentWillUnmount() {
    //It will work as destructor it will call at destruction time
    console.log('willUnmount');
  }

  render() {
    // <UserContext.Consumer>
    //   {(value) => console.log(value)}
    // </UserContext.Consumer>;

    console.log('render');
    const { count } = this.state;
    return (
      <div className="flex text-center">
        {/* <div>
          {' '}
          <h1>Profile based component</h1>
          <h3>Name: {this.props.name}</h3>
          <h4>Count: {count}</h4>
          <h4>Count2: {this.state.count2}</h4>
          <button
            onClick={(e) => {
              // WE DO NOT MUTATE STATE DIRECTLY
              this.setState({ count: count + 1, count2: this.state.count + 1 });
            }}>
            +
          </button>
        </div> */}
        <div className="flex justify-center flex-col items-center">
          <img
            src={this.state.userData?.avatar_url}
            alt="Profile img"
            className="w-[200px] rounded-full text-center shadow-2xl my-2 "
          />
          <h1>Name: {this.state.userData?.name}</h1>
          <p>Bio: {this.state.userData?.bio}</p>
        </div>
      </div>
    );
  }
}

export default Profile;

/**
 * There are 2 phase
 *
 * ------ -> constructor -> update ->
 * render -> render      -> render -> unmounting
 * : ------------------------------------------ :
 * commit -> DOM manipulation ---- -> unmounting
 */

/**
 * Parent to child
 *  Parent - Constructor
 *  Parent - Render
 *    Child - Construct
 *    Child - Render
 *    Child - (didMount)
 *  Parent - (didMount)
 */

/**
 * Parent to 2 child component
 * RENDER PHASE STARTS
 *  Parent - Constructor
 *  Parent - Render
 *    Child1 - Constructor
 *    Child1 - Render
 *    Child2 - Constructor
 *    Child2 - Render
 * COMMIT PHASE START'S
 *    Child1 - (didMount)
 *    Child2 - (didMount)
 *  Parent - LifeCycle
 */
