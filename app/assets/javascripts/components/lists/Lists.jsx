class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.baseUrl = `/boards/${this.props.id}/lists`
    this.state = { lists: this.props.lists, board: this.props.board };
 }

 addList(list) {
   this.setState({ lists: [{...list}, ...this.state.lists ]});
 }

 updateList(id, list) {
   $.ajax({
     url: `${this.baseUrl}/${id}`,
     type: 'PUT',
     data: { list: {...list} }
   }).done( list => {
     let lists = this.state.lists;
     let editList = lists.find( b => b.id === list.id );
     editList.name = list.name;
     editList.description = list.description;
     this.setState({lists: lists});
   }).fail( msg => {
     console.log(msg);
   });
 }

 deleteList(id) {
   $.ajax({
     url: `${this.baseUrl}/${id}`,
     type: 'DELETE'
   }).done( (list) => {
     let lists = this.state.lists;
     let index = lists.findIndex( b => b.id === list.id);
     this.setState({ lists: [
       ...lists.slice(0, index),
       ...lists.slice(index + 1, lists.length)
     ]
   });
   }).fail( msg => {
     console.log(msg);
   });
 }

 render() {
   let lists = this.state.lists.map( list => {
     return(<List key={`key-${list.id}`} {...list} deleteList={ this.deleteList } updateList={this.updateList} />);
   });
   return(
     <div className="row">
       <h2 className='center'>Board: { this.state.board.name }</h2>
       <NewList id={this.props.id} addList={this.addList} />
       <h2 className="center">Lists</h2>
        {lists}
     </div>
   );
  }
}
