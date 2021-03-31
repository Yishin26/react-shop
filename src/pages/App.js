
import React from 'react'
import Products from 'components/Products'
import Layout from 'components/Layout';

class App extends React.Component {
    render() {
        return (
            <div className='main'>
                <Layout>
                    <Products />
                </Layout>
            </div>
        )
    }
}

export default App;