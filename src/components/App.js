
import React from 'react'
import Header from 'components/Header'
import Products from 'components/Products'

class App extends React.Component {
    
    render() {
        return (
            <div className='main'>
                <Header nickname='ADMIN' age={28} marry={true} />
                <Products />

            </div>
        )
    }
}

export default App;