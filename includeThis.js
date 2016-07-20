var initialState={
    value : 0,
    date : "Thu Jan 01 1970 05:30:00 GMT+0530 (IST)"

}

var store = Redux.createStore(reducerFunction,initialState)


var Epoch = React.createClass({ //creates component Epoch

    render:function () { //returns html that has to be rendered

        return(
            <div>
            <br/><br/>
            <h1>Epoc Calculator</h1>

        <Input />
        <Display/>
        </div>
        )
    }

});


var Input=React.createClass({
    in:function (e) {

        store.dispatch({type: 'INPUT', value:e.target.value})
    },
    render:function () { //returns html that has to be rendered

        return(
            <div>

            Enter Epoch Time: <input type="text" value={store.getState().value} onChange={this.in}/>

        </div>
        )
    }

});
var Display=React.createClass({
    exe:function () {

        store.dispatch({type: 'CONVERT', value:store.getState().value})


    },
    render:function () { //returns html that hs to be rendered


        return(
            <div>
            <br/><br/><br/><br/>
            TimeStamp to Human Date :  <button onClick={this.exe}> Convert</button>
        <br/><br/><br/><br/>

        <h2> {(store.getState().date).toString()}</h2>
        </div>
        )
    }
});
function render() {

    ReactDOM.render(<Epoch store={store}/>, document.getElementById('app')); // what html to render in DOM and at which place
}

function reducerFunction(state, action) {
    console.log("inside reducer"+action.type);
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case "INPUT": state.value=action.value;
            console.log('>> state.value', state.value)
            return state
        case "CONVERT": var time=parseInt(store.getState().value);
            var date = new Date(0);
            date.setUTCSeconds(time);
            state.date=date;
            return state;

        default: return state
    }
}

render()
store.subscribe(render);

