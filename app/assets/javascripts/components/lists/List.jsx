class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
    this.addCard = this.addCard.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/cards',
      type: 'GET',
      data: { list_id: this.props.id }
    }).done( cards => {
      this.setState({ cards: cards });
    })
  }

 addCard(e) {
   e.preventDefault();
   let name = this.refs.name;
   let description = this.refs.description;
   $.ajax({
     url: "/cards",
     type: "POST",
     data: { list_id: this.props.id, card: { name: name.value, description: description.value }}
   }).done( card => {
     this.setState({ cards: [{...card}, ...this.state.cards ]});
     name.value = null;
     description.value = null;
   });
 }

 deleteCard(id, e) {
   e.preventDefault();
   $.ajax({
     url: `/cards/${id}`,
     type: 'DELETE'
   }).done( card => {
     let cards = this.state.cards;
     let index = cards.findIndex( c => c.id === card.id);
     this.setState({ cards: [
       ...cards.slice(0, index),
       ...cards.slice(index + 1, cards.length)
       ]
     });
   }).fail( msg => {
     console.log(msg);
   })
 }

 render() {
   let cards = this.state.cards.map( card => {
   return(
     <li key={`card-${card.id}`} className="collection-item">
       <div>
         {card.name}
         <br />
         {card.description}
         <div className="secondary-content" style={{color: 'red'}} onClick={ () => this.deleteCard(card.id, event) }>X</div>
       </div>
     </li>
     );
  });

  return(
    <div className="col s12 m3">
      <form onSubmit={this.addCard}>
        <input placeholder="name" ref="name" required={true} />
        <input placeholder="description" ref="description" required={true} />
        <button className="btn" type="submit">Add Card</button>
     </form>
     <h5 className="center">{this.props.name}</h5>
     <ul className="collection">
      { cards }
     </ul>
     <button className='btn red' onClick={ () => this.props.deleteList(this.props.id) }>Delete List</button>
   </div>
  )
 }
}
