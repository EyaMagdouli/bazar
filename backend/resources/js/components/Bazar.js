import React from 'react';

 function Bazar() {
    return (
       <h1>hi</h1>
    );
}
export default Bazar;
console.log("works here")
if (document.getElementById('bazarHome')) {
    console.log("found div")
    ReactDOM.render(<Bazar/>, document.getElementById('bazarHome'));
}

