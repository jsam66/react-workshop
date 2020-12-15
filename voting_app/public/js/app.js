class ProductList extends React.Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.setState({
            products: Seed.products
        })
    }

   handleProductUpVote = (id) => {
     const nextProducts = this.state.products.map(product => {
         if (product.id === id) {
             return Object.assign({}, product, {
                 votes: product.votes + 1
             })
         }  else {
             return product
         }
     })
     this.setState({
         products: nextProducts
     })
   } 

    render() {
        const products = this.state.products.sort((a,b) => b.votes -a.votes)
        const productComponents = products.map(product => <Product onVote={this.handleProductUpVote} key={product.id} id={product.id} title={product.title} description={product.description} url={product.url} votes={product.votes} submitterAvatarUrl={product.submitterAvatarUrl} productImageUrl={product.productImageUrl}/>)
        return <div className='ui unstackable items'>
            {productComponents}
        </div> 
    }
}

const Product  = (props) => {
    const handleUpVote = () => {
        props.onVote(props.id)
    }
    return <div className='item'>
        <div className='image'>
            <img src={props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
            <div className='header'>
                <a onClick={handleUpVote}>
                    <i className='large caret up icon' />
                    {props.votes}
                </a>
            </div>
            <div className='description'>
                <a href={props.url}>{props.title}</a>
                <p>{props.description}</p>
            </div>
            <div className='extra'>
                <span>Submitted by: </span>
                <img className='ui avatar image' src={props.submitterAvatarUrl}></img>
            </div>
        </div>
    </div>  
}



ReactDOM.render(<ProductList />, document.getElementById('content'))